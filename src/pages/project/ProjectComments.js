import { useState } from "react"
import Avatar from "../../components/Avatar"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function ProjectComments({ project }) {
  const { user } = useAuthContext()
  const { updateDocument, response } = useFirestore('projects')
  const [newComment, setNewComment] = useState('')
  //const [myComment ,setMyComment] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }
    
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    })
    if (!response.error) {
      setNewComment('')
    }
  }

  //TODO: Delete a comment!!!

  function deleteObjectById(id, objectArray) {
    // Find the index of the object with the matching id
    const index = objectArray.findIndex(obj => obj.id === id);
  
    // If the index is -1, the object was not found
    if (index === -1) {
      console.log(`Object with id ${id} not found.`);
      return objectArray;
    }
  
    // Remove the object from the array using splice
    objectArray.splice(index, 1);
  
    // Return the updated array
    return objectArray;
  }

  const deleteComment = async(id)=>{

    await updateDocument(project.id, {
        comments: deleteObjectById(id,project.comments),
      })
  }

  const myComment=(commentDisplayName)=>{
    if(commentDisplayName==user.displayName)
            return true;
    else
            return false;

  }

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <ul>
        {project.comments.length > 0 && project.comments.map(comment => (
          <li key={comment.id}>
            <div className="comment-author">
                <div className="comment-details">
                    <Avatar src={comment.photoURL} />
                    <p>{comment.displayName}</p>
                    <p className="comment-date">{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
                </div>
              {myComment(comment.displayName) && <button className="delete-btn" onClick={()=>deleteComment(comment.id)}>x</button>}
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea 
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  )
}