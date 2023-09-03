import NavBar from "./NavBar"
import SideBar from "./SideBar"
import Footer from "./footer"
import { useEffect} from "react";
import { useState } from "react";
import React from "react";
import Paper from '@material-ui/core/Paper';

export default function ContDash() {
   
    return (<div>
        <body className="g-sidenav-show  bg-gray-200">
        <SideBar />
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <NavBar></NavBar>
 
      
   
  <script src="./assets/js/core/bootstrap.min.js"></script>
  <script src="./assets/js/plugins/perfect-scrollbar.min.js"></script>
  <script src="./assets/js/plugins/smooth-scrollbar.min.js"></script>
  <script src="./assets/js/plugins/chartjs.min.js"></script>
    
    </main>
    <Footer></Footer>
    </body>
    </div>
    )
}