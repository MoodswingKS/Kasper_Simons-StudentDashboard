import { VictoryChart, VictoryBar, VictoryGroup, VictoryZoomContainer, VictoryAxis, VictoryLabel } from 'victory'
import { useSelector } from 'react-redux'

const Chart = () => {
  const data = useSelector((state) => state.list)
  const opdrachtLijst = useSelector((state) => state.assignments)

  const getMoeilijkheidForStudent = () => {
    const moeilijkheidArray = opdrachtLijst.map((opdracht, index) => {

      const assignmentData = data.filter(item => {
        return opdracht === item.Opdracht
      })
      const moeilijkheidTotaal = assignmentData.map(m => m.Moeilijkheid)
      const plezierTotaal = assignmentData.map(p => p.Plezier)
      const totaalMPerOpdracht = moeilijkheidTotaal.reduce((accumulator, currentValue) => accumulator + currentValue)
      const totaalPPerOpdracht = plezierTotaal.reduce((accumulator, currentValue) => accumulator + currentValue)

      const valueMoeilijkheid = totaalMPerOpdracht / 10;
      const valuePlezier = totaalPPerOpdracht / 10;
      const moeilijkheidsMargin = Math.round(valueMoeilijkheid)
      const plezierMargin = Math.round(valuePlezier)

      return {
        opdracht: opdracht.length > 10 ? opdracht.substr(0, opdracht.indexOf(' ')) : opdracht,
        opdrachtFull: index,
        moeilijkheid: moeilijkheidsMargin,
        plezier: plezierMargin,
        id: index
      }

    })
    return moeilijkheidArray
  }
  const averageM = getMoeilijkheidForStudent()
  return (
    <div className="chartContainer">
      <h3>Overview User-Story</h3>
      <p>Scroll to zoom,<br />press the buttons to toggle</p>
      <br />
      <div className="contentText">
        <div style={{ "backgroundColor": "#004DFF", "color": "white", "borderRadius": "20px", "width": "155px" }}
          onClick={''}>
          <p>Difficulty</p>
        </div>
        <div style={{ "backgroundColor": "#FFAE00", "borderRadius": "20px", "width": "155px" }}
          onClick={''}>
          <p>Enjoyment</p>
        </div>
      </div>
      <VictoryChart
        domainPadding={20}
        width={1200}
        domain={{ y: [0, 5], x: [0, 56] }}
        containerComponent={<VictoryZoomContainer
          zoomDimension="x"
          allowPan={false}
        />}
      >
        <VictoryGroup offset={20}>
          <VictoryBar name="m"
            data={averageM}
            x="opdracht"
            y="moeilijkheid"
            cornerRadius={{ topLeft: 20 }}
            style={{
              data: {
                width: 20,
                fill: "#004DFF",
                fillOpacity: 0.8
              }
            }}
          />
          <VictoryBar name="p"
            data={averageM}
            x="opdracht"
            y="plezier"
            cornerRadius={{ topLeft: 20 }}
            style={{
              data: {
                width: 20,
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

export default Chart