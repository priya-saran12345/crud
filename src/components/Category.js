import React, { useEffect, useState } from 'react'
import axios from 'axios'
import loader from '../images/loader.gif'
import { useNavigate } from 'react-router-dom'
import style from '../styling/style.module.css'
import { IoSearchOutline } from "react-icons/io5";
import Navbar from './Navbar'


const Category = () => {
  const navigate = useNavigate()
  const [error, seterror] = useState('')
  const [haserr, sethaserr] = useState(false)
  const [alldata, setalldata] = useState([])
  const [isloading, setisloading] = useState(true)
  const [data, setdata] = useState([])

  // onclick of the buttons 
  const showdetails = (id) => {
    navigate('/dashboard/details/' + id)
  }
  const edit = (id) => {
    navigate('/dashboard/edit/' + id)
  }
  const deleteelem = (id, imageurl) => {
    if (
      window.confirm('are u sure to delete the product')) {
      axios.delete(`https://restful-api-five.vercel.app/product?id=${id}&imageurl=${imageurl}`,
        {
          headers:{
            Authorization:'Bearer '+localStorage.getItem('token')
          }}
    
      )
        .then(res => {
          getdata()
          alert('element deleted')
        })
        .catch(err => {
          alert(err.message)
        })
    }
  }
  //function for getting the data
  const getdata = () => {
    axios.get('https://restful-api-five.vercel.app/product'
    ).then(res => {
      setalldata(res.data.result)
      setdata(res.data.result)
      console.log(res.data.result)
      seterror('')
      setisloading(false)
    }).catch(err => {
      console.log(err)
      sethaserr(true)
      setdata([])
      seterror(err.message)
      setalldata([])
      setisloading(false)
    })
  }
  //use effect which will run the  code at the start of the console.
  useEffect(() => {
    getdata()
  }, [])
  //handle change to set data in the filtered basis
  const handlechange = (e) => {
    const filterdata = alldata.filter((elem) => {
      return (
        elem.description.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
    setdata(filterdata)
  }
  //return of main component
  return (
    <>
    {/* <Navbar/> */}
      <div className=' container w-100 d-flex justify-content-between align-items-center'>

        <h1 className={` my-4 ${style.h1}`}>Categories:</h1>
        <form>

          <div className='d-flex gap-2 border rounded'>
            <input type='text' className=' rounded  px-4 fs-4' placeholder='search here ' onChange={handlechange} ></input>
            <h3>
              <IoSearchOutline />
            </h3>
          </div>
        </form>

      </div>
      {isloading &&
        <div className='container w-50 d-flex justify-content-center'>

          <img src={loader} className={style.load} alt='finding'></img>
        </div>

      }
      {!isloading &&


        <div className=' w-100  d-flex flex-wrap justify-content-center'>
          {
            data.map((elem, index, array) => <Row deleteelem={deleteelem} edit={edit} call={showdetails} elem={elem} key={elem._id} />)
          }
        </div>
      }
      {
        haserr &&
        <p style={{ color: "red" }}>{error}</p>
      }
    </>
  )
}
// component
const Row = (props) => {
  return (
    <div className='card m-4 pt-4 h-6'>
      <p className='mx-3 '>{props.elem.description}</p>
      <img src={props.elem.imagepath} className={style.image} alt='finding'></img>
      <br></br>
      <h4 className='mx-3'>{props.elem.mrp}</h4>
      <div className='d-flex justify-content-center' >

        <button className='m-3 btn btn-success' onClick={() => {
          props.call(props.elem._id)
        }} >Details</button>
        <button className='m-3 btn btn-success'
          onClick={() => {
            props.edit(props.elem._id)
          }}
        >Edit</button>
        <button className='m-3 btn btn-success' onClick={() => {
          props.deleteelem(props.elem._id, props.elem.imagepath)
        }}>Delete</button>
      </div>

    </div>

  )
}


export default Category