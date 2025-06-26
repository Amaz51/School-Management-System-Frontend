import React, { useReducer } from 'react';
import {
  Addrow,
  Button,
  Container,
  Input,
  Removerow,
  Select,
  Submitbtn,
} from '../styles/StyledComponents';
import { bulkcreateapi } from '../logic/attendance';
import { initialState, reducer } from './reduce';

const BulkAttendanceCreate = ({ students, fetchData }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (index, field, value) => {
    dispatch({ type: 'UPDATE_RECORD', index, field, value });
  };

  const addRow = () => {
    dispatch({ type: 'ADD_ROW' });
  };

  const removeRow = (index) => {
    dispatch({ type: 'REMOVE_ROW', index });
  };

  const toggleForm = () => {
    dispatch({ type: 'TOGGLE_FORM' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bulkcreateapi(state.records);
      dispatch({ type: 'RESET_FORM' });
      fetchData();
    } catch (error) {
      console.error("Submit error:", error);
      throw new Error(`Failed to submit data: ${error.message}`);
    }
  };

  return (
    <Container>
      <Button onClick={toggleForm}>Bulk Attendance Create</Button>
      {state.toggle && (
        <form onSubmit={handleSubmit}>
          {state.records.map((record, index) => (
            <fieldset
              key={index}
              style={{
                marginBottom: '15px',
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            >
              <Select
                name="student_id"
                value={record.student_id}
                onChange={(e) => handleChange(index, 'student_id', e.target.value)}
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
                value={record.date}
                onChange={(e) => handleChange(index, 'date', e.target.value)}
                required
              />
              <Select
                value={record.status}
                onChange={(e) => handleChange(index, 'status', e.target.value)}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </Select>
              <Removerow type="button" onClick={() => removeRow(index)}>
                Remove
              </Removerow>
            </fieldset>
          ))}

          <Addrow type="button" onClick={addRow}>
            + Add Another
          </Addrow>

          <Submitbtn type="submit">Submit All</Submitbtn>
        </form>
      )}
    </Container>
  );
};

export default BulkAttendanceCreate;
