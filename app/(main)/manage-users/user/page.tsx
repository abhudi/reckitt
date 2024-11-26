/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';

const ManageUserAddPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isEditMode = searchParams.get('edit') === 'true'; // Check if in edit mode

    const [supplierId, setSupplierId] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [manufacturerName, setManufacturerName] = useState('');
    const [complianceStatus, setComplianceStatus] = useState(false);
    const [selectedProcurementCategory, setSelectedProcurementCategory] = useState(null);
    const [selectedProcurementOrder, setSelectedProcurementOrder] = useState(null);
    const [selectedProcurementDepartment, setSelectedProcurementDepartment] = useState(null);
    const [selectedSupplierCategory, setSelectedSupplierCategory] = useState(null);

    // Adjust title based on edit mode
    const pageTitle = isEditMode ? 'Edit User' : 'Add User';
    const submitButtonLabel = isEditMode ? 'Save' : 'Add User';

    const handleSubmit = () => {
        console.log('Form submitted', { supplierId, supplierName, manufacturerName, complianceStatus });
    };

    const renderNewRuleFooter = () => {
        return (
            <div className="p-card-footer flex justify-content-end px-4 gap-3 py-3 bg-slate-300 shadow-slate-400 ">
                <Button
                    label="Cancel"
                    className="text-pink-500 bg-white border-pink-500 hover:text-white hover:bg-pink-400 transition-colors duration-150"
                    onClick={() => router.push('/manage-users')} // Navigate back to manage users
                />
                <Button label={submitButtonLabel} icon="pi pi-check" className="bg-pink-500 border-pink-500 hover:bg-pink-400" onClick={handleSubmit} />
            </div>
        );
    };

    const footerNewRules = renderNewRuleFooter();

    const procurementOrder = [
        { label: '1', value: 'raw-materials' },
        { label: '2', value: 'packaging' },
        { label: '3', value: 'machinery' },
        { label: '4', value: 'services' }
    ];

    const renderContentbody = () => {
        return (
            <div className="grid">
                <div className="col-12">
                    <div className="flex flex-column gap-3">
                        <div className="p-fluid grid md:mx-7 pt-5">
                            <div className="field col-6">
                                <label htmlFor="role">Role</label>
                                <Dropdown id="role" value={selectedProcurementOrder} options={procurementOrder} onChange={(e) => setSelectedProcurementOrder(e.value)} placeholder="Select Role" className="w-full" />
                            </div>

                            <div className="field col-6">
                                <label htmlFor="manufacturerName">Full Name</label>
                                <input id="manufacturerName" type="text" value={manufacturerName} onChange={(e) => setManufacturerName(e.target.value)} className="p-inputtext w-full" placeholder="Enter Full Name" />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="manufacturerName">Email</label>
                                <input id="manufacturerName" type="text" value={manufacturerName} onChange={(e) => setManufacturerName(e.target.value)} className="p-inputtext w-full" placeholder="Enter Email" />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="manufacturerName">Phone Number</label>
                                <input id="manufacturerName" type="text" value={manufacturerName} onChange={(e) => setManufacturerName(e.target.value)} className="p-inputtext w-full" placeholder="Enter Phone Number" />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="manufacturerName">Password</label>
                                <input id="manufacturerName" type="text" value={manufacturerName} onChange={(e) => setManufacturerName(e.target.value)} className="p-inputtext w-full" placeholder="Enter Password" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const contentBody = renderContentbody();

    const handleNavigation = () => {
        router.push('/manage-users');
    };

    return (
        <div className="md:p-4 md:mx-5 md:my-5" style={{ position: 'relative' }}>
            <div className="p-card">
                {/* Header Section */}
                <div className="p-card-header">
                    <div style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
                        {/* Arrow pointing left */}
                        <Button icon="pi pi-arrow-left" className="p-button-text p-button-plain gap-5" style={{ marginRight: '1rem' }} onClick={handleNavigation}>
                            {/* Dynamic Add/Edit User text */}
                            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{pageTitle}</span>
                        </Button>
                    </div>
                </div>
                <hr />
                <div className="p-card-body">
                    {/* Body rendering */}
                    {contentBody}
                </div>

                {/* Footer Buttons */}
                <hr />
                {footerNewRules}
            </div>
        </div>
    );
};

export default ManageUserAddPage;
