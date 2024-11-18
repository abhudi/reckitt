/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { LayoutContext } from '@/layout/context/layoutcontext';
import Link from 'next/link';
import { PostCall } from '@/app/api/ApiKit';
import { CustomResponse } from '@/types';
import { useAppContext } from '@/layout/AppWrapper';
import { CONFIG } from '@/config/config';
import { setAuthData } from '@/utils/cookies';
import { get } from 'lodash';

const LoginPage = () => {
    const { isLoading, setAlert, setLoading, setUser, setAuthToken, setDisplayName } = useAppContext();
    const [email, setEmail] = useState('sky@gmail.com');
    const [password, setPassword] = useState('erp3001');
    const [checked, setChecked] = useState(false);
    const { layoutConfig, layoutState } = useContext(LayoutContext);

    const router = useRouter();

    const handleEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: any) => {
        setPassword(event.target.value);
    };

    const loginClick = async () => {
        if (isLoading) {
            return;
        }

        if (email && password) {
            setLoading(true);
            const resoponse: any = await PostCall('/auth/sign-in', { email, password });
            setLoading(false);
            if (resoponse.code == 'SUCCESS') {
                console.log('login success');
                setAlert('success', 'Login success!!');
                setUser(resoponse.data);
                setAuthToken(resoponse.token);
                setAuthData(resoponse.token, resoponse.refreshToken, resoponse.data);
            } else if (resoponse.code == 'RESET_PASSWORD') {
                console.log('res', resoponse);
                setDisplayName(resoponse.name);
                setAlert('success', 'Please reset you password');
                router.push(`/reset-password?resetToken=${resoponse.resetToken}`);
            } else {
                setAlert('error', resoponse.message);
            }
        }
    };

    const handleCheckboxChange = (e: any) => {
        setChecked(e.checked); // Update checked state
    };
    const containerClassName = classNames('surface-ground flex align-items-center justify-between min-h-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <div className="flex align-items-center justify-between w-full h-screen">
                {/* Left side image (hidden on small devices) */}
                <div className="img-box hidden md:flex justify-content-center align-items-center w-1/2 h-full">
                    <img src="/images/login.svg" alt="Login" className="w-full h-full object-cover" />
                </div>

                {/* Right side form with huge space between */}
                <div>
                    <div
                        className={`surface-card p-4 shadow-2 border-round ${layoutState.isMobile ? 'w-full h-auto p-5' : 'w-1/2'}`}
                        style={{
                            minWidth: layoutState.isMobile ? '100%' : '400px',
                            margin: layoutState.isMobile ? 'auto' : 'unset',
                            marginLeft: layoutState.isMobile ? '0' : 'calc(10% + 8rem)' // Dynamic margin based on screen size
                        }}
                    >
                        <div className="logo-login-panel text-center mb-5">
                            <img src="/images/reckitt.webp" alt="Logo" width="120px" height={'50px'} />
                        </div>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                            <span className="text-600 font-medium line-height-3">Enter your credentials to access your account</span>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-900 font-medium mb-2">
                                Email Address
                            </label>
                            <InputText id="email" value={email} type="text" placeholder="Email address" className="w-full mb-3" onChange={handleEmail} />

                            <div className="flex align-items-center justify-content-between mb-2">
                                <div className="flex align-items-center">
                                    <label htmlFor="password" className="block text-900 font-medium ">
                                        Password
                                    </label>
                                </div>
                                <Link href="/forgot-password" className="font-bold no-underline ml-2 text-pink-500 text-right cursor-pointer">
                                    Forgot your password?
                                </Link>
                            </div>
                            <InputText id="password" value={password} type="password" placeholder="Password" className="w-full mb-3" onChange={handlePassword} />

                            <div className="flex flex-wrap justify-content-left gap-3 mb-2">
                                <div className="flex align-items-center mb-2">
                                    <Checkbox
                                        inputId="rememberme"
                                        name="rememberme"
                                        value="rememberme"
                                        onChange={handleCheckboxChange}
                                        checked={checked} // Make sure `checked` is a boolean
                                        className="p-checkbox-checked:bg-pink-500"
                                        style={{ width: '25px', height: '20px' }}
                                    />
                                    <label htmlFor="ingredient1" className="ml-2">
                                        Remember Me
                                    </label>
                                </div>
                            </div>

                            <Button label="Login" icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-user'} className="w-full bg-pink-500 border-pink-500 mb-2" onClick={loginClick} />

                            <div className="flex align-items-center justify-content-center mb-6 mt-3 ">
                                <Link href="/forgot-password" className="font-medium no-underline ml-2  text-center cursor-pointer">
                                    <label className="" htmlFor="">
                                        Dont have an Account?
                                    </label>
                                    <span className="text-pink-500 font-bold"> Sign Up Here</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
