import axios from 'axios'
import { useState,useEffect } from 'react'
type Data = {
    time:{
        updated:String
        updatedISO:String
        updateduk:String
    }
    disclaimer:String
    bpi:{
        USD:{
            code:String
            rate:String
            description:String
            rate_float:Number
        }
        THB:{
            code:String
            rate:String
            description:String
            rate_float:Number
        }
    }
}

const Current = () => {
    const [price,setprice] = useState<Data|null>(null)
    const [loading,setloading] = useState(true)
    const [error,seterror] = useState(false)
    const fetchApi = async () => {
		try {
			const resp =
				await axios.get<Data>(`https://api.coindesk.com/v1/bpi/currentprice/thb.json`)
            setprice(resp.data)
            setloading(false)
		}
		catch (err) {
            setloading(false)
            seterror(true)
		}
	}
    useEffect(()=>{
        fetchApi()
    })
    const render = () => {
		if (loading)
			return <p className='text-2xl'>Loading ...</p>
		else if (error)
			return <p>There was some error !</p>
		else
			return (
                <div>
				<p className='text-2xl'><p className='text-2xl'>{price?.bpi.THB.rate.toLocaleString()} THB</p></p>  
                <p> (Last updated {price?.time.updated}) </p>
                </div>
			)
	}

    return (
        <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>Current price</p>
            {render()}
        </div>
    )
}
export default Current