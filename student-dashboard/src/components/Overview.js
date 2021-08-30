import Chart from './Chart'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ChartStudent from './ChartStudent'
import { useSelector } from 'react-redux'


const Overview = () => {
    const studentList = useSelector((state) => state.students)


    const studentRoute = studentList.map((student, index) => {
        const routeName = `/${student.toString()}`
        return <Route path={routeName} key={index}>
                <div className="studentRoute">
                    <ChartStudent />
                </div>
            </Route>
    })

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Chart}>
                    <div>
                        <h3>Overview User-Story</h3>
                        <p>*Blue = Difficulty</p>
                        <p>*Yellow = Enjoyment</p>
                        <Chart />
                    </div>
                </Route>
                {studentRoute}
            </Switch>
        </Router>
    )
}

export default Overview