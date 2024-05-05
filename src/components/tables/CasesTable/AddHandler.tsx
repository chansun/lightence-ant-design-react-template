import React, { useEffect, useState } from 'react';
import { useResponsive } from '@app/hooks/useResponsive';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { BaseSelect, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { Form } from "antd";
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { useStore } from '@app/temp/utils/store';
import { CaseBaseType } from '@app/temp/utils/types'
import { notificationController } from '@app/controllers/notificationController';
import { InputNumber } from '@app/components/common/inputs/InputNumber/InputNumber';
import { getPackinglistIdFromPathname } from '@app/temp/utils/etc'
import { observer } from 'mobx-react-lite';

export const AddHandler: React.FC = observer(() => {

  const [isBasicModalOpen, setIsBasicModalOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [data, setData] = useState<{exist: boolean, packinglistId: number}>({
    exist: false,
    packinglistId: 0,
  });
  const [form] = Form.useForm();
  const { packinglistStore, caseStore } = useStore();

  const { isTablet, isDesktop } = useResponsive();
  const fontSize = isDesktop ? '20px' : (isTablet ? '17px' : '15px')
  const padding = isDesktop ? '18px 0 0 0' : (isTablet ? '16px 0 0 0' : '0 0 3px 0')

  useEffect(() => {
    const currentPackinglistId: number = getPackinglistIdFromPathname(window.location.pathname)
    const exist = packinglistStore.exist(currentPackinglistId)
    if (data.exist != exist || data.packinglistId != currentPackinglistId) {
      setData({exist: exist, packinglistId: currentPackinglistId})
    }
  }, [data, packinglistStore.packinglists])

  const okHandler = async () => {
    
    setConfirmLoading(true);
    await form
      .validateFields()
      .then(async (values: CaseBaseType) => {
        const dto: CaseBaseType = {
          ...values,
          description: values.description.trim(),
          packinglistId: data.packinglistId
        }
        const isSuccessful = await caseStore.createCase(dto)
        if (isSuccessful) {
          notificationController.success({ message: "Created a new case" });
        } else {
          notificationController.error({ message: "Failed creating a new case" });
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

  if (data.exist) {
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
          title="케이스 추가"
          open={isBasicModalOpen}
          onOk={okHandler}
          onCancel={cancelHandler}
          confirmLoading={confirmLoading}
        >
          <BaseButtonsForm isFieldsChanged={false} name="form" form={form}>
            <BaseButtonsForm.Item
              name="description"
              label="이름"
              rules={[{ required: true, message: "케이스 이름을 입력하세요 (최대길이: 15)", max: 15 }]}
            >
              <BaseInput />
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item
              name="boxType"
              label="박스타입"
              hasFeedback
              rules={[{ required: true, message: "박스타입을 선택하세요"}]}
            >
              <BaseSelect>
                <Option value="a">A</Option>
                <Option value="b">B</Option>
                <Option value="c">C</Option>
                <Option value="d">D</Option>
              </BaseSelect>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item
              name="boardPlank"
              label="판재여부"
              hasFeedback
              rules={[{ required: true, message: "판재여부를 선택하세요"}]}
            >
              <BaseSelect>
                <Option value={true}>예</Option>
                <Option value={false}>아니오</Option>
              </BaseSelect>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item
              name="weight"
              label="무게 (kg)"
              rules={[{ required: true, message: "무게를 입력하세요 (최대 5자리)", type: "number", max: 100000, min: 1 }]}
            >
              <InputNumber style={{width: '100%'}}/>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item
              name="length"
              label="가로 (mm)"
              rules={[{ required: true, message: "가로 길이를 입력하세요 (최대 5자리)", type: "number", max: 100000, min: 1 }]}
            >
              <InputNumber style={{width: '100%'}}/>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item
              name="width"
              label="세로 (mm)"
              rules={[{ required: true, message: "세로 길이를 입력하세요 (최대 5자리)", type: "number", max: 100000, min: 1 }]}
            >
              <InputNumber style={{width: '100%'}}/>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item
              name="height"
              label="높이 (mm)"
              rules={[{ required: true, message: "높이 길이를 입력하세요 (최대 5자리)", type: "number", max: 100000, min: 1 }]}
            >
              <InputNumber style={{width: '100%'}}/>
            </BaseButtonsForm.Item>
            <BaseButtonsForm.Item
              name="quantity"
              label="수량"
              rules={[{ required: true, message: "수량을 입력하세요 (최대 5자리)", type: "number", max: 100000, min: 1 }]}
            >
              <InputNumber style={{width: '100%'}}/>
            </BaseButtonsForm.Item>
          </BaseButtonsForm>
        </BaseModal>
      </>
    );
  } else {
    return (<div></div>)
  }
});

