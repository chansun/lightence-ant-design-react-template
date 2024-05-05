import React, { useEffect } from 'react';
import { useStore } from '@app/temp/utils/store';
import { DataDrawer } from './DataDrawer';
import { observer } from 'mobx-react-lite';
import { getPackinglistIdFromPathname } from '@app/temp/utils/etc'

export const DataObserver: React.FC<any> = observer(({mergedColumns, pagination, loading, setLoading, handlePageChange}) => {

    const page = "cases"

    const { packinglistStore, caseStore } = useStore();

    useEffect(() => {
            const currentPackinglistId: number = getPackinglistIdFromPathname(window.location.pathname)
            const exist = packinglistStore.exist(currentPackinglistId)
            if (exist) {
                const getTableData = async() => {
                    setLoading(true)
                    await caseStore.getCaseInfosByPackinglistId(currentPackinglistId, page)
                    setLoading(false)
                }
                getTableData()
            } else {
                caseStore.getSetCaseInfosByPage(page, [])
            }
    }, [packinglistStore.packinglists]);

    return (
        <DataDrawer mergedColumns={mergedColumns} pagination={pagination} loading={loading} handlePageChange={handlePageChange} caseInfos={caseStore.getCaseInfosByPage(page)}/>
    );
})
