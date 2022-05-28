import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/Let's talk-logos_white.png"


import styled from "styled-components"
import { loginRoute} from '../utils/APIRoutes';

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }


  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }
  const handleValidation = () => {
    const { password, username, } = values;
    if (password === "") {
      toast.error("Username and password is required", toastOptions)
      return false;
    } else if (username.length === "") {
      toast.error(
        "Username and password is required", toastOptions
      );
      return false;
    }
    return true
  }

  useEffect(()=> {
    if(localStorage.getItem('chat-appp-user')){
      navigate('/')
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password} = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate("/");
      }
    };
  }


  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => {
          handleSubmit(event)
        }}>
          <div className='brand'>
            <img src={Logo} alt='logo'></img>
            <h1>Let's-Talk</h1>
          </div>
          <input
            type='text'
            placeholder="User Name"
            name='username'
            onChange={(e) => handleChange(e)}
            min='3'
            autoComplete='username'
          />
          <input
            type='password'
            placeholder="Password"
            name='password'
            onChange={(e) => handleChange(e)}
            autoComplete='password'
          />
          <button type='submit'>Login User</button>
          <span>
            Don't have an Account ? <Link to='/register'>Register</Link>
          </span>

        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand{
        display: flex;
        align-items: center;
        gap: 0.1rem;
        justfiy-content: center;
        img{
            height: 8rem;
        }
        h1{
            color: #fff;
            text-transform: uppercase;
        } 
    }
    form{
            display: flex;
            flex-direction: column;
            gap: 2rem;
            background: #00000076;
            border-radius: 1rem;
            padding: 2rem 4rem;
            input{
                background: trasparent;
                background-color: #00000076;
                padding: 1rem;
                border:0.1rem solid #4e0eff;
                border-radius: 0.4rem;
                color: #fff;
                width: 100%;
                font-size: 1rem;
                &:focus{
                    border: 0.1rem solid #997af0;
                    outline: none;
                }
            }

            button{
                background-color: #997af0;
                border: none;
                color: #fff;
                font-weight: bold;
                cursor: pointer;
                padding: 1rem 2rem;
                border-radius: 0.4rem;
                font-size: 1rem;
                text-transform: uppercase;
                transition:  ease-in-out 0.5s;
                &:hover{
                    background-color: #4e0eff;
                }
            }
            span{
                color: #f8f8f8;
                text-tranfrom: uppercase;
                a{
                    color:#4e0eff;
                    font-weight: bold;
                    text-decoration: none;
                }
            }
        }
`;

export default Login