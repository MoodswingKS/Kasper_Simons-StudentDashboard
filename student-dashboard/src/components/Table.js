import { useDispatch, useSelector } from "react-redux"
import { filterList } from "../redux/reducers/filter-reducer"


const Table = () => {
    const data = useSelector((state) => state.list)

    const dispatch = useDispatch()

    const studentItems = data.map(student => {
        const opdracht = student.Opdracht;

        return <li className="table">
            <div className="student">
                {student.Student}
            </div>
            <div className="opdracht">
                {opdracht.length > 10 ? opdracht.substr(0, opdracht.indexOf(' ')) : opdracht}
            </div>
            <div className="moeilijk">
                {student.Moeilijkheid}
            </div>
            <div className="plezier">
                {student.Plezier}
            </div>
        </li>
    })

    return (
        <div>
            <div className="table">
                    <button className="student"
                        onClick={() => dispatch(filterList)}>
                        Student</button>
                    <button className="opdracht"
                        onClick={() => dispatch(filterList)}>
                        Opdracht</button>
                    <button className="moeilijk"
                        onClick={() => dispatch(filterList)}>
                        Moeilijkheid</button>
                    <button className="plezier"
                        onClick={() => dispatch(filterList)}>
                        Plezier</button>
            </div>

                {studentItems}

        </div>
    )
}

export default Table