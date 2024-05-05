import React, { useEffect, useState } from 'react';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { useStore } from '@app/temp/utils/store';
import { UserType } from'@app/temp/utils/types';
import { observer } from 'mobx-react-lite';

export const ProfileDropdown: React.FC = observer(() => {

    const [open, setOpen] = useState(false);

    const { userStore } = useStore();
    const { isTablet } = useResponsive();

    const user: UserType = userStore.user

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <BasePopover content={<ProfileOverlay onClick={hide}/>} trigger="click" open={open} onOpenChange={handleOpenChange}>
            <S.ProfileDropdownHeader as={BaseRow} gutter={[10, 10]} align="middle">
                {/* <BaseCol>
                    <BaseAvatar src={""} alt="User" shape="circle" size={40} />
                </BaseCol> */}
                {isTablet && (
                    <BaseCol>
                        <span>{user.email}</span>
                    </BaseCol>
                )}
            </S.ProfileDropdownHeader>
        </BasePopover>
    )
})
