import Chart from './Chart'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ChartStudent from './ChartStudent'
import { useSelector } from 'react-redux'
import Table from './Table'
import { createBrowserHistory } from 'history'
export const newHistory = createBrowserHistory();

const Main = () => {
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
        <Router history={newHistory}> 
            <Switch>
                <Route exact path="/">
                    <Chart />
                </Route>
                {studentRoute}
                <Route path="/List">
                    <Table />
                </Route>
            </Switch>
        </Router>
    )
}

export default Main