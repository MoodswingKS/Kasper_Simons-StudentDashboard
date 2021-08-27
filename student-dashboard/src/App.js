import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Main from './components/Main'
import React from 'react';
// redux
import { useSelector } from 'react-redux';


const App = () => {
  const data = useSelector((state) => state.list)
  

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
    return moeilijkheidArray
  }

  const averageM = getMoeilijkheidForStudent()


  
  return (
    <div className="App">
      <Header />
      <Nav />
      <Main 
            studentList={studentList} 
            opdrachtLijst={opdrachtLijst} 
            averageM={averageM} 
            />
      <Footer />
    </div>
  );
}


export default App;
