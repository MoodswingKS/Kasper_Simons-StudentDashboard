import Chart from './Chart'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ChartStudent from './ChartStudent'
import { useSelector } from 'react-redux'


const Overview = () => {
    const studentList = useSelector((state) => state.students)

    const studentRoute = studentList.map((student, index) => {
        const routeName = `/${student.toString()}`
        console.log(routeName)
        return <Route path={routeName} key={index}>
                <div className="studentRoute">
                    <ChartStudent />
                </div>
            </Route>
    })

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div>
                        <h3>Overview User-Story</h3>
                        <Chart />
                    </div>
                </Route>
                {studentRoute}
            </Switch>
        </Router>
    )
}

export default Overview