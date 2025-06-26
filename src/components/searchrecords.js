import React,{useEffect, useState} from 'react'
import { Button, Container, Form, Input, Table, TableWrapper, Tbody, Td, Th, Thead, Tr } from '../styles/StyledComponents';
import { fetchRecords } from '../logic/attendance';

const Searchrecords = () => {
    const [records, setRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [toggle, setToggle] = useState(false);
        const handleClick = () => {
        setToggle(!toggle);
        }
    useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchRecords()
        setRecords(res);
      } catch (error) {
        throw new Error('Error fetching records:', error);
      }
    };

    fetchData();
  }, []);
  

    const handlesubmit = (e) => {
  e.preventDefault();
  try {
    const filteredRecords = records.filter(record => 
      (record.student.name && record.student.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (record.date && record.date.includes(searchTerm))
    );
    setSearchResults(filteredRecords);
  } catch (error) {
    throw new Error('Error filtering records:', error);
  }
};

  return (
    <Container>
      <Button onClick={()=>handleClick()}>Search Attendance Records</Button>
      {toggle ? (
        <div>
        <Form onSubmit={handlesubmit}>
        <Input
          type="text"
          placeholder="Search by student name or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </Form>
      {searchResults.length > 0 ? (
        <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchResults.map((record, index) => (
              <Tr key={index}>
                <Td>{record.student.name || "N/A"}</Td>
                <Td>{record.date}</Td>
                <Td>{record.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        </TableWrapper>
      ) : (
        <p>No records found</p>
      )}
      </div>
       )
      : null}
      

      
    </Container>
  )
}

export default Searchrecords