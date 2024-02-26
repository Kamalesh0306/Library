import axios from "axios";
import { Button } from 'flowbite-react';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function Login(){
  
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const handleLoginClick=async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8800/",{
                email,password
            })
            .then(res=>{
                if(res.data==="exist"){
                    history("/home",{state:{id:email}})
                }
                if(res.data==="exist"){
                    history("/home",{state:{id:password}})
                }
                else if(res.data==="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }
    const handleAdminClick = () => {
        history('/admin');
      };
    
      const handleSignupClick = () => {
        history('/signup');
      };


    return (
        
        <div className="login">
            <h1>ASH LIBRARY</h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="form">

            <h3>Login</h3>

            <form action="POST" >
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                

            </form>

            <br />
            <p>OR</p>
            <br />

            <div className="flex gap-2">
                <Button type="button" className="px-4" onClick={handleLoginClick}>
                  Login
                </Button>
                <Button type="button" className="px-4" onClick={handleAdminClick}>
                  Admin User
                </Button>
                <Button type="button" className="px-4" onClick={handleSignupClick}>
                  Sign Up
                </Button>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
           
            
            
            


        </div>
        
    )
}

export default Login;