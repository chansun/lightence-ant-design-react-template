import React, { useState } from 'react';
import { useResponsive } from '@app/hooks/useResponsive';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { BaseSelect, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { Form } from "antd";
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { useStore } from '@app/temp/utils/store';
import { PackinglistBaseType } from '@app/temp/utils/types'
import { notificationController } from '@app/controllers/notificationController';

export const AddHandler: React.FC = () => {

    const [isBasicModalOpen, setIsBasicModalOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const { packinglistStore } = useStore();

    const { isTablet, isDesktop } = useResponsive();
    const fontSize = isDesktop ? '20px' : (isTablet ? '17px' : '15px')
    const padding = isDesktop ? '18px 0 0 0' : (isTablet ? '16px 0 0 0' : '0 0 3px 0')

    const okHandler = async () => {
        setConfirmLoading(true);
        await form
            .validateFields()
            .then(async (values: PackinglistBaseType) => {
                const dto: PackinglistBaseType = {
                    ...values,
                    customerName: values.customerName.trim()
                }
                const isSuccessful = await packinglistStore.createPackinglist(dto)
                if (isSuccessful) {
                    notificationController.success({ message: "Created a new packinglist" });
                } else {
                    notificationController.error({ message: "Failed creating a new packinglist" });
                }
                setConfirmLoading(false);
                setIsBasicModalOpen(false);
                form.resetFields();
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
                setConfirmLoading(false);
            });
    };

    const cancelHandler = () => {
        setIsBasicModalOpen(false)
        form.resetFields();
    }

    return (
        <>
            <div onClick={()=>{setIsBasicModalOpen(true)}} style={{
                color: 'var(--primary-color)', 
                // fontSize: fontSize, 
                // padding: padding, 
                fontWeight: 'bold', 
                cursor: 'pointer',
            }}>
                추가하기
            </div>
            <BaseModal
            title="패킹리스트 추가"
            open={isBasicModalOpen}
            onOk={okHandler}
            onCancel={cancelHandler}
            confirmLoading={confirmLoading}
            >
                <BaseButtonsForm isFieldsChanged={false} name="form" form={form}>
                <BaseButtonsForm.Item
                name="customerName"
                label={"고객사"}
                rules={[{ required: true, message: "고객사를 입력하세요 (최대길이: 20)", max: 20 }]}
                >
                    <BaseInput />
                </BaseButtonsForm.Item>
                <BaseButtonsForm.Item
                name="forkliftType"
                label="지게발 타입"
                hasFeedback
                rules={[{ required: true, message: "지게발 타입을 선택하세요" }]}
                >
                    <BaseSelect>
                        <Option value={1}>일반적인 3단 지게발</Option>
                        <Option value={2}>활자세워 3단 지게발</Option>
                        <Option value={3}>활자세워 2단 지게발</Option>
                    </BaseSelect>
                </BaseButtonsForm.Item>
                </BaseButtonsForm>
            </BaseModal>
        </>
    );
};

