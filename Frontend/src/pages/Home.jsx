import axios from "axios"
import Footer from "../components/Footer"
import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import { /* IF,  */URL } from "../url"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Loader from '../components/Loader'
import { UserContext } from "../context/UserContext"
import SideNavbar from "../components/sidenav"

function Home() {
  const {search}=useLocation()

  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)
  console.log(user)

  async function fetchPosts() {
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/posts/"+search)
      console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search])

  return (
    <div className="blkk">
      <SideNavbar />
      <div className="bluee">
        <Navbar />
        <div className="home">
          {loader?
            <div>
              {loader?<div className="h-[40vh] flex justify-center items-center "><Loader/></div>: !noResults ? posts.map((post) => (
                <Link to={user?`/posts/post/${post._id}`:"/login"}>
                  <HomePosts key={post._id} post={post}/>
                </Link>
              )): <h3 className="text-center font-bold mt-16">No posts available</h3>}
            </div>:
            <div className="homeGrid">
              {loader?<div className="h-[40vh] flex justify-center items-center "><Loader/></div>: !noResults ? posts.map((post) => (
                <Link to={user?`/posts/post/${post._id}`:"/login"}>
                  <HomePosts key={post._id} post={post}/>
                </Link>
              )): <h3 className="text-center font-bold mt-16">No posts available</h3>}
            </div>}
        </div>
        <Footer />
      </div>
    </div>
  )
}
  
export default Home