import React, { useState } from 'react';
import { Button, Container, Input, Submitbtn } from '../styles/StyledComponents';
import axios from 'axios';

const DownloadAttendanceSheet = () => {
  const [email, setEmail] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const [toggle, setToggle] = useState(false);
      const handleClick = () => {
      setToggle(!toggle);
      }
  const handleDownload = async () => {
    if (!email) {
      setError("Please enter an email.");
      return;
    }

    setError('');
    setDownloading(true);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/attendance/download?email=${email}`,
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${email}_attendance.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Failed to download sheet. Make sure email is valid.");
      console.error('Download error:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Container>
      
      <Button onClick={()=>handleClick()}>Download Attendance Sheet</Button>
      {toggle ? (
        <div>
      <Input
        type="email"
        placeholder="Enter student email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '15px', width: '100%' }}
      />

      <Submitbtn
        onClick={()=>handleDownload()}
        disabled={downloading}
        style={{ width: '100%' }}
      >
        {downloading ? 'Downloading...' : 'Download Sheet'}
      </Submitbtn>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
      </div>
      ) : null}
      
    </Container>
  );
};

export default DownloadAttendanceSheet;
