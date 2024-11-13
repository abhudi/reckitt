type EmptyPermissions = {
    permissionId?: number | null;
    module: string;
    permission: string;
    desc: string;
};

type EmptyCompany = {
    companyId?: number | null;
    name: string;
    email: string;
    subdomain: string;
    pocName?: string;
    pocNumber?: string;
    altPOCName?: string;
    altPOCNumber?: string;
    einNumber?: string;
    gstNumber?: string;
    permissions?: any;
    isActive?: boolean;
    desc?: string;
    roleId?: number | null;
};

type EmptyRoles = {
    companyId?: number | null;
    name: string;
    rolePermissions?: any;
    isActive?: boolean;
    desc: string;
    roleId?: number | null;
};

type EmptyRolePermissions = {
    permission: {
        permissionId?: number | null;
        module: string;
        permission: string;
        desc: string;
    };
};
type receivepurchaseItem = {
    index: number;
    palletId: string;
    category: { key: string; label: string } | null; 
    sku: { skuId: string; sku: string } | null; 
    binId: string;
    REID: string;
};
type EmptyUser = {
    companyUserId?: number | null;
    companyId?: number | null;
    createdAt?: string;
    updatedAt?: string;
    roleId?: number | null;
    user?: {
        companyUserId: number | null;
        displayName: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: number | null;
        countryCode: string;
        isActive: boolean;
        location: string;
        userId: number | null;
        profile: string;
    };
    roles?: any;
};
type EmptyWarehouse = {
    warehouseId?: number | null;
    companyId?: number | null;
    name: string;
    location: string;
    phone: string;
    zip: string;
    isActive: boolean;
};
type EmptySubLocation = {
    locationId?: number | null;
    name?: string;
    location?: string;
    phone?: string;
    warehouseId?: number | null;
};
type EmptyRack = {
    warehouseId?: number | null;
    locationId?: number | null;
    name?: string;
    desc?: string;
    value?: string;
    rackTypeId?: number | null;
    noOfRows?: number | null;
    noOfRacks?: number | null;
    location?: string;
};
type EmptyCategoryAttribute = {
    catAttrId?: number | undefined;
    codeTypeId?: number | null;
    selectionType?: string;
    action?: string;
    isSKUEnabled?: boolean;
    isSKURank?: number | null;
    sampleValue?: string;
    codeType?: string;
    desc?: string;
};
type EmptyCategory = {
    categoryId?: number | null;
    companyId?: number | null;
    parentId?: number | null;
    name: string;
    label: string;
    key: number | null;
    isActive: boolean;
};
type EmptyBin = {
    rowId?: number | null;
    rackTypeId?: number | null;
    capacityId?: number | null;
    rackId?: number | null;
    noOfBins?: number | null;
    rackType?: string;
    warehouseId?: number | null;
};

type EmptyMake = {
    masterCodeId?: number | null;
    companyId?: number | null;
    codeTypeId?: string;
    code: string;
    value: string;
    desc: string;
    codeType: {
        codeType: string;
        codeTypeId: number | null;
    };
    isActive: boolean;
};
interface SelectedValue {
    valueOptions: any;
    attribute: string;
    value: string | Array<{ id: number; value: string }>;
    isSKURank: number;
    selectionType: string;
}
type EmptyCategory = {
    categoryId?: number | null;
    companyId?: number | null;
    parentId?: number | null;
    name: string;
    label: string;
    key: number;
    children?: [
        {
            categoryId: number | null;
            companyId: number | null;
            parentId: number | null;
            name: string;
            isActive: boolean;
            key: number;
            label: string;
            children?: [
                {
                    categoryId: number | null;
                    companyId: number | null;
                    parentId: number | null;
                    name: string;
                    isActive: boolean;
                    key: number;
                    label: string;
                }
            ];
        }
    ];
    isActive: boolean;
};

type Vendors = {
    name: string;
    aliasName: string;
    companyName: string;
    phone: string;
    email: string;
    fax: string;
    website: string;
    warehouseIds: [];
    paymentTerms: [];
    categoryIds: [];
    pocs: [
        {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            countryCode: string;
            gender: string;
        }
    ];
    addresses: [
        {
            type: string;
            address1: string;
            address2: string;
            city: string;
            state: string;
            zip: string;
            country: string;
        }
    ];
    note: string;
    gradings: [
        {
            grade: string;
            desc: string;
            processId: string;
            isCrossDock: boolean;
            isScreenDamage: boolean;
            rmaPercentage: string;
        }
    ];
};
type PointOfContact = {
    firstName: string;
    lastName: string;
    email: string;
    phone: number | null;
    countryCode: string;
    gender: 'Male' | 'Female' | 'Other';
};

type Address = {
    type: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
};
type EmptySKU = [
    {
        name: string;
        sku: string;
        group: Boolean;
        categoryId: number | null;
        price: number | 0;
        compareAtPrice: number | 0;
        attributes: [
            {
                catAttrId: number | null;
                attrName: string;
                value: string;
            }
        ];
    }
];

type PointOfContact = {
    firstName: string;
    lastName: string;
    email: string;
    phone: number | null;
    countryCode: string;
    gender: 'Male' | 'Female' | 'Other';
};

type Address = {
    type: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
};
type Grading = {
    grade: string;
    desc: string;
    processId: string;
    isCrossDock: boolean;
    isScreenDamage: boolean;
    rmaPercentage: number | null;
};
type EmptyPallet = {
    palletId: [];
    po: [
        {
            poNumber: string;
        }
    ];
};
type EmptyGradeToBin = {
    binGradeId? = number;
};
export type {
    EmptyPermissions,
    EmptyCompany,
    EmptyRoles,
    EmptyRolePermissions,
    EmptyUser,
    EmptyWarehouse,
    EmptySubLocation,
    EmptyRack,
    EmptyBin,
    EmptyMake,
    EmptyCategory,
    EmptyCategory,
    EmptyCategoryAttribute,
    Vendors,
    PointOfContact,
    Address,
    SelectedValue,
    EmptySKU,
    EmptyPallet,
    EmptyGradeToBin,
    receivepurchaseItem
};
