import React, { useState } from "react";
import { Form, Input, Button, Container } from "../styles/StyledComponents";
import { addnewstudent } from "../logic/student";

const AddStudent = ({ onStudentAdded }) => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
  });
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
  setToggle(!toggle);
  }
  const handleChange = (field, value) => {
    setStudent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addnewstudent(student);
      onStudentAdded(); 
      setStudent({ name: "", email: "" });
      alert("Student added successfully!");
    } catch (error) {
      throw new Error(`Failed to add student: ${error.message}`);
    }
  };
  
  return (
    <Container>
    <Button onClick={()=>handleClick()}>Add New Student</Button>
    {
      toggle ? (
        <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Student Name"
        value={student.name}
        onChange={(e) => handleChange("name", e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Student Email"
        value={student.email}
        onChange={(e) => handleChange("email", e.target.value)}
        required
      />
      <Button type="submit">Add Student</Button>
    </Form>
      ) :
      null
    }
    
    </Container>
  );
};

export default AddStudent;