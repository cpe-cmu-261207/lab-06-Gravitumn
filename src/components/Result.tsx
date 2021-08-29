import { useEffect, useState } from "react"
import axios from 'axios'

type bpi = Record<string, number>;
type Data = {
  bpi: bpi
  disclaimer: String
  time: {
    updated: String
    updatedISO: String
  }
}

const Result = () => {
  const params = new URLSearchParams(window.location.search)
  const start = params.get('start')
  const end = params.get('end')
  const [data, setdata] = useState<Data | null>(null)
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(false)
  const [arr,setarr] = useState<string[]>([])

  const fetchApi = async () => {
    try {
      const resp =
        await axios.get<Data>(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${start}&end=${end}`)
      setdata(resp.data)
      setloading(false)
    }
    catch (err) {
      setloading(false)
      seterror(true)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  const datelist = () => {
    if (data != null) {
      for (const [key, value] of Object.entries(data.bpi)) {
        console.log(`${key}: ${value}`)
        let st = `${key} - ${value.toLocaleString()} THB`
        let newarr = [...arr,st]
        

      }
      return(
        <div>
          <p className='text-xl font-semibold'> ( From {start} To {end})</p>
          <ul id='list'></ul>
        </div>
      )
    }
  }

  const render = () => {
    if (loading)
      return <p className='text-2xl'>Loading ...</p>
    else if (error)
      return <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
    else
      return (
        <div>{datelist()}</div>
      )
  }

  return (
    <div className='text-center space-y-3'>
      <p className='text-2xl font-semibold'>Historical price</p>
      {render()}
    </div>
  )
}
export default Result