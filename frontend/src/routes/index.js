import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import WorkSpace from '../pages/WorkSpace'
import SignIn from '../pages/Login'
import SignUp from '../pages/SignUp'
import { Channels } from '../pages/Channels'
import {AddChannel} from "../pages/AddChannel"

const router = createBrowserRouter([{
    path:"/",
    element:<App/>,
    },
    {
        path:"/login",
        element:<SignIn/>,
    },
    {
        path:"/SignUp",
        element:<SignUp/>,
    },
    {
        path:"/WorkSpace",
        element:<WorkSpace/>,
    },
    {
        path:"/Channels",
        element:<Channels/>,
    },
    {
        path:"/channels/addchannel",
        element:<AddChannel/>
    },
])
export default router