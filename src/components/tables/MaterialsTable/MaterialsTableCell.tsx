import React from 'react';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { InputNumber } from 'antd';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  index: number;
  children: React.ReactNode;
}

export const CasesTableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    children,
    ...restProps
}) => {

    let inputNode = <></>;

    if (dataIndex === "boxType") {
        inputNode = (
            <BaseButtonsForm.Item
            hasFeedback
            name={dataIndex}
            style={{ margin: 0, width: "120px" }}
            rules={[{ required: true, message: "박스타입을 선택하세요" }]}
            >
                <BaseSelect>
                    <Option value={"a"}>A</Option>
                    <Option value={"b"}>B</Option>
                    <Option value={"c"}>C</Option>
                    <Option value={"d"}>D</Option>
                </BaseSelect>
            </BaseButtonsForm.Item>
        )
    } else if (dataIndex === "boardPlank") {
        inputNode = (
            <BaseButtonsForm.Item
            hasFeedback
            name={dataIndex}
            style={{ margin: 0, width: "150px" }}
            rules={[{ required: true, message: "판재여부 선택하세요" }]}
            >
                <BaseSelect>
                    <Option value={true}>예</Option>
                    <Option value={false}>아니오</Option>
                </BaseSelect>
            </BaseButtonsForm.Item>
        )
    } else if (dataIndex === "description") {
        inputNode = (
            <BaseButtonsForm.Item
            name={dataIndex}
            style={{ margin: 0, width: "220px" }}
            rules={[{ required: true, message: "이름를 입력하세요 (최대길이: 15)", max: 15 }]}
            >
                <BaseInput />
            </BaseButtonsForm.Item>
        )
    } else if (dataIndex === "outerBoxLength" || dataIndex === "outerBoxWidth" || dataIndex === "outerBoxHeight" || dataIndex === "cbm") 
        inputNode = (
            <BaseButtonsForm.Item
            name={dataIndex}
            style={{ margin: 0, width: "120px" }}
            rules={[{ required: true, message: "값을 입력하세요 (최대 5자리)", type: "number", max: 100000 }]}
            >
                <InputNumber disabled />
            </BaseButtonsForm.Item>
        )
    else {
        inputNode = (
            <BaseButtonsForm.Item
            name={dataIndex}
            style={{ margin: 0, width: "120px" }}
            rules={[{ required: true, message: "값을 입력하세요 (최대 5자리)", type: "number", max: 100000 }]}
            >
                <InputNumber />
            </BaseButtonsForm.Item>
        )
    }

    return (
        <td {...restProps}>
        {editing ? (<>{inputNode}</>) : (
            children
        )}
        </td>
    );
};
