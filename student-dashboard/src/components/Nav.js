import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { getLocation } from "../redux/reducers/location-reducer";



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
        <div>
        <div className="nav">
            {studentNavigation}
        </div>
        <div className="nav">
            <Link key="00" to="/">
                Home
            </Link>
            <Link key="11" to="/List">
                Studentdata
            </Link>
        </div>
        </div>
    )
}

export default Nav