import React,{useState} from 'react'
import { ActionButton, Button, Container, Table, TableWrapper, Td, Th, Thead, Tr } from '../styles/StyledComponents'

const DisplayRecords = ({ records, handleDelete, handleEdit, students }) => {
  const [toggle, setToggle] = useState(false);
      const handleClick = () => {
      setToggle(!toggle);
      }
   return (
    <Container>
      <Button onClick={()=>handleClick()}>Display Records</Button>
      {toggle ? (<TableWrapper>
      <Table border="1" cellPadding="10">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        {records.length === 0 ? (
          <Thead>No records found</Thead>
        ) : (
          <tbody>
            {records.map((item) => (
              <Tr key={item.id}>
                <Td>{item.student?.name || "Unknown"}</Td>
                <Td>{item.date || "-"}</Td>
                <Td>{item.status || "-"}</Td>
                <Td>
                  <ActionButton onClick={() => handleEdit(item)}>Edit</ActionButton>
                  <ActionButton onClick={() => handleDelete(item.id)}>Delete</ActionButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        )}
      </Table>
    </TableWrapper>):null}
    
    </Container>
  );
};

export default DisplayRecords;