import axios from 'axios'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import loader from '../images/loader.gif'
import style from '../styling/style.module.css'
var FormData = require('form-data');

const Signup = () => {
  const navigate = useNavigate()
  const [data, setdata] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    type: '',
  })
  const [isload, setisload] = useState(false)
  const [error, seterror] = useState('')
  const [haserr, sethaserr] = useState(false)
  const [err, seterr] = useState({})
  const [valid, setvalid] = useState()
  const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

  //btn function

  const btn=()=>{
    navigate('/')
  }
  //validate function for valid the form values
  const validate = () => {
    setvalid(true)
    if (data.name.length == 0) {
      err.name = 'name is required'
      setvalid(false)
    }
    else if (data.email.length == 0) {
      err.mail = 'email is required'
      setvalid(false)
    }
    else if (!emailRegex.test(data.email)) {
      err.mail = "enter the correct mail "
      setvalid(false)

    }
    else if (data.password.length == 0) {
      err.password = 'password is required'
      setvalid(false)

    }
    else if (!passwordRegex.test(data.password)) {
      err.password = 'password must be conatain one upper case lovercase special character and number and alteast 8 characters'
      setvalid(false)

    }
    else if (data.phone.length == 0) {

      err.phone = 'phone no is required'
      setvalid(false)

    }
    else if (data.type.length == 0) {
      err.type = 'user type is required'
      setvalid(false)

    }

    return valid

  }


  // handle submit function 
  const handlesubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const formdata = new FormData()
      formdata.append('name', data.name)
      formdata.append('phone', data.phone)
      formdata.append('email', data.email)
      formdata.append('password', data.password)
      formdata.append('usertype', data.type)
      axios.post('https://restful-api-five.vercel.app/signup', formdata).then(res => {
        setisload(true)
        sethaserr(false)
        console.log(res.data)
        setisload(false)
        navigate('/login')
      }).catch(err => {
        sethaserr(true)
        seterror(err.message)
        console.log(err)
      })
    }

  }

  const handlechange = (e) => {
    let newdata = data;
    newdata = { ...newdata, [e.target.name]: e.target.value }
    setdata(newdata)
  }

  return (
    <>

    < div className={style.signup}>
    {isload&&
      <div className='container w-50 d-flex justify-content-center'>

        <img src={loader} className={style.load} alt='finding'></img>
      </div>

    }

     {!isload&&!haserr&&
      <div className={`container w-25  py-3  rounded ${style.inner}`}>
        <h2 className='text-center'>Cerate Acount</h2>
        <form onSubmit={handlesubmit}>
          <input type='text' placeholder='user name' name='name' onChange={handlechange} className='w-100 my-2 py-1 px-2 fs-6' ></input>
          {err.name && <p className='text-danger'>{err.name}</p>

          }

          <br></br>
          <input type='text' placeholder='enter mail id' name='email'className='w-100 my-2 py-1 px-2 fs-6'
            onChange={handlechange}></input>
          {err.mail && <p className='text-danger'>{err.mail}</p>

          }

          <br></br>

          <input type='password' name='password' placeholder='password'className='w-100 my-2 py-1 px-2 fs-6'

            onChange={handlechange
            }

          ></input>
          {err.password && <p className='text-danger'>{err.password}</p>

          }

          <br></br>

          <input type='number' name='phone' placeholder='phone no'className='w-100 my-2 py-1 px-2 fs-6'
            onChange={handlechange
            }


          ></input>
          {err.phone && <p className='text-danger'>{err.phone}</p>

          }

          <br></br>
          <input type='text' name='type' placeholder='user type'className='w-100 my-2 py-1 px-2 fs-6'

            onChange={handlechange
            }

          ></input>
          {err.type && <p className='text-danger'>{err.type}</p>

          }


          <br></br>

<div className=' container d-flex w-100 justify-content-between'>

          <input type='submit' onSubmit={handlesubmit} className='btn btn-primary'></input>
         <button className='btn btn-primary' onClick={btn}>Login</button>


</div>

        </form>
      </div>}
      {
      haserr&&<p style={{color:"red"}}>{error} </p>
      }

    </div>
    </>

  )

}

export default Signup