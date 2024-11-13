"use client"
import { GetCall } from '@/app/api/ApiKit';
import eventEmitter from '@/app/api/event';
import Preloader from '@/components/Preloader';
import { CONFIG } from '@/config/config';
import { AppContextType, CustomResponse } from '@/types';
import { getAuthToken, getUserDetails, isTokenValid, removeAuthData, setAuthData, setUserDetails } from '@/utils/cookies';
import { get } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Toast } from 'primereact/toast';
import React, { useCallback } from 'react';
import { createContext, Suspense, useContext, useEffect, useRef, useState } from 'react';


let axiosRef: string | null = null;

const defaultContext: AppContextType = {
    displayName: '',
    setDisplayName: () => { },
    user: null,
    setUser: () => { },
    company: null,
    setCompany: () => { },
    isLoading: true,
    setLoading: () => { },
    signOut: () => { },
    setAlert: () => { },
    authToken: null,
    setAuthToken: () => { },
    isScroll: true,
    setScroll: () => { },
    selectedSubLocation: null,
    setSelectedSubLocation: () => { }
};
const AppContext = createContext(defaultContext);

const authRoutes = ['/login', '/reset-password', '/forgot-password'];

export const AppWrapper = React.memo(({ children }: any) => {
    const pathname = usePathname()
    const router = useRouter()
    const [displayName, setDisplayName] = useState('');
    const [authToken, setAuthToken] = useState(getAuthToken());
    const [user, setUser] = useState(null);
    const [company, setCompany] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [sideMenu, setSideMenu] = useState([]);
    const [isScroll, setScroll] = useState(true);
    const [selectedSubLocation, setSelectedSubLocation] = useState<any>(null);

    const toastRef = useRef<any>(null);

    useEffect(() => {
        const isValid = isTokenValid(authToken);
        if (!isValid) {
            if (authRoutes.includes(pathname)) {
                return;
            }
            router.replace('/login');
        }
        else if (authToken && isValid && authRoutes.includes(pathname)) {
            console.log('app wrapper', get(isValid, 'portalLink', '/'))
            router.replace(get(isValid, 'portalLink', '/'));
        }
    }, [authToken])
    useEffect(() => {
        setLoading(true);
        const userToken: string = getAuthToken();
        if (userToken) {
            setLoading(false);
            if (!isTokenValid(userToken)) {
                signOut()
                return;
            }
        }
        else {
            setLoading(false);
        }

        const userData = getUserDetails();
        if (userData) {
            try {
                setUser(userData)
            } catch (error) {

            }

            if (userData && userData.company) {
                try {
                    setCompany(userData.company)
                } catch (error) {

                }
            }
        }
        fetchData()

        eventEmitter.on('signOut', (data: any) => {
            console.log('Event received:');
            removeAuthData();
            signOut();
            setAlert('info', 'Session expired')
        });

    }, [])

    const fetchData = useCallback(async () => {
        const token = getAuthToken();
        const isValid = isTokenValid(token);
        if (!axiosRef && isValid) {
            axiosRef = 'ref';
            const result: CustomResponse = await GetCall('/auth/profile');
            axiosRef = null
            if (result.code == 'SUCCESS') {
                setUser(result.data);
                setCompany(result.data.company)
                setUserDetails(result.data);
            }
            else if (result.code == 'AUTH_FAILED') {
                setUser(null)
                if (token) {
                    setAlert('error', 'Session expired')
                }
            }
            else {
                if (token) {
                    setAlert('error', result.message)
                }
            }
        }
        else if (!isValid) {
            if (token) {
                removeAuthData();
                setAlert('error', 'Session expired')
            }
        }
    }, []);

    const signOut = async () => {
        await removeAuthData();
        setUser(null)
        router.replace(`/login`, undefined);
    }

    const setAlert = (type: string, message: string) => {
        if (toastRef.current) {
            toastRef.current.clear(); // Clear existing toast
        }

        toastRef.current.show({ severity: type, summary: type.toUpperCase(), detail: message, life: 3000 });
    }

    return (
        <Suspense fallback={<Preloader />}>
            <AppContext.Provider value={{
                displayName,
                setDisplayName,
                user, setUser,
                company, setCompany,
                authToken, setAuthToken,
                isLoading, setLoading,
                signOut,
                setAlert,
                isScroll,
                setScroll,
                selectedSubLocation, setSelectedSubLocation
            }}>
                <Toast ref={toastRef} />
                {isLoading && <div className='running-border'></div>}
                <div style={{ overflow: isScroll ? 'auto' : 'hidden', maxHeight: '100vh' }}>
                    {children}
                </div>
            </AppContext.Provider>
        </Suspense>
    );
})

export function useAppContext() {
    return useContext(AppContext);
}
