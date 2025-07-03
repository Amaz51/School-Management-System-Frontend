import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { APIII, StudentOrderAPI } from "./api";
import {
  Login,
  Register,
  AttendanceForm,
  DisplayRecords,
  Logout,
  Searchrecords,
  BulkAttendanceCreate,
  BulkAttendanceUpdate,
  AddStudent,
  DownloadAttendanceSheet,
} from './components/exports.js';
import DragDropBoard from "./components/dragdrop";
import { initialState, reducer } from "./reducer";
import { AddRecord, deleterecord, editiddata, fetchRecords } from "./logic/attendance";
import { fetchingstudents } from "./logic/student";
import { BigContainer, Title } from "./styles/StyledComponents";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const access = localStorage.getItem("access");

      if (access) {
        try {
          dispatch({ type: "Login" });
        } catch (error) {
          if (error.response.status === 401) {
            const refresh = localStorage.getItem("refresh");
            try {
              const refres = await APIII.post("/token/refresh/", { refresh });
              localStorage.setItem("access", refres.data.access);
              localStorage.setItem("refresh", refres.data.refresh);
              dispatch({ type: "Login" });
            } catch {
              localStorage.removeItem("access");
              localStorage.removeItem("refresh");
              dispatch({ type: "Logout" });
            }
          }
        }
      }
      dispatch({ type: "SET_LOADING", loading: false }); 
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetchingstudents();
        dispatch({ type: "SET_STUDENTS", students: res.data });
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    if (state.islogedin) {
      fetchData();
      fetchStudents();
    }
  }, [state.islogedin]);

  const fetchData = async () => {
    try {
      const res = await fetchRecords();
      dispatch({ type: "SET_RECORDS", records: res });
    } catch (error) {
      console.error("Failed to fetch records:", error);
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
      console.error("Failed to submit data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleterecord(id);
      fetchData();
    } catch (error) {
      console.error("Failed to delete record:", error);
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
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    dispatch({ type: "LOGOUT", records: [], islogedin: false });
  };
// const handleLogout = () => {
  //   dispatch({ type: "LOGOUT", records: [], islogedin: false });
  // };
  const Dashboard = () => (
    <>
      <Title>Attendance App</Title>
      <Logout handleLogout={handleLogout} />
      <DownloadAttendanceSheet />
      <AddStudent onStudentAdded={fetchData} />
      <BulkAttendanceUpdate
        student_id={state.student_id}
        students={state.students}
        fetchData={fetchData}
      />
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
        setField={(field, value) => dispatch({ type: "SET_FIELDS", field, value })}
        handlesubmit={handlesubmit}
      />
      <DisplayRecords
        records={state.records}
        students={state.students}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );

  const ProtectedRoute = ({ children }) => {
    return state.islogedin ? children : <Navigate to="/login" />;
  };

  if (state.loading) return <p>Loading</p>; 

  return (
    <Router>
      <BigContainer style={{ padding: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login dispatch={dispatch} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dragdrop"
            element={
              <ProtectedRoute>
                <DragDropBoard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BigContainer>
    </Router>
  );
}

export default App;
