import React from 'react'
import { LogoutButton } from '../styles/StyledComponents'

const Logout = ({handleLogout}) => {
    
  return (
    <div><LogoutButton onClick={handleLogout}>Logout</LogoutButton></div>
  )
}

export default Logout