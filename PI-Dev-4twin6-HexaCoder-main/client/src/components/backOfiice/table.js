import React, { useState, useEffect }  from 'react';
import axios from 'axios';

import { History } from 'history';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Table()
{

  const [projects, setProjects] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch("http://localhost:8095/projects/findAll")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setProjects(data);
                    console.log(data)
                 
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
      }, [setIsLoaded==true])
      const handleSubmit2 = text  => event => {
        event.preventDefault();
        var url="http://localhost:8095/projects/deleteproject/"
        axios.delete(url+text._id,{
          mode:'no-cors',
          method: 'DELETE',     
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          }
        }) .then(res => {
          console.log(res); 
          console.log(res.data);
        })   
      }
      const handleSubmit = text  => event => {
        event.preventDefault();
        console.log(text)
        axios.put(`http://localhost:8095/projects/qualifyproject/`+text._id ,{
          mode:'no-cors',
          method: 'PUT',     
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          }})
        .then(res => {
          console.log(res); 
          console.log(res.data);
        })
        console.log("a")
      //  BrowserRouter.push("/dashboard")
       
         }
    return (<div class="row mb-4">
    <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
      <div class="card">
        <div class="card-header pb-0">
          <div class="row">
            <div class="col-lg-6 col-7">
              <h6>Projects</h6>
              <p class="text-sm mb-0">
                <i class="fa fa-check text-info" aria-hidden="true"></i>
                <span class="font-weight-bold ms-1">30 done</span> this month
              </p>
            </div>
            <div class="col-lg-6 col-5 my-auto text-end">
              <div class="dropdown float-lg-end pe-4">
                <a class="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa fa-ellipsis-v text-secondary"></i>
                </a>
                <ul class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                  <li><a class="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                  <li><a class="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                  <li><a class="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body px-0 pb-2">
          <div class="table-responsive">
            <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Project_name</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Project_theme</th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Team</th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Project_orientaion</th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Qualified</th>


                </tr>
              </thead>
              <tbody>
              {projects.map(project => (
                    
                    <tr>
                      <td>{project.project_name}</td>
                        <td>{project.project_theme}</td>
                        <td>{project.team.team_Name}</td>
                        <td>{project.project_option}</td>
                        
                        <td>{project.state_qualified.toString()}</td>
                        <td><a href={project.project_link}>Link to project</a></td> 
                        <td><button onClick={handleSubmit(project)}  className="btn btn-success"><i class="bi bi-check"></i></button> </td>     
                        <td><button onClick={handleSubmit2(project)}  className="btn btn-danger"><i class="bi bi-eraser"></i></button></td>
                    </tr>
                    ))}
                      
                <tr>
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <img src="../assets/img/small-logos/logo-atlassian.svg" class="avatar avatar-sm me-3" alt="atlassian"></img>
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Add Progress Track</h6>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="avatar-group mt-2">
                      <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                       
                      </a>
                      <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                      
                      </a>
                    </div>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <span class="text-xs font-weight-bold"> $3,000 </span>
                  </td>
                  <td class="align-middle">
                    <div class="progress-wrapper w-75 mx-auto">
                      <div class="progress-info">
                        <div class="progress-percentage">
                          <span class="text-xs font-weight-bold">10%</span>
                        </div>
                      </div>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-info w-10" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                
                
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>)
}