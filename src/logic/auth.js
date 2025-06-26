import {APIII} from "../api"

export const loginuser=async(username,password)=>{
    try {
        const res=await APIII.post('/login',{
            username,password
        });
        return res;
    } catch (error) {
        throw error;
    }
}

export const registeruser=async(username,password)=>{
    try {
        const res=await APIII.post('/register',{
            username,password
        });
        alert(res.data)
    } catch (error) {
        throw error;
    }
}
