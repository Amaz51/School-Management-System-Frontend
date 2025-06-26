import {API} from "../api.js"
export const deleterecord=async(id)=>{
    try {
        const res = await API.delete(`/${id}/`);
        if (res.status === 200 || res.status === 204) {
            console.log("Record deleted successfully");
        } else {
            throw new Error("Failed to delete record");
        }
    } catch (error) {
        throw new Error(`Error in deleting record: ${error.message}`);
    }        
}


export const editiddata=async(editid,data) => {
    try {
        const res=await API.put(`/${editid}/`, data);
        if (res.status === 200|| res.status === 204) {
            console.log("Record updated successfully");
        } else {
            throw new Error("Failed to update record");
        }
    } catch (error) {
        throw new Error(`Error in updating record: ${error.message}`);
    }
}

export const AddRecord = async (data) => {
    try {
        const res=await API.post('/', data)
        if(res.status === 201) {
            console.log("Record added successfully");
        } else {
            throw new Error("Failed to add record");
        }
    } catch (error) {
        throw new Error(`Error in adding record: ${error.message}`);
        
    }
}

export const fetchRecords=async () => {
    try {
        const res=await API.get('/')
        if (res.status === 200) {
            console.log("Records fetched successfully");
            return res.data;
        } else {
            throw new Error("Failed to fetch records");
        }
    } catch (error) {
        throw new Error(`Error in fetching records: ${error.message}`);
    }
}

export const bulkupdateapi=async (records) => {
    try {
        await API.put('bulk-update/', records); 
    } catch (error) {
        throw new Error(`Error in bulk update api calling : ${error.message}`);
        
    }
}

export const bulkcreateapi = async (records) => {
    try {
      await API.post('bulk-create/', records);
    } catch (error) {
      throw new Error(`Failed to submit data: ${error.message}`);
    }
  };