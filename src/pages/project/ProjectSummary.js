import Avatar from "../../components/Avatar"
import { useFirestore } from "../../hooks/useFirestore"
import { useHistory } from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react"


export default function ProjectSummary({ project }) {

    const { deleteDocument } = useFirestore('projects')
    const { user } = useAuthContext()
    const history = useHistory()

    const [successAlert, setSuccessAlert] = useState(null)
  
    const handleClick = () => {
      deleteDocument(project.id)
      setSuccessAlert('Project Completed Succesfully!')
      setTimeout(()=>{history.push('/')},2000);
    }
  

  return (
    <div>
        {successAlert && <p className="successAlert">{successAlert}</p>}
      <div className="project-summary">
        <h1 className="createdAt">Created at {project.createdAt.toDate().toDateString()} by {project.createdBy.displayName}</h1>
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">
          {project.details}
        </p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>Mark as Complete</button>
      )}
    </div>
  )
}