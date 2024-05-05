import React, { useEffect } from 'react';
import { useStore } from '@app/temp/utils/store';
import { DataDrawer } from './DataDrawer';
import { observer } from 'mobx-react-lite';

export const DataObserver: React.FC<any> = observer(({mergedColumns, pagination, loading, setLoading, handlePageChange}) => {

    const { userStore, packinglistStore } = useStore();

    useEffect(() => {
        if (userStore.user.id) {
            const getTableData = async() => {
                setLoading(true)
                await packinglistStore.getPackinglists()
                setLoading(false)
            }
            getTableData()
        }
    }, [userStore.user]);

    return (
        <DataDrawer mergedColumns={mergedColumns} pagination={pagination} loading={loading} handlePageChange={handlePageChange} packinglists={packinglistStore.packinglists}/>
    );
})
