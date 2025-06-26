import React, { useEffect, useReducer } from "react";
import { APIII } from "./api";
import {
  Login,
  AttendanceForm,
  DisplayRecords,
  Logout,
  Register,
  Searchrecords,
  BulkAttendanceCreate,
  BulkAttendanceUpdate,
  AddStudent,
  DownloadAttendanceSheet
} from './components/exports.js'; 
import { AddRecord, deleterecord, editiddata, fetchRecords } from "./logic/attendance";
import { fetchingstudents } from "./logic/student";
import { initialState, reducer } from "./reducer";
import { BigContainer, Title } from "./styles/StyledComponents";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

useEffect(() => {
  const fetchStudents = async () => {
    try {
      const res = await fetchingstudents()
      dispatch({ type: "SET_STUDENTS", students: res.data });
    } catch (error) {
      throw new Error(`Failed to fetch students: ${error.message}`);
    }
  };

  if (state.islogedin) {
    fetchData();
    fetchStudents(); 
  }
}, [state.islogedin]);


  useEffect(() => {
    APIII.get("/csrf/");
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetchRecords();
      dispatch({ type: "SET_RECORDS", records: res });
    } catch (error) {
      throw new Error(`Failed to fetch records: ${error.message}`);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const data = {
      student_id: state.student_id, 
      date: state.date,
      status: state.status,
    };

    try {
      if (state.editid === null) {
        await AddRecord(data);
      } else {
        await editiddata(state.editid, data);
        dispatch({ type: "HANDLE_EDITID", editid: null });
      }

      dispatch({ type: "HANDLE_SUBMIT", student_id: "", date: "", status: "Present" });
      fetchData();
    } catch (error) {
      throw new Error(`Failed to submit data: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleterecord(id);
      fetchData();
    } catch (error) {
      throw new Error(`Failed to delete record: ${error.message}`);
    }
  };

  const handleEdit = (record) => {
    dispatch({
      type: "EDIT_HANDLE",
      student_id: record.student, 
      date: record.date,
      status: record.status,
      editid: record.id,
    });
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT", records: [], islogedin: false });
  };

  return (
    <BigContainer style={{ padding: "20px" }}>
      {!state.islogedin ? (
        <>
          <Login dispatch={dispatch} />
          <Register />
        </>
      ) : (
        <>
          <Title>Attendance App</Title>
          <Logout handleLogout={handleLogout} />
          <DownloadAttendanceSheet />
          <AddStudent onStudentAdded={fetchData} />
          <BulkAttendanceUpdate 
          student_id={state.student_id}
              students={state.students}
              fetchData={fetchData}/>
           <BulkAttendanceCreate 
              student_id={state.student_id}
              students={state.students}
              fetchData={fetchData}
              />
          
          <Searchrecords /> 
          <AttendanceForm
              student_id={state.student_id}
              date={state.date}
              status={state.status}
              editid={state.editid}
              students={state.students}
              setField={(field, value) =>
              dispatch({ type: "SET_FIELDS", field, value })
              }
              handlesubmit={handlesubmit}
            />

          <DisplayRecords
              records={state.records}
              students={state.students}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
          />

        </>
      )}
    </BigContainer>
  );
}

export default App;
