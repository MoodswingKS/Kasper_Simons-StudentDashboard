import { useSelector } from "react-redux"
import { Link, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const newHistory = createBrowserHistory();


const Nav = () => {
    const studentList = useSelector(state => state.students)
    console.log(studentList)
    const studentNavigation = studentList.map((student, index) => {
        return(
            <Link key={index} to={student}> 
                {student}
            </Link>
        )
    })
   

    return(
        <Router history={newHistory}>
        <div className="nav">
            {studentNavigation}
        </div>
        <div className="nav">
            
        </div>
        </Router>
    )
}

export default Nav