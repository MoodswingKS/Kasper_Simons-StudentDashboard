import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Main from './components/Main'
import React, { useEffect, useState } from 'react';
// csv
import Papa from 'papaparse'
import mockdata from './redux/reducers/mockdata_winc.csv'
// redux
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showData } from './redux/actions'

const App = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const ActionCreator = bindActionCreators(showData, dispatch)

  
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async (dispatch) => {
      const response = await fetch(mockdata)
      const reader = response.body.getReader()
      const result = await reader.read()
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value)
      const results =  Papa.parse(csv, { header: true, dynamicTyping: true })
      setData(data)
      return dispatch(results.data)
    }
    fetchData()
  }, [data])

  const getNames = () => {
    const allNames = data.map(name => name.Student);
    const nameList = [...new Set(allNames)]
    return nameList
  }

  const getOpdrachten = () => {
    const allAssignments = data.map(assignment => assignment.Opdracht)
    const allOpdrachten = [...new Set(allAssignments)]
    return allOpdrachten
  }
  const studentList = getNames()
  const opdrachtLijst = getOpdrachten()


  const getMoeilijkheidForStudent = () => {
  
    const moeilijkheidArray = studentList.map((student, index) => {

      const studentData = data.filter(item => {
        return student === item.Student
      })

      const moeilijkheidTotaal = studentData.map(m => m.Moeilijkheid) 


      const totaalPerStudent = moeilijkheidTotaal.reduce((accumulator, currentValue) => accumulator + currentValue)
      const valueMoeilijkheid = totaalPerStudent / opdrachtLijst.length
      const moeilijkheidsMargin = Math.round(valueMoeilijkheid)

      return {
        student: student,
        moeilijkheid: moeilijkheidsMargin,
        id: index
      }
  
    })
    // dispatch({ moeilijkheidArray })
    return moeilijkheidArray
  }

  const averageM = getMoeilijkheidForStudent()


  
  return (
    <div className="App">
      <Header />
      <Nav />
      <Main data={data} 
            studentList={studentList} 
            opdrachtLijst={opdrachtLijst} 
            averageM={averageM} />
      <Footer />
    </div>
  );
}


export default App;
