import React from 'react';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  index: number;
  children: React.ReactNode;
}

export const MainTableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    children,
    ...restProps
}) => {
    const inputNode = dataIndex === 'forkliftType' ? (
        <BaseButtonsForm.Item
        name={dataIndex}
        style={{ margin: 0 }}
        hasFeedback
        rules={[{ required: true, message: "지게발 타입을 선택하세요" }]}
        >
            <BaseSelect>
                <Option value={1}>일반 3단</Option>
                <Option value={2}>활자 3단</Option>
                <Option value={3}>활자 2단</Option>
            </BaseSelect>
        </BaseButtonsForm.Item>
    ) : (
        <BaseButtonsForm.Item
        name={dataIndex}
        style={{ margin: 0, padding: "30px 0 30px 0" }}
        rules={[{ required: true, message: "고객사를 입력하세요" }]}
        >
            <BaseInput />
        </BaseButtonsForm.Item>
    );

    return (
        <td {...restProps}>
        {editing ? (<>{inputNode}</>) : (
            children
        )}
        </td>
    );
};
