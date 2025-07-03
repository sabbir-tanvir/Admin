import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import LeftBar from '../Leftbar';
import '../../styles/employDetails/EmployeeDetails.css';

function EmployeeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeData } = location.state || {};
  
  // Placeholder data if no employee data is provided
  // Using useState but not updating in this component
  // eslint-disable-next-line no-unused-vars
  const [employee, setEmployee] = useState(employeeData || {
    id: id || 'EMP001',
    name: 'John Smith',
    contact: '+1*********23',
    company: 'TechCorp',
    email: 'john.smith@techcorp.com',
    department: 'Engineering',
    position: 'Senior Developer',
    joiningDate: '2020-03-15',
    address: '123 Main St, City, Country',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    performance: {
      productivity: 87,
      quality: 92,
      teamwork: 85,
      attendance: 95,
    },
    projects: [
      { name: 'Project Alpha', role: 'Lead Developer', status: 'In Progress' },
      { name: 'Project Beta', role: 'Backend Developer', status: 'Completed' },
      { name: 'Project Gamma', role: 'Full Stack Developer', status: 'Planning' },
    ],
  });

  const handleEditEmployee = () => {
    navigate('/add-employee', { state: { employeeData: employee } });
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        <LeftBar />
        <div className="employee-details-page">
          <div className="employee-details-container">
            <div className="employee-header">
              <h1 className="employee-name">{employee.name}</h1>
              <button className="edit-employee-btn" onClick={handleEditEmployee}>
                Edit Employee
              </button>
            </div>

            <div className="employee-content">
              <div className="employee-sidebar">
                <div className="employee-image-container">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="employee-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300/cccccc/666666?text=Employee";
                    }}
                  />
                </div>
                <div className="employee-basic-info">
                  <div className="info-item">
                    <span className="info-label">ID:</span>
                    <span className="info-value">{employee.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Department:</span>
                    <span className="info-value">{employee.department}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Position:</span>
                    <span className="info-value">{employee.position}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Joined:</span>
                    <span className="info-value">{employee.joiningDate}</span>
                  </div>
                </div>
              </div>

              <div className="employee-main-content">
                <div className="details-card">
                  <h2 className="card-title">Contact Information</h2>
                  <div className="details-row">
                    <div className="detail-group">
                      <span className="detail-label">Email</span>
                      <span className="detail-value">{employee.email}</span>
                    </div>
                    <div className="detail-group">
                      <span className="detail-label">Phone</span>
                      <span className="detail-value">{employee.contact}</span>
                    </div>
                  </div>
                  <div className="details-row">
                    <div className="detail-group wide">
                      <span className="detail-label">Address</span>
                      <span className="detail-value">{employee.address}</span>
                    </div>
                  </div>
                </div>

                <div className="details-card">
                  <h2 className="card-title">Performance Metrics</h2>
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <span className="metric-label">Productivity</span>
                      <div className="metric-progress">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${employee.performance?.productivity || 0}%` }}
                        ></div>
                      </div>
                      <span className="metric-value">{employee.performance?.productivity || 0}%</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Quality</span>
                      <div className="metric-progress">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${employee.performance?.quality || 0}%` }}
                        ></div>
                      </div>
                      <span className="metric-value">{employee.performance?.quality || 0}%</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Teamwork</span>
                      <div className="metric-progress">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${employee.performance?.teamwork || 0}%` }}
                        ></div>
                      </div>
                      <span className="metric-value">{employee.performance?.teamwork || 0}%</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Attendance</span>
                      <div className="metric-progress">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${employee.performance?.attendance || 0}%` }}
                        ></div>
                      </div>
                      <span className="metric-value">{employee.performance?.attendance || 0}%</span>
                    </div>
                  </div>
                </div>

                <div className="details-card">
                  <h2 className="card-title">Projects</h2>
                  <div className="projects-table">
                    <div className="project-table-header">
                      <div className="project-header-cell">Project Name</div>
                      <div className="project-header-cell">Role</div>
                      <div className="project-header-cell">Status</div>
                    </div>
                    {employee.projects?.map((project, index) => (
                      <div className="project-table-row" key={index}>
                        <div className="project-cell">{project.name}</div>
                        <div className="project-cell">{project.role}</div>
                        <div className="project-cell">
                          <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
