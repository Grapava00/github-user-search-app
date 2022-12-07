import React, { useEffect } from 'react'
import axios from 'axios'


export default function App(){
    // const [input, setInput] = React.useState('')
    const [data, setData] = React.useState('')

    const fetchData = () =>{
        axios.get("https://api.github.com/users/grapava00")
        .then((res)=>{setData(res.data)})
    }

    useEffect(()=>{
        fetchData()
    },[])


    return(
     <>
       <button onClick={fetchData}>fetch</button>
       {data.created_at}
    </>
    )
}