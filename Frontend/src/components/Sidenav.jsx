import { Link, useLocation, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"
import axios from "axios"
import { URL } from "../url"



function SideNavbar() {
    const navigate=useNavigate()
    const path=useLocation().pathname
  
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)

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
    <div class="sideNav">
        <div>
            <h1 className="sideNavTitle"><Link to="/">Blog Market</Link></h1>
        </div>
        <div>
            {path !== "/" && <h3 className="sideNavText"><Link to="/">Explore</Link></h3>}
            {path === "/" && <h3 className="sideNavTextSelected"><Link to="/">Explore</Link></h3>}
            {path !== "/" && <h3 className="sideNavText"><Link to="/">Search</Link></h3>}
            {path === "/" && <h3 className="sideNavTextSelected"><Link to="/">Search</Link></h3>}
            {path !== `/profile/${user._id}` && user && <h3 className="sideNavText"><Link to={"/profile/"+user._id}>Profile</Link></h3>}
            {path === `/profile/${user._id}` && user && <h3 className="sideNavTextSelected"><Link to={"/profile/"+user._id}>Profile</Link></h3>}
            {path !== "/write" && user && <h3 className="sideNavText"><Link to="/write">Write</Link></h3>}
            {path === "/write" && user && <h3 className="sideNavTextSelected"><Link to="/write">Write</Link></h3>}
            {path !== `/myblogs/${user._id}` && user && <h3 className="sideNavText"><Link to={"/myblogs/"+user._id}>My Blogs</Link></h3>}
            {path === `/myblogs/${user._id}` && user && <h3 className="sideNavTextSelected"><Link to={"/myblogs/"+user._id}>My Blogs</Link></h3>}
        </div>
        <div class="sideNavBottomSection">
            {!user && <h3 className="sideNavText"><Link to="/login">Login</Link></h3>}
            {!user && <h3 className="sideNavText"><Link to="/register">Register</Link></h3>}
            {user && <h3 onClick={handleLogout} className="sideNavText">Logout</h3>}
        </div>
    </div>

    
  )
}
  
export default SideNavbar