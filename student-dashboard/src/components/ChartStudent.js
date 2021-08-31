import {
  VictoryChart,
  VictoryBar,
  VictoryGroup,
  VictoryZoomContainer,
  VictoryAxis,
  VictoryLabel,
  VictoryLine,
} from "victory";
import { useSelector } from "react-redux";

const ChartStudent = () => {
  const data = useSelector((state) => state.list);
  const opdrachtLijst = useSelector((state) => state.assignments);
  const studentNameUrl = window.location.pathname.replace("/", "");

  const getStudentData = () => {
    const studentFilter = data.filter(
      (student) => student.Student === studentNameUrl
    );
    const studentArray = opdrachtLijst.map((opdracht, index) => {
      const assignmentData = studentFilter.filter((item) => {
        return opdracht === item.Opdracht;
      });
      const getPlezier = assignmentData.map((data) => data.Plezier);
      const getMoeilijkheid = assignmentData.map((data) => data.Moeilijkheid);

      return {
        opdracht:
          opdracht.length > 10
            ? opdracht.substr(0, opdracht.indexOf(" "))
            : opdracht,
        name: index.toString(),
        moeilijkheid: getMoeilijkheid[0],
        plezier: getPlezier[0],
        id: index,
      };
    });
    return studentArray;
  };
  const averageM = getStudentData();

  return (
    <div>
      <h3>{studentNameUrl}</h3>
      <VictoryChart
        domainPadding={20}
        width={1200}
        domain={{ y: [0, 5] }}
        containerComponent={
          <VictoryZoomContainer zoomDimension="x" allowPan={false} />
        }
      >
        <VictoryGroup offset={20}>
          <VictoryBar
            data={averageM}
            x="opdracht"
            y="moeilijkheid"
            cornerRadius={{ topLeft: 20 }}
            style={{
              data: {
                width: 30,
                fill: "#004DFF",
                fillOpacity: 0.8,
              },
            }}
          />
          <VictoryBar
            data={averageM}
            x="opdracht"
            y="plezier"
            cornerRadius={{ topLeft: 20 }}
            style={{
              data: {
                width: 30,
                fill: "#FFAE00",
                fillOpacity: 0.8,
              },
            }}
          />
        </VictoryGroup>
        <VictoryAxis
          tickFormat={averageM.opdrachtFull}
          tickLabelComponent={<VictoryLabel angle={40} textAnchor="start" />}
        />
        <VictoryAxis dependentAxis />
      </VictoryChart>
      <br />
      <div className="contentText">
        <div
          style={{
            backgroundColor: "#004DFF",
            color: "white",
            borderRadius: "20px",
            width: "155px",
          }}
        >
          <p>Difficulty</p>
        </div>
        <div
          style={{
            backgroundColor: "#FFAE00",
            borderRadius: "20px",
            width: "155px",
          }}
        >
          <p>Enjoyment</p>
        </div>
      </div>
      <VictoryChart
        domainPadding={20}
        width={1200}
        domain={{ y: [0, 5], x: [0, 56] }}
        containerComponent={
          <VictoryZoomContainer zoomDimension="x" allowPan={false} />
        }
      >
        <VictoryLine
          style={{
            data: { stroke: "#004DFF" },
            parent: { border: "2px solid #ccc" },
          }}
          data={averageM}
          x="opdracht"
          y="moeilijkheid"
        />
        <VictoryLine
          style={{
            data: { stroke: "#FFAE00" },
            parent: { border: "2px solid #ccc" },
          }}
          data={averageM}
          x="opdracht"
          y="plezier"
        />
        <VictoryAxis
          tickFormat={averageM.opdrachtFull}
          tickLabelComponent={<VictoryLabel angle={40} textAnchor="start" />}
        />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    </div>
  );
};

export default ChartStudent;
