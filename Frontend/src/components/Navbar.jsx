import { Link, useLocation, useNavigate } from "react-router-dom"
import {BsSearch} from 'react-icons/bs'
import {FaBars} from 'react-icons/fa'
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"

function Navbar() {
  const [prompt,setPrompt]=useState("")
  const [menu,setMenu]=useState(false)
  const navigate=useNavigate()
  const path=useLocation().pathname
  /* console.log(prompt) */
  
  function showMenu() {
    setMenu(!menu)
  }

  const {user}=useContext(UserContext)

  return (
    <div className="navbar">
      <div className="navbarTitleAndMenu">
        <div className="navbarTitle">
          <h1><Link to="/">TJC</Link></h1>
        </div>

        <div className="navbarMenu">
          <div onClick={showMenu}>
            <p><FaBars/></p>
            {menu && <Menu/>}
          </div>
        </div>
      </div>
      <div className="navbarSearch">
        { path === "/" && <div>
          <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))}><BsSearch/></p>
          <input onChange={(e)=>setPrompt(e.target.value)} placeholder="Search a post" type="text"/>
        </div>}
      </div>

      
    </div>
  )
}
  
export default Navbar
