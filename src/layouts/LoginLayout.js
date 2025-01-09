import React from 'react'
import { Outlet } from 'react-router-dom'
import "./LoginLayout.scss"
import Login from '../pages/Login'

import { useNavigate } from 'react-router-dom'

const LoginLayout = () => {

    const navigate = useNavigate();
    const handleClickHomepage = () => {
        navigate('/');
    }
    const handleClickLoginpage = () => {
        navigate('/login');
    }
    const handleClickSignuppage = () => {
        navigate('/signup');
    }
    return (<>
        <div className='login-header'>
            <div className='login-header-wrap'>

                <div className='login-header-left'>
                    {/* <img src='./straberry.png' /> */}
                    <h2>Strawberry</h2>
                </div>
                <div className='login-header-right'>
                    <h4>
                        <button className="btn-login" onClick={handleClickHomepage} >
                            Homepage
                        </button>
                    </h4>
                    <h4>
                        <button className="btn-login" onClick={handleClickLoginpage}
                        >
                            Đăng Nhập
                        </button>
                    </h4>
                    <h4>
                        <button className="btn-login" onClick={handleClickSignuppage}
                        >
                            Đăng Ký
                        </button>
                    </h4>                    
                </div>
            </div>      
        </div>    
        <Outlet />

    </>)
}

export default LoginLayout;