import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchAllOrders } from '../../redux/actions/orderAction'
import UserManagement from '../landingPage/tubComponents/UserManagement'

const LandingPage: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(fetchAllOrders())
    }, [])

    return <>
    <p>landingPage component here</p>
    <UserManagement></UserManagement>

    
    </>
}
export default LandingPage