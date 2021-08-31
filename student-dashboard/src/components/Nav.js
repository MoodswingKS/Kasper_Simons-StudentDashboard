import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
  const studentList = useSelector((state) => state.students);
  const studentNavigation = studentList.map((student, index) => {
    return (
      <Link key={index} to={student}>
        {student}
      </Link>
    );
  });

  return (
    <div>
      <hr />
      <div className="nav">{studentNavigation}</div>
      <hr />
      <div className="nav">
        <Link key="00" to="/">
          Home
        </Link>
      </div>
      <hr />
    </div>
  );
};

export default Nav;
