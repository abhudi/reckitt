/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import moment from 'moment-timezone';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <span className="font-medium ml-2">Reckitt</span>
            {' ©' + moment().format('YYYY')}
        </div>
    );
};

export default AppFooter;
