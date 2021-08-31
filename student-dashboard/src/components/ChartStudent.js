import { VictoryChart, VictoryBar, VictoryGroup, VictoryZoomContainer, VictoryAxis, VictoryLabel } from 'victory'
import { useSelector } from 'react-redux'


const ChartStudent = () => {
    const data = useSelector((state) => state.list)
    const opdrachtLijst = useSelector((state) => state.assignments)
    const studentNameUrl = window.location.pathname.replace("/", "")

    const toggleColor = {
            externalMutations: [
              {
               mutation: () => ({ style: "tomato" }),
              }
            ]
    }

    const getStudentData = () => {
        const studentFilter = data.filter(student => student.Student === studentNameUrl)
        const studentArray = opdrachtLijst.map((opdracht, index) => {
            const assignmentData = studentFilter.filter(item => {
                return opdracht === item.Opdracht
            })
            const getPlezier = assignmentData.map(data => data.Plezier)
            const getMoeilijkheid = assignmentData.map(data => data.Moeilijkheid)

            return {
                opdracht: opdracht.length > 10 ? opdracht.substr(0, opdracht.indexOf(' ')) : opdracht,
                name: index.toString(),
                moeilijkheid: getMoeilijkheid[0],
                plezier: getPlezier[0],
                id: index
            }
        })
        return studentArray
    }
    const averageM = getStudentData()
    console.log(averageM)

    return (
        <div>
            <br />
            {studentNameUrl}<br />
            <p>Scroll to zoom,<br />press the buttons to toggle</p>
            <br />
            <div className="contentText">
                <div style={{ "backgroundColor": "#004DFF", "color": "white", "borderRadius": "20px", "width": "155px" }}
                    // onClick={toggleColor}
                    >
                    <p>Difficulty</p>
                </div>
                <div style={{ "backgroundColor": "#FFAE00", "borderRadius": "20px", "width": "155px" }}
                    >
                    <p>Enjoyment</p>
                </div>
            </div>
            <VictoryChart
                domainPadding={20}
                width={1200}
                domain={{ y: [0, 5] }}
                containerComponent={<VictoryZoomContainer
                    zoomDimension="x"
                    allowPan={false}
                />}
                // externalEventMutations={toggleColor.externalMutations}
                // events={[
                //   {
                //     eventHandlers: {
                //         // disable default label events
                //         onMouseOver: () => {},
                //         onMouseOut: () => {},
                //         //  set up click toggle labels
                //         onClick: () => {
                //           return [
                //             {
                //                 target: ["data"],
                //                 eventKey: "all",
                //                 mutation: () => ({ style: undefined }),
                //             }
                //           ];
                //         }
                //       }
                //   }
                // ]}
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
                                fillOpacity: 0.8
                            }
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
                                fillOpacity: 0.8
                            }
                        }}
                    />
                </VictoryGroup>
                <VictoryAxis
                    tickFormat={averageM.opdrachtFull}
                    tickLabelComponent={
                        <VictoryLabel angle={40} textAnchor="start" />
                    } />
                <VictoryAxis dependentAxis />
            </VictoryChart>
        </div>
    )
}

export default ChartStudent