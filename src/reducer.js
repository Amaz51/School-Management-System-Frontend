
const today = new Date().toISOString().split("T")[0];

export const initialState = {
  islogedin: false,
  records: [],
  studentname: "",
  date: today,
  status: "Present",
  editid: null,
  students: []
};


export const reducer=(state,action)=>{
    switch (action.type) {
        case "SET_RECORDS":
            return {
                ...state,
                records:action.records,
            };
        case "Login":
            return {
                ...state,
                islogedin: true,
            };
        case "LOGOUT":
            return {
                ...state,
                records:[],
                islogedin: false,
            };
        case "EDIT_HANDLE":
            return {
                ...state,
                studentname: action.studentname,
                date: action.date,
                status: action.status,
                editid: action.editid,
            };
        case "HANDLE_EDITID":
            return {
                ...state,
                editid: null,
            };
        case "HANDLE_SUBMIT":
            return {
                ...state,
                studentname: action.studentname,
                date: action.date,
                status: action.status,
            };
        case "SET_FIELDS":
            return { ...state, [action.field]: action.value };
        case "SET_STUDENTS":
            return { ...state, students: action.students };
        default:
            return state;
    }
}