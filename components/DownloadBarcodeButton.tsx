import { PostPdfCall } from '@/app/api/ApiKit';
import { useAppContext } from '@/layout/AppWrapper';
import { get } from 'lodash';
import { Button } from 'primereact/button';
import React, { useState } from 'react';

interface Options {
    url: string,
    type: string,
    ids: number[],
    onSuccess?: any,
    onError?: any
}

const DownloadBarcodeButton = ({ url = '', type = '', ids = [], onSuccess = () => { }, onError = (message: any) => { } }: Options) => {
    const { setAlert, setLoading } = useAppContext();
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const generateBarcodes = async () => {
        if (isDownloading) {
            return;
        }
        setIsDownloading(true);
        setLoading(true);
        const result = await PostPdfCall(url, { type: type, ids: ids })
        setIsDownloading(false);
        setLoading(false);
        if (result && result.code == 'FAILED') {
            setAlert('error', result.message)
            if (onError) {
                onError(result.message)
            }
        }
        else {
            if (onSuccess) {
                onSuccess()
            }
        }
    }

    return (
        <Button type="button" icon={`pi ${isDownloading ? 'pi-spin pi-spinner' : 'pi-download'}`} label='Barcodes' onClick={generateBarcodes} data-pr-tooltip="Generate barcodes" disabled={isDownloading} />
    );
};

export default DownloadBarcodeButton;
