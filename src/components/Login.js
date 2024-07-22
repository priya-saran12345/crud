import axios from 'axios'
import React, { useState } from 'react'
import load from '../images/loader.gif'
import style from '../styling/style.module.css'
import { Link, useNavigate } from 'react-router-dom';
var FormData = require('form-data');


const Login = () => {

  const navigate = useNavigate()
  const [data, setdata] = useState({
    password: '',
    email: '',
  })
  const [error, seterror] = useState('')
  const [haserr, sethaserr] = useState(false)
  const [err, seterr] = useState({})
  const [seeloader, setseeloader] = useState(false)
  const [valid, setvalid] = useState(true)
  const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
  //
  // signup function
  const sign=()=>{
    navigate('/signup')
  }

  //validate function for valid the form values
  const validate = () => {
    setvalid(true)
     if (data.password.length == 0) {
      err.password = 'password is required'
      setvalid(false)

    }
    else if (!passwordRegex.test(data.password)) {
      err.password = 'password must be conatain one upper case lovercase special character and number and alteast 8 characters'
      setvalid(false)

    }
    else if (data.email.length == 0) {
      err.mail = 'email is required'
      setvalid(true)
    }
    else if (!emailRegex.test(data.email)) {
      err.mail = "enter the correct mail "
      setvalid(true)

    }

    return valid

  }


  // handle submit function 
  const handlesubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const formdata = new FormData()
      formdata.append('email', data.email)
      formdata.append('password', data.password)
      axios.post('https://restful-api-five.vercel.app/login', formdata).then(res => {
       console.log(seeloader)
       setseeloader(true)
       console.log(seeloader)


        console.log(res.data)
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('name',res.data.name)
        setseeloader(false)
        console.log(seeloader)

        navigate('/dashboard')
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
    <div className={style.signup}>
    {
      seeloader&&
      <div className='container w-50 d-flex justify-content-center'>

<img src={load} className={style.load} alt='finding'></img>
</div>

    }

     {!seeloader&& !haserr&& <div className={`container w-25  py-3  rounded ${style.inner}`}>
        <h2 className='text-center'>Login</h2>
        <form onSubmit={handlesubmit}>
        {/* //mail id input field */}
          <input type='text' placeholder='enter mail id' name='email' className='w-100 my-2 py-1 px-2 fs-6'
            onChange={handlechange}></input>
          {err.mail && <p className='text-danger'>{err.mail}</p>

          }
          <br></br>
          {/* //password input field */}
          <input type='password' name='password' placeholder='password'className='w-100 my-2 py-1 px-2 fs-6'
            onChange={handlechange
            }></input>
          {err.password && <p className='text-danger'>{err.password}</p>

          }
          <br></br>
          <div className='d-flex  w-100 justify-content-between px-3'> 
          <input type='submit' className='btn  btn-primary' onSubmit={handlesubmit}></input>
          <button className='btn btn-primary' onClick={sign}> Signup</button>


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

export default Login



// const router=createBrowserRouter(
// [
// {path:"login", element:<Login/>},
// {path:"signup", element:<Signup/>},
// {path:"dashboard", element:<Layout />,children:[
//   {path:"", element:<Category/>},
//   {path:"category", element:<Category/>},
//   {path:"addcategory", element:<Addcategory/>},
//   {path:"details/:id", element:<Details/>},
//   {path:"edit/:id", element:<Update/>},
// ]}
// ])
{/* <RouterProvider router={router}>

</RouterProvider> */}
