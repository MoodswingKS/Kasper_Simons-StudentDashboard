import { VictoryChart, VictoryBar, VictoryGroup, VictoryZoomContainer } from 'victory'
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
        <div>
            Scroll to zoom
            <VictoryChart 
              domainPadding={30} 
              // range={{ x: [averageM.opdrachtFull, 100] }}
              // scale={{ x: "opdrachtFull" }}
              width={1000}
              domain={{y: [0, 5], x: [0, 56]}}
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

export default Chart