import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchAllOrders } from '../../redux/actions/orderAction'

const LandingPage: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(fetchAllOrders())
    }, [])

    return <>
    </>
}
export default LandingPage