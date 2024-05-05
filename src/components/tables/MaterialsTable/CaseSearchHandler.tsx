import React from 'react';
import { useResponsive } from '@app/hooks/useResponsive';
import { useStore } from '@app/temp/utils/store';
import { DownOutlined } from '@ant-design/icons';
import { BaseDropdown } from '@app/components/common/BaseDropdown/Dropdown';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { getPackinglistIdFromPathname, getCaseIdFromPathname, trunc, convertIdToUrl } from '@app/temp/utils/etc';
import { CaseInfoType } from "@app/temp/utils/types"

export const CaseSearchHandler: React.FC = observer(() => {

  const page = "materials"

  const { caseStore } = useStore();
  const { isTablet, isDesktop } = useResponsive();
  const padding = isDesktop ? '18px 0 0 0' : (isTablet ? '18px 0 0 0' : '3px 0 0 0')

  let value: string = "ID | 이름 | 박스타입"

  const currentPackinglistId: number = getPackinglistIdFromPathname(window.location.pathname)
  const currentCaseId: number = getCaseIdFromPathname(window.location.pathname)
  if (caseStore.exist(currentCaseId, page) && caseStore.match(currentCaseId, currentPackinglistId, page)) {
    const caseInfo: CaseInfoType = caseStore.getCaseInfoById(currentCaseId, page)
    value = trunc(`${caseInfo.id} | ${caseInfo.description} | ${caseInfo.boxType.toUpperCase()}`, 16)
  } else {
    value != "ID | 이름 | 박스타입" ? "ID | 이름 | 박스타입" : value
  }

  const data = caseStore.getCaseInfosByPage(page).map((caseInfo) => {
    return {
      key: caseInfo.id,
      label: (<Link to={convertIdToUrl(currentPackinglistId, caseInfo.id)}>{trunc(`${caseInfo.id} | ${caseInfo.description} | ${caseInfo.boxType.toUpperCase()}`, 17)}</Link>)
    }
  })

  return (
    <div style={{
      color: 'var(--primary-color)',
      // padding: padding,
    }}>
      <BaseDropdown menu={{ items: data }} trigger={['click']}>
        <BaseButton size={"small"} noStyle={false} style={{width: '200px', fontWeight: "normal", borderRadius: "5px"}} onClick={(e) => e.preventDefault()}>
          {value} <DownOutlined />
        </BaseButton>
      </BaseDropdown>
    </div>
  );
})

