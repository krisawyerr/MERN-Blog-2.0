import axios from "axios"
/* import { BiEdit } from "react-icons/bi" */
import { MdDelete } from "react-icons/md"
import { URL } from "../url"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

function Comment({c, post}) {
    const {user}=useContext(UserContext)
    async function deleteComment(id) {
        try{
        await axios.delete(URL+"/api/comments/"+id,{withCredentials:true})
        window.location.reload(true)
        }
        catch(err){
        console.log(err)
        
        }
    }
    console.log(post.userId)
    console.log(user._id)
    console.log(post)
    console.log(user)
    
    return (
        <div className="comment">
            <div className="commentInfo">
                <h3 className="commentAuthor">@{c.author}</h3>
                <div className="commentDateAndDelete">
                    <p className="commentDate">{new Date(c.updatedAt).toString().slice(0,15)}</p>
                    <p className="commentDate">{new Date(c.updatedAt).toString().slice(16,24)}</p>
                    {user?._id === c?.userId ?
                        <div className="commentDelete">
                            <p onClick={()=>deleteComment(c._id)}><MdDelete/></p>
                        </div>: ""}
                </div>
            </div>
            <p className="commentContent">{c.comment}</p>
        </div>
    )
}

export default Comment