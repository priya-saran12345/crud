import React, { useState } from 'react'
import axios from 'axios'
import  style from '../styling/style.module.css'
import img from '../images/me.JPG'
import loader from '../images/loader.gif'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
var FormData = require('form-data');
const Addcategory = () => {


  const [product, setproduct] = useState('')
  const [image, setimage] = useState(null)
  const [price, setprice] = useState()
  const [seeimage, setseeimage] = useState(img)
  const [isloading, setisloading] = useState(false)
const [error, seterror] = useState('')
const [haserr, sethaserr] = useState(false)
  let navigate=useNavigate()
//file handler code for the image representation
  // subit handler function for submitting the code 
  const submithandler = (e) => {
    e.preventDefault()
    setisloading(true)
    const fD=new FormData()
    fD.append('description',product)
    fD.append('mrp',price)
    fD.append('photo',image)
    console.log(fD)
    axios.post('https://restful-api-five.vercel.app/product',fD,
      {
        headers:{
          Authorization:'Bearer '+localStorage.getItem('token')
        }}
  
    )
    .then(result=>{
setisloading(true)
console.log(result.data)
setseeimage(img)
setisloading(false)
navigate('/category')



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
        {/* <Navbar/> */}

       <h2 className={`${style.h1}   text-center my-4`}>Add a new Product</h2>
       {isloading && 
        <div className='container w-50 d-flex justify-content-center'>

<img src={loader} className={style.load} alt='finding'></img>
</div>

       }
       {!isloading && 
        <div className={`container w-25  rounded  py-3  my-4 d-flex justify-content-center ${style.add}`}>
       <form onSubmit={submithandler}>
          <input type='text' className='w-100 p-1 rounded m-bottom-3 '  placeholder='prodcut description' onChange={(e) => {
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
          <img  className=' rounded' src={seeimage} alt='not find' height='100px' width="100px"></img>
          <br></br>
          <br></br>


          <input type='number' onChange={(e) => {
            setprice(e.target.value)
          }}   className='w-100 p-1 rounded fs-6' placeholder='price'></input>
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

export default Addcategory
