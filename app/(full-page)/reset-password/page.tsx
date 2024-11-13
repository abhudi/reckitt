// /* eslint-disable @next/next/no-img-element */
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { LayoutContext } from '@/layout/context/layoutcontext';
import Link from 'next/link';
import { PostCall } from '@/app/api/ApiKit';
import { useAppContext } from '@/layout/AppWrapper';

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const resetToken = searchParams.get('resetToken');
    const { isLoading, setAlert, setLoading, displayName } = useAppContext();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { layoutConfig, layoutState } = useContext(LayoutContext);

    const router = useRouter();

    const handleNewPasswordChange = (event: any) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: any) => {
        setConfirmPassword(event.target.value);
    };

    const updatePasswordClick = async () => {
        if (isLoading) {
            return;
        }

        if (newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                setAlert('error', 'Passwords do not match!');
                return;
            }

            setLoading(true);
            const response: any = await PostCall('/auth/reset-password', { newPassword: newPassword, resetToken });
            setLoading(false);

            if (response.code == 'SUCCESS') {
                setAlert('success', 'Password updated successfully!');
                router.push('/login'); // Redirect to login page after success
            } else {
                setAlert('error', response.message);
            }
        } else {
            setAlert('error', 'Please fill in both fields.');
        }
    };

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen  overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <div className="flex align-items-center justify-content-center w-60rem">
                <div className="surface-card p-4 shadow-2 border-round w-full" style={{ minWidth: layoutState.isMobile ? 0 : 400 }}>
                    <div className="text-center mb-5">
                        {/* <img src="/images/reckitt.webp" alt="hyper" height={50} className="mb-3" /> */}
                        <div className="text-900 text-3xl font-medium mb-3">Welcome {displayName}! </div>
                        <span className="text-600 font-medium line-height-3">For your security, please change your password.</span>
                    </div>

                    <div>
                        <label htmlFor="newpassword" className="block text-900 font-medium mb-2">
                            New Password
                        </label>
                        <InputText id="newpassword" type="password" placeholder="New password" className="w-full mb-3" value={newPassword} onChange={handleNewPasswordChange} />

                        <label htmlFor="confirmpassword" className="block text-900 font-medium mb-2">
                            Confirm Password
                        </label>
                        <InputText id="confirmpassword" type="password" placeholder="Confirm password" className="w-full mb-3" value={confirmPassword} onChange={handleConfirmPasswordChange} />

                        <div className="flex align-items-center justify-content-between mb-6">{/* <Link href="/login" className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Back to login?</Link> */}</div>

                        <Button label="Update password" icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-user'} className="w-full" onClick={updatePasswordClick} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
