import Category from './components/Category'
import Addcategory from './components/Addcategory'
import Navbar from './components/Navbar'
import {  createBrowserRouter, Route, Router, RouterProvider, Routes} from 'react-router-dom';
import Details from './components/Details';
import Update from './components/Update';
import Signup from './components/Signup';
import Login from './components/Login';
import Layout from './components/Layout'
import { isLogin } from './util/checkauth';
function App(){

const router=createBrowserRouter(
[
  {path:"",loader:isLogin, element:<Layout />,children:[
    {path:"", element:<Category/>},
    
    {path:"category", element:<Category/>},
    {path:"addcategory", element:<Addcategory/>},
    {path:"details/:id", element:<Details/>},
    {path:"edit/:id", element:<Update/>},
  ]},
  {path:"login", element:<Login/>},
  {path:"signup", element:<Signup/>}
])

  return (
    <>
<RouterProvider router={router}>

</RouterProvider>
{/* <Router>

<Layout></Layout>
<>
<Routes>
          <Route  path="/" element={<Category />} />
          <Route path="addcatagory" element={<Addcategory />} />
          <Route path="details/:id" element={<Details />} />
          <Route path="edit/:id" element={<Update />} />

      </Routes>

</>
      </Router>
 */}


    </>
  );
}

export default App;
