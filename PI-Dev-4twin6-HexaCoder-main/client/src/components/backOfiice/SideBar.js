import { Link } from "react-router-dom";

export default function  SideBar () {




return (<aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
<div className="sidenav-header">
  <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
  <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
    <img src="./assets/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo"></img>
    <span className="ms-1 font-weight-bold text-white">Admin</span>
  </a>
</div>

<div className="collapse navbar-collapse  w-auto  max-height-vh-100" id="sidenav-collapse-main">
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link text-white active bg-gradient-primary" href="./pages/dashboard.html">
        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
          <i className="material-icons opacity-10">dashboard</i>
        </div>
        <span className="nav-link-text ms-1">Dashboard</span>
      </a>
    </li>
   

  
    <li className="nav-item">
    <Link className="nav-link text-white"  to="/teacher"> 
        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
          <i className="material-icons opacity-10">format_textdirection_r_to_l</i>
        </div>
        <span className="nav-link-text ms-1">Teachers</span>
        </Link>
    </li>
    <li className="nav-item">
    <Link className="nav-link text-white"  to="/student"> 
        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
          <i className="material-icons opacity-10">format_textdirection_r_to_l</i>
        </div>
        <span className="nav-link-text ms-1">Students</span>
      </Link>
    </li>

    <li className="nav-item">
    <Link className="nav-link text-white"  to="/projects"> 
        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
          <i className="material-icons opacity-10">format_textdirection_r_to_l</i>
        </div>
        <span className="nav-link-text ms-1">Projects</span>
     </Link>
    </li>


    <li className="nav-item mt-3">
      <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
    </li>
    <li className="nav-item">
    <Link className="nav-link text-white"  to="/profile"> 
        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
          <i className="material-icons opacity-10">person</i>
        </div>
        <span className="nav-link-text ms-1">Profile</span>
    </Link>
    </li>
    <li className="nav-item">
    <Link className="nav-link text-white"  to="/logout"> 
        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
          <i className="material-icons opacity-10">login</i>
        </div>
        <span className="nav-link-text ms-1">Logout</span>
     </Link>
    </li>
 
  </ul>
</div>


</aside>)

}