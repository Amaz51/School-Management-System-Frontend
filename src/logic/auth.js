import {APIII, authAPI} from "../api"

// export const loginuser=async(username,password)=>{
//     try {
//         const res=await APIII.post('/login',{
//             username,password
//         });
//         return res;
//     } catch (error) {
//         throw error;
//     }
// }

export const registeruser=async(username,password,email)=>{
    try {
        const res=await APIII.post('/register',{
            username,password,email
        });
        alert(res.data)
    } catch (error) {
        throw error;
    }
}

export const loginuser = async (username, password) => {
    try {
        const res = await authAPI.post('/api/token/', {
            username, password
        });

        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        return res;
    } catch (error) {
        throw error;
    }
};
