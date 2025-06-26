import { APIII } from "../api";

export const addnewstudent=async(student)=>{
    try {
        const res = await APIII.post("/", student);
        if (res.status === 200 || res.status === 201) {
            console.log("Student added successfully");
        } else {
            throw new Error("Failed to add new student");
        }
    } catch (error) {
        throw new Error(`Error in adding student: ${error.message}`);
    }        
}


export const fetchingstudents=async () => {
    try {
        const res=await APIII.get("/");
        return res;
    } catch (error) {
        throw new Error("Error in fetching students");
        
    }
}