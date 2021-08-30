import { VictoryChart, VictoryBar, VictoryGroup, VictoryLabel } from 'victory'
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
          moeilijkheid: moeilijkheidsMargin,
          plezier: plezierMargin,
          id: index
        }
    
      })
      return moeilijkheidArray
    }
    const averageM = getMoeilijkheidForStudent()
    console.log(averageM)

    return (
        <div>
            <VictoryChart domainPadding={30} width={1000} labelComponent={
              <VictoryLabel angle={-45} textAnchor="end"/>
            }>
            <VictoryGroup offset={2}
            >
            <VictoryBar 
                data={averageM}
                x="opdracht"
                // labelComponent={
                //   <VictoryLabel angle={-45} textAnchor="end"/>
                // }
                // labels="opdracht"
                y="moeilijkheid"
                style={{
                  data: {
                    fill: "#004DFF",
                    fillOpacity: 0.7
                  }}}
            />
            <VictoryBar 
                data={averageM}
                x="opdracht"
                y="plezier"
                style={{
                  data: {
                    fill: "#FFAE00",
                    fillOpacity: 0.7
                  }}}
            />
            </VictoryGroup>
            </VictoryChart>
        </div>
    )
}

export default Chart