import { collection, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { db } from "../../../firebaseConfig";
import store from "../../../stores/store";
import { DashboardNewSetFormProps } from "./types/DashboardNewSetFormProps";
import { useAuth } from "../../../hooks/useAuthHook";
import axios from "axios";

const DashboardNewSetForm = (dashboardNewSetFormProps: DashboardNewSetFormProps) => {

    // todo: refactor this page (add loading, refreshEvent, maybe hookform, prevent rerendering, better prop statement, validation)
    const API_URL_Categories = 'http://localhost:5000/api/categories';
    const API_URL_FlashcardSets = 'http://localhost:5000/api/flashcardSets';

    const { data, refreshEvent } = dashboardNewSetFormProps;

    const mounted = useRef(true)

    const user = useAuth(); // Get the current authenticated user
    
    
    const userId = store.getState()?.user?.user?.id
    // todo: add model for this any:
    const [categories, setCategories] = useState<any>([])

    const [formData, setFormData] = useState(data ?? { name: "", categoryId: "", categoryName: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    
    const fetchCategories = async() => {
        if (!user) {
            console.error("No user logged in");
            return;
        }
        try {
            const token = await user.getIdToken();

            const response = await axios.get(`${API_URL_Categories}/get`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log('response:', response)

            setCategories(response?.data ?? [])
        } catch (error) {
          console.error("Error fetching categories:", error)
        }
    }

    const createSet = async (name: string, categoryId: string ) => {
        console.log('name:', name)
        console.log('categoryId:', categoryId)
        if(userId) {
            // const newSet = {
            //     name,
            //     categoryId,
            //     createdAt: new Date(),
            // };
            
            if (!user) {
                console.log("No user logged in");
                return;
            }
            try {
                const token = await user.getIdToken();
                await axios.post(
                    `${API_URL_FlashcardSets}/add`,
                    {
                        name,
                        categoryId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
    
            } catch (error) {
              console.error("Error fetching categories:", error)
            }
            
            // const setsCollectionRef = collection(db, `users/${userId}/sets`);
            // await addDoc(setsCollectionRef, newSet);
        }
    };

    const updateSet = async (setId: string, name?: string, categoryId?: string ) => {
        if (userId) {
          const setDocRef = doc(db, `users/${userId}/sets`, setId);
          await updateDoc(setDocRef, {name: name, categoryId: categoryId});
          if(refreshEvent) 
            refreshEvent()
        }
    };

    const handleSubmit = (e: FormEvent) => {
        // todo: add validation
        e.preventDefault()
        // todo: continue from here burada kaldın

        if(data) {
            updateSet(data.id, formData.name, formData.categoryId)
        } else {
            createSet(formData.name, formData.categoryId)
        }
        if(refreshEvent)
            refreshEvent()
    }   
    
    useEffect(() => {
  
        return () => {
            mounted.current = false
        }
    }, [])

    useEffect(() => {
        fetchCategories()
    }, [user])

    return(
        <Form onSubmit={handleSubmit} id="dashboardNewSetForm">
            <FormGroup>
                <Label for="name">Set Name:</Label>
                <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="categoryId">Set Category</Label>
                {/* todo: add info tooltip here to inform user to add categories from settings */}
                <Input
                    id="categoryId"
                    name="categoryId"
                    type="select"
                    onChange={handleInputChange}
                    value={formData.categoryId}
                >
                    <option value="" selected disabled hidden>Choose here</option>
                    {categories?.map((category: any) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </Input>
            </FormGroup>
        </Form>
    )
}

export default DashboardNewSetForm;