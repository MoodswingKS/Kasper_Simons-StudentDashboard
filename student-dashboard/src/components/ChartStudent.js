import { VictoryChart, VictoryBar, VictoryGroup, VictoryZoomContainer } from 'victory'
import { useSelector } from 'react-redux'

const ChartStudent = () => {
    const data = useSelector((state) => state.list)
    const opdrachtLijst = useSelector((state) => state.assignments)

    const studentNameUrl = window.location.pathname.replace("/", "")

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
            TEST<br />
            {studentNameUrl}<br />
            Scroll to zoom
            <VictoryChart 
              domainPadding={30} 
              width={1000}
              domain={{y: [0, 5]}}
              containerComponent={<VictoryZoomContainer 
                zoomDimension="x"
                zoomDomain={{x: [0, 10]}}/>}
            >
            
            <VictoryGroup offset={20}
            >
            <VictoryBar 
                data={averageM}
                x="opdracht"
                y="moeilijkheid"
                style={{
                  data: {
                    width: 30,
                    fill: "#004DFF",
                    fillOpacity: 0.8
                  }}}
            />
            <VictoryBar 
                data={averageM}
                x="opdracht"
                y="plezier"
                style={{
                  data: {
                    width: 30,
                    fill: "#FFAE00",
                    fillOpacity: 0.8
                  }}}
            />
            </VictoryGroup>
            </VictoryChart>
        </div>
    )
}

export default ChartStudent