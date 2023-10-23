import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import { Link, useNavigate } from "react-router-dom"

function Menu() {
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    async function handleLogout() {
        try {
          const res=await axios.get(URL+"/api/auth/logout",{withCredentials:true})
          console.log(res)
          setUser(null)
          navigate("/login")
      
        }
        catch(err){
          console.log(err)
        }
    }

    return (
        <div className="menu">
        {!user && <h3 className="menuText"><Link to="/login">Login</Link></h3>}
        {!user && <h3 className="menuText"><Link to="/register">Register</Link></h3>}
        {user && <h3 className="menuText"><Link to={"/profile/"+user._id}>Profile</Link></h3>}
        {user && <h3 className="menuText"><Link to="/write">Write</Link></h3>}
        {user && <h3 className="menuText"><Link to={"/myblogs/"+user._id}>My Blogs</Link></h3>}
        {user && <h3 onClick={handleLogout} className="menuText">Logout</h3>}

        </div>
    )
}
  
export default Menu