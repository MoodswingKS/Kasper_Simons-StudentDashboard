// csv
import Papa from 'papaparse'
import mockdata from './redux/reducers/mockdata_winc.csv'

export const fetchData = async () => {
    const response = await fetch(mockdata)
    const reader = response.body.getReader()
    const result = await reader.read()
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value)
    const results =  Papa.parse(csv, { header: true, dynamicTyping: true })
    const data = results.data
    console.log(data)
    return data
  }
