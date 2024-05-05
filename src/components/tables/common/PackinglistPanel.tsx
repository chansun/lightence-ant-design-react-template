import React, { useEffect } from 'react';
import { useResponsive } from '@app/hooks/useResponsive';
import { useStore } from '@app/temp/utils/store';
import { observer } from 'mobx-react-lite';
import { convertForkliftTypeToText, getPackinglistIdFromPathname } from '@app/temp/utils/etc';
import { PackinglistType } from "@app/temp/utils/types"

export const PackinglistPanel: React.FC<{caching: boolean}> = observer(({caching}) => {

    const { userStore, packinglistStore } = useStore();
    const { isTablet, isDesktop } = useResponsive();
    const bottomMargin = isDesktop ? '40px' : (isTablet ? '45px' : '25px')

    const currentPackinglistId: number = getPackinglistIdFromPathname(window.location.pathname)
    
    if (caching && packinglistStore.exist(currentPackinglistId)) {
        window.localStorage.setItem('RVPID', `${currentPackinglistId}`); // recently visited packinglist id
    }
    
    const packinglist: PackinglistType = packinglistStore.getById(currentPackinglistId)

    useEffect(() => {
        if (userStore.user.id) {
            const getTableData = async() => {
                await packinglistStore.getPackinglists()
            }
            getTableData()
        }
    }, [userStore.user]);

    return (
        <div>
            <div>ID : {packinglist.id == 0 ? "" : packinglist.id}</div>
            <div style={{margin: "10px 0 0 0"}}>고객사 : {packinglist.customerName}</div>
            <div style={{margin: "10px 0 0 0"}}>지게차타입 : {convertForkliftTypeToText(packinglist.forkliftType)}</div>
        </div>
    );
})
