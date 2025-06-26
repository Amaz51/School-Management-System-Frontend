import styled from "styled-components";

export const BigContainer = styled.div`
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
  background:rgb(191, 196, 194);
  
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

export const Container = styled.div`
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
  background:rgb(159, 158, 168);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

export const Title = styled.h1`
  text-align: center;
  color: #1f2937;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;



export const Button = styled.button`
  padding: 10px;
  background:rgb(44, 45, 124);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #4f46e5;
  }
`;

export const RecordCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RecordText = styled.div`
  font-size: 14px;
`;

export const RecordActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const LogoutButton = styled(Button)`
  background: #ef4444;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  padding: 12px;
  transition: background 0.3s;
  cursor: pointer;
  &:hover {
    background: #dc2626;
  }
  &:focus {
    outline: none;
  }
  border: none;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
`;
export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #4e6ef2;
  }
`;

export const TableWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 30px;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`;

export const Thead = styled.thead`
  background-color: #4e6ef2;
  color: white;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f5f5f5;
  }
`;

export const Th = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
`;

export const ActionButton = styled.button`
  padding: 6px 12px;
  margin-right: 6px;
  background-color: ${(props) => (props.edit ? "#4caf50" : "#f44336")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${(props) => (props.edit ? "#3c9742" : "#d73833")};
  }
`;

export const Addrow = styled.button`
  background-color: rgb(28, 65, 61);
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(20, 50, 47);
  }
`;

export const Removerow = styled.button`
  background-color: rgb(220, 38, 38);
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(185, 28, 28);
  }
`;

export const Submitbtn = styled.button`
  background-color: rgb(23, 37, 163);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(30, 50, 200);
  }
`;

export const Input = styled.input`
  padding: 10px;
  margin: 5px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #6366f1;
  }
`;
