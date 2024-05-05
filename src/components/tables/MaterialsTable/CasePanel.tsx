import React, { useEffect } from 'react';
import { useResponsive } from '@app/hooks/useResponsive';
import { useStore } from '@app/temp/utils/store';
import { observer } from 'mobx-react-lite';
import { getPackinglistIdFromPathname, getCaseIdFromPathname } from '@app/temp/utils/etc';
import { CaseInfoType } from "@app/temp/utils/types"
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';

export const CasePanel: React.FC<{caching: boolean}> = observer(({caching}) => {

    const page = "materials"

    const { packinglistStore, caseStore } = useStore();
    const { isTablet, isDesktop } = useResponsive();
    const bottomMargin = isDesktop ? '40px' : (isTablet ? '45px' : '25px')

    const currentPackinglistId: number = getPackinglistIdFromPathname(window.location.pathname)
    const currentCaseId: number = getCaseIdFromPathname(window.location.pathname)
    
    if (caching && caseStore.exist(currentCaseId, page) && caseStore.match(currentCaseId, currentPackinglistId, page)) {
        window.localStorage.setItem('RVMPID', `${currentPackinglistId}`); // recently visited materials packniglist id
        window.localStorage.setItem('RVMCID', `${currentCaseId}`); // recently visited materials case id
    }

    const caseInfo: CaseInfoType = caseStore.getCaseInfoById(currentCaseId, page)
    
    useEffect(() => {
        if (packinglistStore.exist(currentPackinglistId)) { // 존재하는경우
            const getCaseInfo = async() => {
                await caseStore.getCaseInfosByPackinglistId(currentPackinglistId, page)
            }
            getCaseInfo()
        } else {
            caseStore.setCaseInfos([])
        } 
    }, [packinglistStore.packinglists]);
    
    return (
        <BaseRow >
            <BaseCol style={{width: "300px"}}>
                <div>ID : {caseInfo.id == 0 ? "" : caseInfo.id}</div>
                <div style={{margin: "10px 0"}}>이름 : {caseInfo.description}</div>
                <div style={{margin: "10px 0"}}>박스타입 : {caseInfo.boxType.toUpperCase()}</div>
                <div style={{margin: "10px 0"}}>판재여부 : {caseInfo.id == 0 ? "" : (caseInfo.boardPlank ? "예" : "아니오")}</div>
                <div style={{margin: "10px 0"}}>무게 : {caseInfo.weight == 0 ? "" : caseInfo.weight + " kg"}</div>
            </BaseCol>
            <BaseCol style={{width: "300px"}}>
                <div>내가로 : {caseInfo.innerBoxLength == 0 ? "" : caseInfo.innerBoxLength + " mm"}</div>
                <div style={{margin: "10px 0"}}>내세로 : {caseInfo.innerBoxWidth == 0 ? "" : caseInfo.innerBoxWidth + " mm"}</div>
                <div style={{margin: "10px 0"}}>내높이 : {caseInfo.innerBoxHeight == 0 ? "" : caseInfo.innerBoxHeight + " mm"}</div>
            </BaseCol>
            <BaseCol style={{width: "300px"}}>
                <div>외가로 : {caseInfo.outerBoxLength == 0 ? "" : caseInfo.outerBoxLength + " mm"}</div>
                <div style={{margin: "10px 0"}}>외세로 : {caseInfo.outerBoxWidth == 0 ? "" : caseInfo.outerBoxWidth + " mm"} </div>
                <div style={{margin: "10px 0"}}>외높이 : {caseInfo.outerBoxHeight == 0 ? "" : caseInfo.outerBoxHeight + " mm"}</div>
            </BaseCol>
            <BaseCol style={{width: "300px"}}>
                <div>수량 : {caseInfo.quantity == 0 ? "" : caseInfo.quantity}</div>
                <div style={{margin: "10px 0"}}>CBM : {caseInfo.cbm == 0 ? "" : caseInfo.cbm + " m^3"}</div>
            </BaseCol>
        </BaseRow>
    );
})
