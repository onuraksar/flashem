import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { db } from "../../firebaseConfig";
import store from "../../stores/store";
import { v4 as uuidv4 } from 'uuid';
import { defaultCategories } from "../../settings/categorySettings";

const DashboardNewSetForm = () => {

    const mounted = useRef(true)
    
    const userId = store.getState()?.user?.user?.id
    // todo: add model for this any:
    const [categories, setCategories] = useState<any>([])

    const [formData, setFormData] = useState({ setName: "", setCategory: "" });

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

    const createSet = async (setName: string, setCategoryId: string) => {
        if(userId) {
            const newSet = {
                id: uuidv4(),
                setName,
                setCategoryId,
                createdAt: new Date(),
                flashCards: []
            };
            await updateDoc(doc(db, "users", userId), {
                sets: arrayUnion(newSet)
            });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        // todo: add validation
        e.preventDefault()
        createSet(formData.setName, formData.setCategory)
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
                <Label for="setName">Set Name:</Label>
                <Input id="setName" name="setName" type="text" value={formData.setName} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="setCategory">Set Category</Label>
                {/* todo: add info tooltip here to inform user to add categories from settings */}
                <Input
                    id="setCategory"
                    name="setCategory"
                    type="select"
                    onChange={handleInputChange}
                    value={formData.setCategory}
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