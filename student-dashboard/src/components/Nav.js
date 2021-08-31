import { useDispatch, useSelector } from "react-redux"
import { Link, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { getLocation } from "../redux/reducers/location-reducer";
// import { useRouter } from "../useRouter";
export const newHistory = createBrowserHistory();


const Nav = () => {
    const dispatch = useDispatch()
    const studentList = useSelector(state => state.students)
    const studentNavigation = studentList.map((student, index) => {
        return(
            <Link key={index} to={student} onClick={() => dispatch(getLocation)}> 
                {student}
            </Link>
        )
    })

    // const router = useRouter()
   

    return(
        <Router history={newHistory}>
        <div className="nav">
            {studentNavigation}
        </div>
        <div className="nav">
            <Link key="00" to="/">
                Home
            </Link>
            <Link key="11" to="/List" 
            // onClick={(e) => router.push("/about")}
            >
                Studentdata
            </Link>
        </div>
        </Router>
    )
}

export default Nav