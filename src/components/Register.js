import React, { useState } from 'react'
import { registeruser } from '../logic/auth'
import { Button, Container, Form, Input, Title } from '../styles/StyledComponents'

const Register = () => {
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')

    const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
            const res=await registeruser(username,password)
        alert(res.data)
        } catch (error) {
            alert("Registeration Failed!");
        }
    }

  return (
    <Container>
        <Title>Register</Title>
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

            <Button type='submit'>Register</Button>
        </Form>
    </Container>
  )
}

export default Register