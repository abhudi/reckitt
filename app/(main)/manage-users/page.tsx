'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import CustomDataTable, { CustomDataTableRef } from '@/components/CustomDataTable';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { getRowLimitWithScreenHeight } from '@/utils/uitl';

const ManageUsersPage = () => {
    const router = useRouter();
    const { layoutState } = useContext(LayoutContext);
    const [isShowSplit, setIsShowSplit] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const dataTableRef = useRef<CustomDataTableRef>(null);
    const [limit, setLimit] = useState<number>(getRowLimitWithScreenHeight());

    // Sample data for the users
    const databoxx = [
        {
            id: '1', // Assuming each user has a unique ID
            poNumber: 'PO-12345',
            supplierName: 'ABC Supplier',
            supplierAddress: 'ABC Address',
            supplierContact: 'ABC Contact',
            supplierEmail: 'abc@gmail.com',
            supplierStatus: 'Active'
        },
        {
            id: '2', // Another unique ID
            poNumber: 'PO-67890',
            supplierName: 'XYZ Supplier',
            supplierAddress: 'XYZ Address',
            supplierContact: 'XYZ Contact',
            supplierEmail: 'xyz@gmail.com',
            supplierStatus: 'Inactive'
        }
    ];

    const handleCreateNavigation = () => {
        router.push('manage-users/user'); // Replace with the actual route for adding a new user
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left flex align-items-center">
                    <h3 className="mb-0">Manage Users</h3>
                </span>
                <div className="flex justify-content-end">
                    <Button icon="pi pi-plus" size="small" label="Add User" aria-label="Import Supplier" className="bg-pink-500 border-pink-500 " onClick={handleCreateNavigation} style={{ marginLeft: 10 }} />
                </div>
            </div>
        );
    };

    const header = renderHeader();

    const renderInputBox = () => {
        return (
            <div style={{ position: 'relative' }}>
                <InputText placeholder="Search" style={{ paddingLeft: '40px', width: '40%' }} />
                <span
                    className="pi pi-search"
                    style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'gray',
                        fontSize: '1.5rem'
                    }}
                ></span>
            </div>
        );
    };

    const inputboxfeild = renderInputBox();

    const handleEditUser = (userId: any) => {
        // Navigate to the edit page with the userId in the query parameters
        router.push(`/manage-users/user?edit=true&userId=${userId}`);
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className={`panel-container ${isShowSplit ? (layoutState.isMobile ? 'mobile-split' : 'split') : ''}`}>
                    <div className="left-panel pt-5">
                        <div className="header">{header}</div>
                        <div className="search-box  mt-5">{inputboxfeild}</div>
                        <CustomDataTable
                            ref={dataTableRef}
                            filter
                            page={page}
                            limit={limit} // no of items per page
                            // totalRecords={totalRecords} // total records from api response
                            // isView={true}
                            // isEdit={true} // show edit button
                            isDelete={true} // show delete button
                            extraButtons={[
                                {
                                    icon: 'pi pi-user-edit',
                                    onClick: (e) => {
                                        // Assuming e is the row data, which has the userId property
                                        handleEditUser(e.id); // Pass the userId from the row data
                                    }
                                }
                            ]}
                            data={databoxx}
                            columns={[
                                {
                                    header: 'Sr No',
                                    field: 'srno',
                                    filter: true,
                                    sortable: true,
                                    bodyStyle: { minWidth: 150, maxWidth: 150 },
                                    filterPlaceholder: 'Sr No'
                                },
                                {
                                    header: 'Role',
                                    field: 'role',
                                    filter: true,
                                    bodyStyle: { minWidth: 150, maxWidth: 150 },
                                    filterPlaceholder: 'Search Role'
                                },
                                {
                                    header: 'Name',
                                    field: 'name',
                                    sortable: true,
                                    filter: true,
                                    filterPlaceholder: 'Search Name',
                                    style: { minWidth: 120, maxWidth: 120 }
                                },
                                {
                                    header: 'User Name',
                                    field: 'username',
                                    filter: true,
                                    bodyStyle: { minWidth: 150, maxWidth: 150 },
                                    filterPlaceholder: 'Search User Name'
                                },
                                {
                                    header: 'Mobile ',
                                    field: 'mobile',
                                    filter: true,
                                    filterPlaceholder: 'Search Mobile ',
                                    bodyStyle: { minWidth: 150, maxWidth: 150 }
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsersPage;
