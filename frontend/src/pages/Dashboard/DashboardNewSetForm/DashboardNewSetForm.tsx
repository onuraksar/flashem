import { collection, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { db } from "../../../firebaseConfig";
import store from "../../../stores/store";
import { DashboardNewSetFormProps } from "./types/DashboardNewSetFormProps";

const DashboardNewSetForm = (dashboardNewSetFormProps: DashboardNewSetFormProps) => {

    // todo: refactor this page (add loading, refreshEvent, maybe hookform, prevent rerendering, better prop statement, validation)

    const { data, refreshEvent } = dashboardNewSetFormProps;

    const mounted = useRef(true)
    
    const userId = store.getState()?.user?.user?.id
    // todo: add model for this any:
    const [categories, setCategories] = useState<any>([])

    const [formData, setFormData] = useState(data ?? { name: "", categoryId: "", categoryName: "" });

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
        if(data) {
            updateSet(data.id, formData.name, formData.categoryId)
        } else {
            createSet(formData.name, formData.categoryId)
        }
        if(refreshEvent)
            refreshEvent()
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