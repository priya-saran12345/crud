import React, { useEffect, useState } from 'react'
import axios from 'axios'
import img from '../images/me.JPG'
import loader from '../images/loader.gif'
import { useNavigate, useParams } from 'react-router-dom';
import style from '../styling/style.module.css'
var FormData = require('form-data');

const Update = () => {
    
    let navigate=useNavigate()
    let params=useParams()

    const [isloading, setisloading] = useState(false)
    const [error, seterror] = useState('')
    const [haserr, sethaserr] = useState(false)
    const [product, setproduct] = useState('')
    const [image, setimage] = useState('')
    const [price, setprice] = useState()
    const [seeimage, setseeimage] = useState(img)
//use effect code
useEffect(()=>{
let id=params.id
    axios.get(`https://restful-api-five.vercel.app/product/${id}`)
    .then(res=>{
      setisloading(true)
        setproduct(res.data.result.description)
        setprice(res.data.result.mrp)
        setseeimage(res.data.result.imagepath)
        sethaserr(false)
        setisloading(false)
    })
    .catch(err=>{
        seterror(err.message)
        sethaserr(true)
        setisloading(false)

    })


},[])

    //submit handler
    const submithandler = (e) => {
        e.preventDefault()
        setisloading(true)
        const fD=new FormData()
        fD.append('description',product)
        fD.append('mrp',price)
        fD.append('photo',image)
        axios.put(`https://restful-api-five.vercel.app/product/${params.id}`,fD,
          {
            headers:{
              Authorization:'Bearer '+localStorage.getItem('token')
            }}
      
        )
        .then(result=>{
    console.log(result.data)
    setisloading(false)
    setseeimage(img)
    navigate('/dashboard/category')
    
    
    
        })
        .catch(err=>{
    
    console.log(err)
    sethaserr(true)
    seterror(err.message)
    setisloading(false)
    setseeimage(img)
        })
    
      }
      
  return (

<>
{isloading && 
  <div className='container w-50 d-flex justify-content-center'>

<img src={loader} className={style.load} alt='finding'></img>
</div>

}
{!isloading && !haserr&&


<div className={`container w-25  rounded  py-3  my-4 d-flex justify-content-center ${style.add}`}>

<form onSubmit={submithandler}>
          <input type='text' placeholder='prodcut description'className='w-100 p-1 rounded m-bottom-3 ' value={product} onChange={(e) => {
            setproduct(e.target.value)
          }}>
          </input>
          <br></br>
          <br></br>
          <input type='file' placeholder='image ' onChange={(e) => {
            setimage(e.target.files[0])
setseeimage(URL.createObjectURL(e.target.files[0]))


          }} ></input>
          <br></br>

          <br></br>
          <img src={seeimage} alt='not find' height='100px'className=' rounded' width="100px"></img>
          <br></br>
          <br></br>
          <input type='number' className='w-100 p-1 rounded fs-6' onChange={(e) => {
            setprice(e.target.value)
          }} placeholder='price' value={price}></input>
          <br></br>
          <br></br>
          <input type='submit' className='btn btn-primary' ></input>
        </form>
</div>
        }

    {
      haserr&&<p style={{color:"red"}}>{error} </p>
      }

</>

)
}

export default Update