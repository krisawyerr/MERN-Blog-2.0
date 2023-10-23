/* eslint-disable react/prop-types */
import {IF} from '../url'

function ProfilePosts({p}) {
    return (
        <div className="profilePost">
            <div className="profilePostImg">
            <img src={IF + p.photo}/>
            </div>

            <div className="profilePostDetails">
                <h1 className="profilePostTitle">
                    {p.title}
                </h1>
                <div className="profilePostUsernameAndDate">
                    <p>@{p.username}</p>
                    <div className="profilePostDate">
                        <p>{new Date(p.updatedAt).toString().slice(0,15)}</p>
                        <p>{new Date(p.updatedAt).toString().slice(16,24)}</p>
                    </div>
                </div>
                <p className="profilePostDesc">{p.description.slice(0,200) + " ...Read More"}</p>
            </div>
        </div>
    )

}

export default ProfilePosts