/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from 'primereact/button';

const EmailTemplatePage = () => {
    const router = useRouter();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>EmailTemplatePage</h5>
                    <p>Use this page to start from scratch and place your custom content.</p>
                </div>
            </div>
        </div>
    );
};

export default EmailTemplatePage;
