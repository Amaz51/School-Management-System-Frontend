import React,{useState} from 'react';
import { Button, Container, Form, Input, Select } from '../styles/StyledComponents';

const AttendanceForm = ({ student_id, setField, date, status, handlesubmit, editid, students }) => {
  const [toggle, setToggle] = useState(false);
      const handleClick = () => {
      setToggle(!toggle);
      }
  return (
    <Container>
      <Button onClick={()=>handleClick()}>Add Attendance</Button>
      {toggle ? (
      <Form style={{ padding: "20px" }} onSubmit={handlesubmit}>
        <Select
          name="student_id"
          value={student_id}
          onChange={(e) => setField("student_id", e.target.value)}
          required
        >
          <option value="">Select student</option>
          {students.map((student) => (
            <option key={student.student_id} value={student.student_id}>
              {student.name}
            </option>
          ))}
        </Select>

        <Input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setField("date", e.target.value)}
          required
        />

        <Select
          name="status"
          value={status}
          onChange={(e) => setField("status", e.target.value)}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </Select>

        <Button type="submit">{editid === null ? "Add Attendance" : "Update Attendance"}</Button>
      </Form>):null}
    </Container>
  );
};

export default AttendanceForm;
