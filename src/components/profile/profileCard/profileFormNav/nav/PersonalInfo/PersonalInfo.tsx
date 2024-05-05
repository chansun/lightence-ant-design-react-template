import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { FirstNameItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/FirstNameItem/FirstNameItem';
import { LastNameItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/LastNameItem/LastNameItem';
import { NicknameItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/NicknameItem/NicknameItem';
import { PasswordItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/PasswordItem/PasswordItem';
import { SexItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/SexItem/SexItem';
import { BirthdayItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/BirthdayItem/BirthdayItem';
import { LanguageItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/LanguageItem/LanguageItem';
import { PhoneItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/PhoneItem/PhoneItem';
import { EmailItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/EmailItem/EmailItem';
import { CountriesItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/CountriesItem/CountriesItem';
import { CitiesItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/CitiesItem/CitiesItem';
import { ZipcodeItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/ZipcodeItem/ZipcodeItem';
import { AddressItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/AddressItem/AddressItem';
import { WebsiteItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/WebsiteItem/WebsiteItem';
import { SocialLinksItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/SocialLinksItem/SocialLinksItem';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { Dates } from '@app/constants/Dates';
import { notificationController } from '@app/controllers/notificationController';
import { PaymentCard } from '@app/interfaces/interfaces';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import Item from 'antd/lib/list/Item';
import styled from 'styled-components';
import { useStore } from '@app/temp/utils/store';
import { observer } from 'mobx-react-lite';
import { UserPasswordBaseType } from '@app/temp/utils/types'
import { sleep } from '@app/temp/utils/etc';

interface PersonalInfoFormValues {
    email: string;
    password: string;
}

export const PersonalInfo: React.FC = () => {

    const { userStore } = useStore();
    const [isFieldsChanged, setFieldsChanged] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const initialPersonalInfoValues: PersonalInfoFormValues = {
        email: userStore.user.email,
        password: '********'
    };
    const [form] = BaseButtonsForm.useForm();
    // const { t } = useTranslation();

    const handleSubmit = async (values: PersonalInfoFormValues) => {
        setLoading(true)
        const dto: UserPasswordBaseType = {
            password: values.password
        }
        const isSuccessful = await userStore.updateUserPassword(userStore.user.id, dto)
        await sleep(500) // artificial delay
        if (isSuccessful) {
            notificationController.success({ message: "Password changed successfully" });
        } else {
            notificationController.error({ message: "Password change failed" });
        }
        setLoading(false);
    }

  return (
    <BaseCard>
      <BaseButtonsForm
        form={form}
        name="info"
        loading={isLoading}
        initialValues={initialPersonalInfoValues}
        isFieldsChanged={isFieldsChanged}
        setFieldsChanged={setFieldsChanged}
        onFieldsChange={() => setFieldsChanged(true)}
        onFinish={handleSubmit}
      >
        <BaseRow gutter={{ xs: 10, md: 15, xl: 30 }}>
          <BaseColCentered span={24}>
            <BaseButtonsForm.Item>
              <BaseButtonsForm.Title>Account Info</BaseButtonsForm.Title>
            </BaseButtonsForm.Item>
          </BaseColCentered>
          <BaseCol span={12} offset={6}>
            <EmailItem verified={true} />
          </BaseCol>
          <BaseCol span={12} offset={6}>
            <PasswordItem />
          </BaseCol>
        </BaseRow>
        <br/>
      </BaseButtonsForm>
    </BaseCard>
  );
};

const BaseColCentered = styled(BaseCol)`
  // background: papayawhip;
  display: flex;
  align-items: center;
  justify-content: center;
`;

