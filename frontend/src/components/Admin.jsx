import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  
  const handleAdminClick = () => {
    const enteredEmail = document.getElementById('email1').value;
    const enteredPassword = document.getElementById('password1').value;
    
    if (enteredEmail === 'xyz@gmail.com' && enteredPassword === 'positivity') {
      navigate('/home');
    } else {
      alert('Invalid admin user');
    }
  };

  return (
    <div>
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">ASH LIBRARY </h1>
      <div className="flex items-center justify-center min-h-screen">
        <form className="flex max-w-md flex-col gap-4">
          <div className="flex items-center justify-center min-h-screen">
            <div className="card ">
              <h5 className="">ADMIN LOGIN </h5>
              <div className="mb-4">
                <label htmlFor="email1">Your email</label>
                <input id="email1" type="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="mb-4">
                <label htmlFor="password1">Your password</label>
                <input id="password1" type="password" className="form-control" placeholder="Password" required />
              </div>
              <div className="form-check ">
                <input type="checkbox" id="remember" className="form-check-input" />
                <label htmlFor="remember" className="form-check-label">Remember me</label>
              </div>
              
              <button type="button" className="btn btn-primary px-4" onClick={handleAdminClick}>
                Login
              </button>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin;
