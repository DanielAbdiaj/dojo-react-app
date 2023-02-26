
//styles & images
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';

import { NavLink } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';


export default function Sidebar() {
  return (
    <div className="sidebar">
            <div className="sidebar_content">
                <div className="user">
                    {/*TODO:avatar and username here later*/}
                    <p>Hey User</p>
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink exact to="/">
                                <img src={DashboardIcon} alt="dashboard icon"/>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="add project icon"/>
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
    </div>
  )
}
