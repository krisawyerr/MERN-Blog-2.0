import { Link, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import HomePosts from "../components/HomePosts"
import Loader from "../components/Loader"
import SideNavbar from "../components/Sidenav";


const MyBlogs = () => {
    const {search}=useLocation()
    // console.log(search)
    const [posts,setPosts]=useState([])
    const [noResults,setNoResults]=useState(false)
    const [loader,setLoader]=useState(false)
    const {user}=useContext(UserContext)
    // console.log(user)

    async function fetchPosts() {
        setLoader(true);
        try {
          const res = await axios.get(URL + "/api/posts/user/" + user._id);
          const sortedPosts = res.data.reverse(); // Reverse the array to have the newest posts first
          const limitedPosts = sortedPosts.slice(0, 8); // Display only the first 8 posts
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
    

    useEffect(() => {
        if (user && user._id) {
            fetchPosts();
        }
    }, [search, user]);

    return (
        <div className="fullPage">
            <SideNavbar />
            <div className="mainSection">
                <Navbar/>
                <div className="myBlog">
                    {loader?
                        <div>
                            {loader?<div className="loader"><Loader/></div>:!noResults?
                            posts.map((post)=>(
                            <Link to={user?`/posts/post/${post._id}`:"/login"} >
                                <HomePosts key={post._id} post={post}/>
                            </Link>
                            )):<h3 className="loader">No posts available</h3>}
                        </div>:
                        <div className="myBlogGrid">
                            {loader?<div className="loader"><Loader/></div>:!noResults?
                            posts.map((post)=>(
                            <Link to={user?`/posts/post/${post._id}`:"/login"}>
                                <HomePosts key={post._id} post={post}/>
                            </Link>
                            )):<h3 className="loader">No posts available</h3>}
                        </div>}
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default MyBlogs