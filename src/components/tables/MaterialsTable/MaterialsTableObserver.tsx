import React, { useEffect } from 'react';
import { useStore } from '@app/temp/utils/store';
import { CasesTableDataInjector } from './MaterialsTableDataInjector';
import { observer } from 'mobx-react-lite';
import { getPackinglistIdFromPathname } from '@app/temp/utils/etc'

export const CasesTableObserver: React.FC<any> = observer(({mergedColumns, pagination, loading, setLoading, handlePageChange}) => {

    const page = "materials"

    const { userStore, packinglistStore, caseStore } = useStore();

    useEffect(() => {
        if (userStore.user.id) {
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
        }
    }, [userStore.user, packinglistStore.packinglists]);

    return (
        <CasesTableDataInjector mergedColumns={mergedColumns} pagination={pagination} loading={loading} handlePageChange={handlePageChange}/>
    );
})
