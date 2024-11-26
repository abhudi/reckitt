/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from 'primereact/button';

const FaqPage = () => {
    const router = useRouter();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="p-card">
                    <div className="p-card-header text-center pt-5">
                        <h1 className="mb-1 font-semibold">Frequently Asked Question ?</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, quo!</p>
                    </div>
                    <div className="p-card-body" style={{ height: '68vh' }}>
                        {/* Step Content */}
                        {/* {renderStepContent()} */}
                    </div>
                    {/* Footer Buttons */}
                    <hr />
                    <div className="p-card-footer flex justify-content-end px-4 gap-3 py-3 bg-slate-300 shadow-slate-400 "></div>
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
