import React from 'react';
import { BaseButton, BaseButtonProps } from '@app/components/common/BaseButton/BaseButton';
import { useTranslation } from 'react-i18next';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';

interface BaseButtonsGroupProps extends BaseButtonProps {
  className?: string;
  onCancel: () => void;
  loading?: boolean;
}

export const BaseButtonsGroup: React.FC<BaseButtonsGroupProps> = ({ className, onCancel, loading, ...props }) => {
  const { t } = useTranslation();

  return (
    <>
      <BaseRow className={className} wrap={false} gutter={{ xs: 10, md: 15, xl: 30 }}>
        <BaseCol span={12} offset={6}>
          <BaseButton block type="ghost" onClick={onCancel} {...props}>
            {t('common.cancel')}
          </BaseButton>
        </BaseCol>
      </BaseRow>
      <br/>
      <BaseRow className={className} wrap={false} gutter={{ xs: 10, md: 15, xl: 30 }}>
        <BaseCol span={12} offset={6}>
          <BaseButton block type="primary" loading={loading} htmlType="submit" {...props}>
            Update
          </BaseButton>
        </BaseCol>
      </BaseRow>
    </>
  );
};
