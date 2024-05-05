import React from 'react';
import { useResponsive } from '@app/hooks/useResponsive';
import { useStore } from '@app/temp/utils/store';
import { DownOutlined } from '@ant-design/icons';
import { BaseDropdown } from '@app/components/common/BaseDropdown/Dropdown';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { observer } from 'mobx-react-lite';
import { 
  convertForkliftTypeToText, 
  getPackinglistIdFromPathname,
  getCaseIdFromPathname,
  trunc,
  convertIdToUrl,
  nonce
} from '@app/temp/utils/etc';
import { Link } from 'react-router-dom';

export const PackinglistSearchHandler: React.FC<{ tableType: string }> = observer(({tableType}) => {

  const { packinglistStore } = useStore();
  const { isTablet, isDesktop } = useResponsive();
  const padding = isDesktop ? '18px 0 0 0' : (isTablet ? '18px 0 0 0' : '3px 0 0 0')

  let value: string = "ID | 고객사 | 지게차타입"

  const currentPackinglistId: number = getPackinglistIdFromPathname(window.location.pathname)
  
  if (packinglistStore.exist(currentPackinglistId)) {
    const packinglist = packinglistStore.getById(currentPackinglistId)
    value = trunc(`${packinglist.id} | ${packinglist.customerName} | ${convertForkliftTypeToText(packinglist.forkliftType)}`, 16)
  }

  const caseId = (tableType == "cases") ? nonce : getCaseIdFromPathname(window.location.pathname)

  const data = packinglistStore.packinglists.map((packinglist) => {
    return {
      key: packinglist.id,
      label: (<Link to={convertIdToUrl(packinglist.id, caseId)}>{trunc(`${packinglist.id} | ${packinglist.customerName} | ${convertForkliftTypeToText(packinglist.forkliftType)}`, 17)}</Link>)
    }
  })

  return (
    <div style={{
      color: 'var(--primary-color)',
      //padding: padding,
    }}>
      <BaseDropdown menu={{ items: data }} trigger={['click']}>
        <BaseButton size={"small"} noStyle={false} style={{width: '200px', fontWeight: "normal", borderRadius: "5px"}} onClick={(e) => e.preventDefault()}>
          {value} <DownOutlined />
        </BaseButton>
      </BaseDropdown>
    </div>
  );
})

