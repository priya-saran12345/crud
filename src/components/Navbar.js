import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from '../styling/style.module.css'
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
  const navigate=useNavigate()

const handlelogout=()=>{
  navigate('/login')
  localStorage.removeItem('token')
  localStorage.removeItem('name')

}


  return (
    <div className={`${style.nav} d-flex justify-content-between `}>
    <div >
<Link className={style.Link} to='category'>Category</Link>
<Link to='addcategory' className={style.Link}>Addcategory</Link>
    </div>
    <div className='d-flex '>
      <h5 className='d-flex'> <h5 className='mx-2'><FaUser />
</h5> {localStorage.getItem('name')}</h5>
      <button className='btn btn-success mx-3' onClick={handlelogout}>Logout</button>
    </div>
    </div>
  )
}

export default Navbar