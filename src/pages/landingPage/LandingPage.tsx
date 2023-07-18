import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchAllOrders } from '../../redux/actions/orderAction'
import TabsComponent from "./TabsComponent"
import {useStyles} from "./TabsComponent.styles"

const LandingPage: React.FC = () => {

    const dispatch = useDispatch()
    const classes = useStyles();

    useEffect(() => {
        // dispatch(fetchAllOrders())
    }, [] )

    return <>
    
    <TabsComponent 
    // style={{
    //         marginRight:"3%",
    //         position: "absolute"
    //         ,bottom: "4%"
    //         ,right: "3rem",
    //         textAlign:"right"}}
            />
    </>
    //className={classes.TabsComponent}
}
export default LandingPage