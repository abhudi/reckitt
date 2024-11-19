/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import CustomDataTable, { CustomDataTableRef } from '@/components/CustomDataTable';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { getRowLimitWithScreenHeight } from '@/utils/uitl';
const ManageSupplierPage = () => {
    const router = useRouter();
    const { layoutState } = useContext(LayoutContext);
    const [isShowSplit, setIsShowSplit] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const dataTableRef = useRef<CustomDataTableRef>(null);
    const [limit, setLimit] = useState<number>(getRowLimitWithScreenHeight());

    const handleCreateNavigation = () => {
        router.push('/create-supplier'); // Replace with the route you want to navigate to
    };
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left flex align-items-center">
                    <h3 className="mb-0">Manage Suppliers</h3>
                </span>
                <div className="flex justify-content-end">
                    <Button icon="pi pi-plus" size="small" label="Import Supplier" aria-label="Add Supplier" className="default-button " style={{ marginLeft: 10 }} />
                    <Button icon="pi pi-plus" size="small" label="Add Supplier" aria-label="Import Supplier" className="bg-pink-500 border-pink-500 " onClick={handleCreateNavigation} style={{ marginLeft: 10 }} />
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

    const databoxx = [
        {
            poNumber: 'PO-12345',
            supplierName: 'ABC Supplier',
            supplierAddress: 'ABC Address',
            supplierContact: 'ABC Contact',
            supplierEmail: 'abc@gmail.com',
            supplierStatus: 'Active'
        },
        {
            poNumber: 'PO-67890',
            supplierName: 'XYZ Supplier',
            supplierAddress: 'XYZ Address',
            supplierContact: 'XYZ Contact',
            supplierEmail: 'xyz@gmail.com',
            supplierStatus: 'Inactive'
        }
        // Add more data here...
    ];
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
                            isEdit={true} // show edit button
                            isDelete={true} // show delete button
                            // extraButtons={[
                            //     {
                            //         icon: 'pi pi-cloud-upload',
                            //         onClick: (item) => openDialog()
                            //     },
                            //     {
                            //         icon: 'pi pi-external-link',
                            //         onClick: async (item) => {
                            //             setDialogVisible(true);
                            //             setPoId(item.poId); // Set the poId from the clicked item

                            //             await fetchTrackingData(item.poId);
                            //         }
                            //     }
                            // ]}
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
                                    header: 'Supplier Id',
                                    field: 'supplierid',
                                    // body: renderVendor,
                                    filter: true,
                                    // filterElement: vendorDropdown,
                                    bodyStyle: { minWidth: 150, maxWidth: 150 },
                                    filterPlaceholder: 'Supplier Id'
                                },
                                {
                                    header: 'Supplier Name',
                                    field: 'suppliername',
                                    sortable: true,
                                    filter: true,
                                    filterPlaceholder: 'Supplier Name',
                                    style: { minWidth: 120, maxWidth: 120 }
                                },
                                {
                                    header: 'Procurement Category',
                                    field: 'procurementcateogyr',
                                    // body: renderWarehouse,
                                    filter: true,
                                    // filterElement: warehouseDropdown,
                                    bodyStyle: { minWidth: 150, maxWidth: 150 },
                                    filterPlaceholder: 'Search Procurement Category'
                                },
                                {
                                    header: 'Supplier Category',
                                    field: 'suppliercategory',
                                    // body: renderStatus,
                                    filter: true,
                                    filterPlaceholder: 'Search Supplier Category',
                                    bodyStyle: { minWidth: 150, maxWidth: 150 }
                                    // filterElement: statusDropdown
                                },
                                {
                                    header: 'Supplier Manufacturing Name',
                                    field: 'manufacturingname',
                                    filter: true,
                                    filterPlaceholder: 'Search Supplier Manufacturing Name',
                                    bodyStyle: { minWidth: 150, maxWidth: 150 }
                                    // body: renderPOTotal
                                },
                                {
                                    header: 'Site Address',
                                    field: 'siteaaddress',
                                    filter: true,
                                    filterPlaceholder: 'Search Site Address',
                                    bodyStyle: { minWidth: 150, maxWidth: 150 }
                                },
                                {
                                    header: 'Factory Name',
                                    field: 'factoryname',
                                    filter: true,
                                    filterPlaceholder: 'Search Factory Name',
                                    bodyStyle: { minWidth: 150, maxWidth: 150 }
                                },
                                {
                                    header: 'Warehouse Location',
                                    field: 'warehouselocation',
                                    filter: true,
                                    filterPlaceholder: 'Search Warehouse Location',
                                    bodyStyle: { minWidth: 150, maxWidth: 150 }
                                }
                            ]}
                            // onLoad={(params: any) => fetchData(params)}
                            // // onView={(item: any) => onRowSelect(item, 'view')}
                            // onEdit={(item: any) => onRowSelect(item, 'edit')}
                            // onDelete={(item: any) => onRowSelect(item, 'delete')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageSupplierPage;
