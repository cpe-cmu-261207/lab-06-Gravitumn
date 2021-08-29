import { useHistory } from "react-router-dom"
import { useState } from "react";
const Historical = () => {
    let history = useHistory()
    const [start,setStart] = useState<string>("")
    const [end,setEnd] = useState<string>("")
    function handleClick(){
        let begin = new Date(Date.parse(start))
        let last = new Date(Date.parse(end))
        if(start==="" || end==="" || begin>last){
            alert("Please select start date and end date correctly")
        }
        else{
        history.push(`/history/result?start=${start}&end=${end}`)
        }
    }
    return(
    <div className='text-center space-y-3 space-x-3'>
        <p className='text-2xl font-semibold'>Select historical range</p>
        <span>From date</span>
        <input type='date' onChange={e => setStart(e.target.value)}></input>
        <span>To date</span>
        <input type='date' onChange={e => setEnd(e.target.value)}></input>
        <br />
        <button type="button" onClick={handleClick}>Get data</button>
    </div>
    )
}
export default Historical