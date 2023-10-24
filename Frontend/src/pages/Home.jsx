import axios from "axios"
import Footer from "../components/Footer"
import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import { /* IF,  */URL } from "../url"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Loader from '../components/Loader'
import { UserContext } from "../context/UserContext"
import SideNavbar from "../components/Sidenav"

function Home() {
  const {search}=useLocation()

  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)
  console.log(user)

  async function fetchPosts() {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      const sortedPosts = res.data.reverse(); // Reverse the array to have the newest posts first
      const limitedPosts = sortedPosts.slice(0, 12); // Display only the first 8 posts
      setPosts(limitedPosts);
      if (limitedPosts.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search])

  return (
    <div className="fullPage">
      <SideNavbar />
      <div className="mainSection">
        <Navbar />
        <div className="home">
          {loader?
            <div>
              {loader?<div className="loader"><Loader/></div>: !noResults ? posts.map((post) => (
                <Link to={user?`/posts/post/${post._id}`:"/login"}>
                  <HomePosts key={post._id} post={post}/>
                </Link>
              )): <h3 className="noPostSection">No posts available</h3>}
            </div>:
            <div className="homeGrid">
              {loader?<div className="loader"><Loader/></div>: !noResults ? posts.map((post) => (
                <Link to={user?`/posts/post/${post._id}`:"/login"}>
                  <HomePosts key={post._id} post={post}/>
                </Link>
              )): <h3 className="noPostSection">No posts available</h3>}
            </div>}
        </div>
        <Footer />
      </div>
    </div>
  )
}
  
export default Home