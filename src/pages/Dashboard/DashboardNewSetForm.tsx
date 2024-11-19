import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { db } from "../../firebaseConfig";
import store from "../../stores/store";
import { v4 as uuidv4 } from 'uuid';
import { defaultCategories } from "../../settings/categorySettings";

const DashboardNewSetForm = () => {

    const mounted = useRef(true)
    
    const userId = store.getState()?.user?.user?.id
    // todo: add model for this any:
    const [categories, setCategories] = useState<any>([])

    const [formData, setFormData] = useState({ name: "", categoryId: "", categoryName: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    
    const fetchCategories = async (uid: string) => {
        try {
            // todo: create a getDoc function to make it global to prevent importing doc, db for all instances:
          const userDoc = await getDoc(doc(db, "users", uid));
          const userData = userDoc.data();
          setCategories(userData?.categories || []);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
    }

    const createSet = async (name: string, categoryId: string ) => {
        if(userId) {
            const newSet = {
                name,
                categoryId,
                createdAt: new Date(),
            };
            const setsCollectionRef = collection(db, `users/${userId}/sets`);
            await addDoc(setsCollectionRef, newSet);
        }
    };

    // const deleteSet = async (uid: string, setId: string) => {
    //     const userRef = doc(db, "users", uid);
      
    //     const userDoc = await getDoc(userRef);
    //     const sets = userDoc.data()?.sets || [];
      
    //     const setToDelete = sets.find(set => set.id === setId);
    //     if (setToDelete) {
    //       await updateDoc(userRef, {
    //         sets: arrayRemove(setToDelete),
    //       });
    //     }
    // };

    const handleSubmit = (e: FormEvent) => {
        // todo: add validation
        e.preventDefault()
        createSet(formData.name, formData.categoryId)
    }   
    
    useEffect(() => {
        if(mounted.current && userId) {
            fetchCategories(userId)
        }
        return () => {
            mounted.current = false
        }
    }, [])

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
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Input>
            </FormGroup>
        </Form>
    )
}

export default DashboardNewSetForm;