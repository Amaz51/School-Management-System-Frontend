import React, { useEffect, useState } from 'react';
import { Button, Container, Input, Select } from '../styles/StyledComponents';
import { bulkupdateapi, fetchRecords } from '../logic/attendance';

const BulkAttendanceUpdate = ({ students, fetchData }) => {
  const [records, setRecords] = useState([]);
  const [toggle, setToggle] = useState(false);
    const handleClick = () => {
    setToggle(!toggle);
    }
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchRecords();
        setRecords(res);
      } catch (error) {
        throw new Error(`Failed to load records: ${error.message}`);
      }
    };

    loadData();
  }, []);

  const handleChange = (index, field, value) => {
    const newRecords = [...records];
    newRecords[index][field] = value;
    setRecords(newRecords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bulkupdateapi(records);
      fetchData();
    } catch (error) {
      throw new Error(`Failed to update attendance: ${error.message}`);
    }
  };

  return (
    <Container style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <Button onClick={()=>handleClick()}>Bulk Attendance Update</Button>
      {toggle ? (
      <form onSubmit={handleSubmit}>
        {records.map((record, index) => (
          <div
            key={record.id || index}
            style={{
              marginBottom: '15px',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '5px',
              background: '#f9f9f9',
            }}
          >
            <Select
              name="student_id"
              value={record.student_id} 
              onChange={(e) => handleChange(index, 'student_id', e.target.value)}
              required
              disabled 
            >
              <option value="">Select student</option>
              {students.map((student) => (
                <option
                  key={student.student_id}
                  value={student.student_id} 
                >
                  {student.name}
                </option>
              ))}
            </Select>

            <Input
              type="date"
              value={record.date}
              onChange={(e) => handleChange(index, 'date', e.target.value)}
              required
              style={{ marginRight: '10px' }}
            />

            <Select
              value={record.status}
              onChange={(e) => handleChange(index, 'status', e.target.value)}
              style={{ marginRight: '10px' }}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </Select>
          </div>
        ))}
        <button
          type="submit"
          style={{
            backgroundColor: '#28a745',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Update All
        </button>
      </form>) : null}
    </Container>
  );
};

export default BulkAttendanceUpdate;
