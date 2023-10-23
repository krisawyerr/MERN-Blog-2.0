import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"

function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState(false)
    const {setUser}=useContext(UserContext)
    const navigate=useNavigate()

    async function handleLogin() {
        try {
          const res=await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
          setUser(res.data)
          navigate("/")
        }
        catch(err) {
          setError(true)
          console.log(err)
        }
    
    }

    return (
        <>
            <div className="loginHeader">
                <h1 className="loginTitle"><Link to="/">T J C</Link></h1>
                <h3><Link to="/register">Register</Link></h3>
            </div>
            <div className="login">
                <div className="loginForm">
                    <h1 className="loginSpacing loginText">Log in to your account</h1>
                    <input onChange={(e)=>setEmail(e.target.value)} className="loginSpacing loginInfo" type="text" placeholder="Enter your email" />
                    <input onChange={(e)=>setPassword(e.target.value)} className="loginSpacing loginInfo" type="password" placeholder="Enter your password" />
                    <button onClick={handleLogin} className="loginSpacing loginButton">Log in</button>
                    {error && <h3 className="loginError">Something went wrong</h3>}
                    <div className="loginNewHere">
                        <p>New here?</p>
                        <p className="loginNewHereLink"><Link to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
        
      )
    }
    
    export default Login