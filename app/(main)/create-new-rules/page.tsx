/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import _ from 'lodash';
import { Dropdown } from 'primereact/dropdown';

const CreateNewRulesPage = () => {
    const router = useRouter();
    const [supplierId, setSupplierId] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [manufacturerName, setManufacturerName] = useState('');
    const [complianceStatus, setComplianceStatus] = useState(false);
    const [selectedProcurementCategory, setSelectedProcurementCategory] = useState(null);
    const [selectedProcurementOrder, setSelectedProcurementOrder] = useState(null);
    const [selectedProcurementDepartment, setSelectedProcurementDepartment] = useState(null);
    const [selectedSupplierCategory, setSelectedSupplierCategory] = useState(null);
    const handleSubmit = () => {
        console.log('Form submitted', { supplierId, supplierName, manufacturerName, complianceStatus });
    };

    const renderNewRuleFooter = () => {
        return (
            <div className="p-card-footer flex justify-content-end px-4 gap-3 py-3 bg-slate-300 shadow-slate-400 ">
                <Button label="Cancel" className="text-pink-500 bg-white border-pink-500 hover:text-white hover:bg-pink-400 transition-colors duration-150" />
                <Button label="Submit" icon="pi pi-check" className="bg-pink-500 border-pink-500 hover:bg-pink-400" onClick={handleSubmit} />
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
    const procurementDepartment = [
        { label: '1', value: 'raw-materials' },
        { label: '2', value: 'packaging' },
        { label: '3', value: 'machinery' },
        { label: '4', value: 'services' }
    ];
    const procurementCategories = [
        { label: '1', value: 'raw-materials' },
        { label: '2', value: 'packaging' },
        { label: '3', value: 'machinery' },
        { label: '4', value: 'services' }
    ];
    const supplierCategories = [
        { label: '1', value: 'raw-materials' },
        { label: '2', value: 'packaging' },
        { label: '3', value: 'machinery' },
        { label: '4', value: 'services' }
    ];
    const renderContentbody = () => {
        return (
            <div className="grid">
                <div className="col-12">
                    <div className="flex flex-column gap-3 pt-5">
                        <h2 className="text-center font-bold ">Create / Add New Rules</h2>
                        <div className="p-fluid grid md:mx-7 pt-5">
                            <div className="field col-6">
                                <label htmlFor="procurementCategory">Order By</label>
                                <Dropdown id="procurementCategory" value={selectedProcurementOrder} options={procurementOrder} onChange={(e) => setSelectedProcurementOrder(e.value)} placeholder="Select Order By" className="w-full" />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="procurementCategory">Department</label>
                                <Dropdown id="procurementCategory" value={selectedProcurementDepartment} options={procurementDepartment} onChange={(e) => setSelectedProcurementDepartment(e.value)} placeholder="Select Department" className="w-full" />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="procurementCategory">Procurement Category</label>
                                <Dropdown
                                    id="procurementCategory"
                                    value={selectedProcurementCategory}
                                    options={procurementCategories}
                                    onChange={(e) => setSelectedProcurementCategory(e.value)}
                                    placeholder="Select Procurement Category"
                                    className="w-full"
                                />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="procurementCategory">Supplier Category</label>
                                <Dropdown id="procurementCategory" value={selectedSupplierCategory} options={supplierCategories} onChange={(e) => setSelectedSupplierCategory(e.value)} placeholder="Select Supplier Category" className="w-full" />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="manufacturerName">Criteria Category</label>
                                <input id="manufacturerName" type="text" value={manufacturerName} onChange={(e) => setManufacturerName(e.target.value)} className="p-inputtext w-full" placeholder="Enter Manufacturing Name" />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="manufacturerName">Criteria</label>
                                <input id="manufacturerName" type="text" value={manufacturerName} onChange={(e) => setManufacturerName(e.target.value)} className="p-inputtext w-full" placeholder="Enter Factory Name" />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="manufacturerName">Criteria Evaluation List</label>
                                <input id="manufacturerName" type="text" value={manufacturerName} onChange={(e) => setManufacturerName(e.target.value)} className="p-inputtext w-full" placeholder="Enter Manufacturing Name" />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="manufacturerName">Criteria Score</label>
                                <input id="manufacturerName" type="text" value={manufacturerName} onChange={(e) => setManufacturerName(e.target.value)} className="p-inputtext w-full" placeholder="Enter Factory Name" />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="manufacturerName">Ratio Co Pack</label>
                                <input id="manufacturerName" type="text" value={manufacturerName} onChange={(e) => setManufacturerName(e.target.value)} className="p-inputtext w-full" placeholder="Enter Site Address" />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="manufacturerName">Ratios Raw & Pack</label>
                                <input id="manufacturerName" type="text" value={manufacturerName} onChange={(e) => setManufacturerName(e.target.value)} className="p-inputtext w-full" placeholder="Enter Warehouse Location" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const contentBody = renderContentbody();
    return (
        <div className="md:p-4 md:mx-5 md:my-5">
            <div className="p-card">
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

export default CreateNewRulesPage;
