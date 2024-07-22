import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import loader from '../images/loader.gif' 
import style from '../styling/style.module.css'
const Details = () => {
    const [item, setitem] = useState()
    const [error, seterror] = useState('')
    const [haserr, sethaserr] = useState(false)
    const [isloading, setisloading] = useState(true)
  
    let params=useParams()
    useEffect(()=>{
        axios.get(`https://restful-api-five.vercel.app/product/${params.id}`)
        .then(res=>{
       setitem(res.data.result)
       setisloading(false)
        })
        .catch(err=>{
            console.log(err.message)
            setisloading(false)
            sethaserr(true)
            seterror(err.message)

        })
        },[])

  return (
    <>

{isloading &&

  <div className='container w-50 d-flex justify-content-center'>

<img src={loader} className={style.load} alt='finding'></img>
</div>

      }

    {!isloading &&item&&

<div className='container d-flex w-100 justify-content-center'>

    <div className='card    w-25 my-5 pt-4  h-6'>
    <p className='px-3 fs-5'>{item.description}</p>
    <img src={item.imagepath} alt='finding'></img>
    <br></br>
    <h4 className='px-3 fs-5'>{item.mrp}</h4>

  </div>
</div>
    }
    {
        haserr &&
        <p style={{ color: "red" }}>{error}</p>
      }

    </>

  )
}

export default Details