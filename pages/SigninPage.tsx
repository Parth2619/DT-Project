import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Signin from '../components/Signin';
import { useAuth } from '../hooks/useAuth';

const Shape1 = () => (
    <svg width="404" height="404" viewBox="0 0 404 404" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[-10%] left-[-5%] w-[404px] h-[404px] filter blur-3xl opacity-50">
        <path d="M404 202C404 313.525 313.525 404 202 404C90.4751 404 0 313.525 0 202C0 90.4751 90.4751 0 202 0C313.525 0 404 90.4751 404 202Z" fill="url(#paint0_linear_1_2)"/>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="404" y2="404" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8"/>
                <stop offset="1" stopColor="#F472B6"/>
            </linearGradient>
        </defs>
    </svg>
);

const Shape2 = () => (
    <svg width="350" height="350" viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[-5%] right-[-5%] w-[350px] h-[350px] filter blur-3xl opacity-40">
        <path d="M315.632 223.368C380.59 158.41 334.67 52.8197 250.718 25.132C166.766 -2.55566 73.1896 43.362 25.132 127.314C-22.9256 211.266 22.9921 304.843 106.944 352.9C190.896 400.958 250.674 288.326 315.632 223.368Z" fill="var(--primary)"/>
    </svg>
);

const Shape3 = () => (
     <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[20%] right-[15%] w-[200px] h-[200px] filter blur-2xl opacity-30">
        <path d="M100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0Z" fill="var(--accent)"/>
    </svg>
);

const SigninPage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        document.body.classList.add('signin-page');
        return () => {
            document.body.classList.remove('signin-page');
        };
    }, []);

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="shape-1"><Shape1 /></div>
                <div className="shape-2"><Shape2 /></div>
                <div className="shape-3"><Shape3 /></div>
            </div>
            <Signin />
        </div>
    );
};

export default SigninPage;