import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import WorkSpace from '../pages/WorkSpace'
import SignIn from '../pages/Login'
import SignUp from '../pages/SignUp'

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
    }
])
export default router