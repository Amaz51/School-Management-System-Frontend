import React, { useState } from 'react'
import { loginuser } from '../logic/auth'
import { Form, Input, Button, Container, Title } from '../styles/StyledComponents';
import { useNavigate } from 'react-router-dom';
const Login = ({dispatch}) => {
    const navigate = useNavigate();
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')

    // const handlesubmit=async(e)=>{
    //     e.preventDefault();
    //     try {
    //         const msg = await loginuser(username,password)
    //         dispatch({type:"Login"})
    //         alert(msg.data);
    //     } catch (error) {
    //         alert("Login Failed!");
    //     }
    // }
    const handlesubmit = async (e) => {
  e.preventDefault();
  try {
    const msg = await loginuser(username, password);

    localStorage.setItem("access", msg.data.access);
    localStorage.setItem("refresh", msg.data.refresh);

    dispatch({ type: "Login" });
    // alert("Login successful!");
    navigate("/");
  } catch (error) {
    alert("Login Failed!");
  }
};


  return (
    <Container>
        <Title>Login</Title>
        <Form onSubmit={handlesubmit}>
            <Input
            placeholder='Enter username: '
            value={username}
            onChange={(e)=>setusername(e.target.value)}
            required>
            </Input>

            <Input
            placeholder='Enter password : '
            type='password'
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            required></Input>

            <Button type='submit'>Login</Button>

            </Form>
    </Container>
  )
}

export default Login