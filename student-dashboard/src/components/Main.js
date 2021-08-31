import Chart from "./Chart";
import { Route, Switch } from "react-router-dom";
import ChartStudent from "./ChartStudent";
import { useSelector } from "react-redux";

const Main = () => {
  const studentList = useSelector((state) => state.students);

  const studentRoute = studentList.map((student, index) => {
    const routeName = `/${student.toString()}`;
    return (
      <Route path={routeName} key={index}>
        <div className="studentRoute">
          <ChartStudent />
        </div>
      </Route>
    );
  });

  return (
    <Switch>
      <Route exact path="/">
        <Chart />
      </Route>
      {studentRoute}
    </Switch>
  );
};

export default Main;
