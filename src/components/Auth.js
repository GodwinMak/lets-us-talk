import React, {useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import CoverImage from '../assets/signup.jpg';


const cookies = new  Cookies();

 const intialState ={
     fullName: '',
     userName: '',
     password: '',
     confirmPassword: '',
     avatarUrl: '',
     phoneNumber: '',

 }

const Auth = () => {
    const [form, setForm] = useState(intialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const handleSubmit =async (e) => {
        e.preventDefault();

        const { userName, password, avatarUrl, phoneNumber} = form;

        const URL = 'https://we-got.herokuapp.com/auth';

        const {data: {token, userId, hashedPassword, fullName}} = await axios.post(`${URL}/${isSignup ? 'signup': 'login'}`, {
            userName, password, fullName: form.fullName, phoneNumber, avatarUrl,
        });

        cookies.set('token', token);
        cookies.set('userName', userName);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarUrl', avatarUrl);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

  return (
    <div className='auth__form-container'>
        <div className='auth__form-container_fields'>
            <div className='auth__form-container_fields-content'>
                <p>{isSignup ? 'Sign Up' : "Sign In"}</p>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='fullName'>Full Name</label>
                            <input
                                name='fullName'
                                type='text'
                                placeholder='Full Name'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='userName'>Username</label>
                        <input
                            name='userName'
                            type='text'
                            placeholder='username'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='phoneNumber'>Phone Number</label>
                            <input
                                name='phoneNumber'
                                type='text'
                                placeholder='phone Number'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='avatarUrl'>Avatar Url</label>
                            <input
                                name='avatarUrl'
                                type='text'
                                placeholder='Avatar Url'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Password</label>
                            <input
                                name='password'
                                type='password'
                                placeholder='password'
                                onChange={handleChange}
                                required
                            />
                    </div>
                    {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='confirmPassword'> Confirm Password</label>
                            <input
                                name='confirmPassword'
                                type='password'
                                placeholder='Confirm Password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_button'>
                        <button type='submit'>
                            {isSignup ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                </form>
                <div className='auth__form-container_fields-account'>
                    <p>
                        {isSignup
                            ? "Already have an Accont?"
                            : "Don't have an Account?"
                        }
                        <span onClick={switchMode}>
                            {isSignup ? "Sign In" : "Sign Up"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div className='auth__form-container_image'>
            <img src={CoverImage} alt='sign In'></img>
        </div>
    </div>
  )
}

export default Auth