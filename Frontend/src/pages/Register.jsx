import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import axios from "axios"
import { URL } from "../url"

function Register() {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [error, setError] = useState('')
    const navigate=useNavigate()

    async function handleRegister() {
        try {
          const res= await axios.post(URL+"/api/auth/register",{username,email,password})
          setUsername(res.data.username)
          setEmail(res.data.email)
          setPassword(res.data.password)
          setError(false)
          navigate("/login")
          
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
                <h3><Link to="/Login">Login</Link></h3>
            </div>
            <div className="login">
                <div className="loginForm">
                    <h1 className="loginSpacing loginText">Create an account</h1>
                    <input onChange={(e)=>setUsername(e.target.value)} className="loginSpacing loginInfo" type="text" placeholder="Enter your username" />
                    <input onChange={(e)=>setEmail(e.target.value)} className="loginSpacing loginInfo" type="text" placeholder="Enter your email" />
                    <input onChange={(e)=>setPassword(e.target.value)} className="loginSpacing loginInfo" type="password" placeholder="Enter your password" />
                    <button onClick={handleRegister} className="loginSpacing loginButton">Register</button>
                    {error && <h3 className="loginError">Something went wrong</h3>}
                    <div className="loginNewHere">
                        <p>Alreadt have an account?</p>
                        <p className="loginNewHereLink"><Link to="/Login">Login</Link></p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
        
    )
  }
  
  export default Register