import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// import { auth } from '../app/authfirebaseConfig';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './WebsiteLayout.scss';
import { useNavigate } from "react-router"

import { onAuthStateChanged,getAuth } from "firebase/auth";

export default function WebsiteLayout() {
    const [isChecked, setIsChecked] = useState(false);
    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsChecked(true);
            } else {
                navigate('/'); // Điều hướng nếu không có user
            }
        });

        return () => unsubscribe();
    }, []);
    const navigate = useNavigate();
    if (!isChecked) {
        return <div>Loading...</div>;
    }
    return (
        <div className="home">
            <div className="home-sidebar">
                <Sidebar />
            </div>
            <div className="home-body">
                <Header />
                <Outlet />
            </div>
        </div>
    );
}

