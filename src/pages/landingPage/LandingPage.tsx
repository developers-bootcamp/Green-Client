import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
//import { fetchAllOrders } from '../../redux/'
import UserManagement from '../landingPage/tubComponents/UserManagement'
import { Button, Dialog, DialogContent } from "@mui/material"

const LandingPage: React.FC = () => {

  return <>
    <p>landingPage component here</p>
    <UserManagement></UserManagement>

    
    
  </>
}

export default LandingPage