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

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen  overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    return (
        <div className={containerClassName}>
            <div className="flex align-items-center justify-content-center w-60rem">
                <div className="surface-card p-4 shadow-2 border-round w-full" style={{ minWidth: layoutState.isMobile ? 0 : 400 }}>
                    <div className="text-center mb-5">
                        {/* <img src="/images/reckitt.webp" alt="hyper" height={50} className="mb-3" /> */}
                        <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                        {/* <span className="text-600 font-medium line-height-3">Don't have an account?</span> */}
                        {/* <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a> */}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-900 font-medium mb-2">
                            Email
                        </label>
                        <InputText id="email" value={email} type="text" placeholder="Email address" className="w-full mb-3" onChange={handleEmail} />

                        <label htmlFor="password" className="block text-900 font-medium mb-2">
                            Password
                        </label>
                        <InputText id="password" value={password} type="password" placeholder="Password" className="w-full mb-3" onChange={handlePassword} />

                        <div className="flex align-items-center justify-content-between mb-6">
                            <div className="flex align-items-center">
                                {/* <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                                <label htmlFor="rememberme">Remember me</label> */}
                            </div>
                            <Link href="/forgot-password" className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
                                Forgot your password?
                            </Link>
                        </div>

                        <Button label="Login" icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-user'} className="w-full" onClick={loginClick} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
