import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { useStore } from '@app/temp/utils/store';
import { Pagination, CaseInfoTableRow, CaseBaseType } from "@app/temp/utils/types"
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { CasesTableObserver } from './MaterialsTableObserver';
import { getPackinglistIdFromPathname } from '@app/temp/utils/etc'
import { Popover } from 'antd'

export const MaterialsTable: React.FC = () => {

    const { caseStore } = useStore();
    const [form] = BaseForm.useForm();
    const [editingKey, setEditingKey] = useState(0);
    const [pagination, setPagination] = useState<Pagination>({current: 1, pageSize: 10})
    const [loading, setLoading] = useState<Boolean>(false)
    const navigate = useNavigate();

    const isEditing = (caseInfoTableRow: CaseInfoTableRow) => caseInfoTableRow.key === editingKey;

    const save = async (key: number) => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            const caseId: number = key
            const dto: CaseBaseType = {
                description: values.description,
                boxType: values.boxType,
                weight: values.weight,
                length: values.innerBoxLength,
                width: values.innerBoxWidth,
                height: values.innerBoxHeight,
                quantity: values.quantity,
                boardPlank: values.boardPlank,
                packinglistId: getPackinglistIdFromPathname(window.location.pathname)
            }
            await caseStore.updateCase(caseId, dto)
            setEditingKey(0);
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    const cancel = () => {
        setEditingKey(0);
    };

    const editHandler = (caseInfoTableRow: CaseInfoTableRow) => {
        form.setFieldsValue({ ...caseInfoTableRow });
        setEditingKey(caseInfoTableRow.key);
    }

    const deleteHandler = async (key: number) => {
        setLoading(true)
        await caseStore.deleteCaseInfo(key)
        setLoading(false)
      };

    const handlePageChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        setPagination(pagination)
    };

    const columns = [
        {
            title: "ID",
            dataIndex: 'key',
            sorter: (a: CaseInfoTableRow, b: CaseInfoTableRow) => a.key - b.key,
            showSorterTooltip: true,
            width: "70px",
            editable: false
        },
        {
            title: "이름",
            dataIndex: 'description',
            width: '250px',
            editable: true
        },
        {
            title: "박스타입",
            dataIndex: 'boxType',
            width: '150px',
            editable: true,
            render: (text: string, caseInfoTableRow: CaseInfoTableRow) => {
                return <span>{caseInfoTableRow.boxType.toUpperCase()}</span>
            }
        },
        {
            title: "판재여부",
            dataIndex: 'boardPlank',
            width: '150px',
            editable: true,
            render: (text: string, caseInfoTableRow: CaseInfoTableRow) => {
                return caseInfoTableRow.boardPlank ? <span>예</span> : <span>아니오</span>
            }
        },
        {
            title: (<Popover content={"단위 : kg"}>*무게</Popover>),
            dataIndex: 'weight',
            width: '120px',
            editable: true,
        },
        {
            title: (<Popover content={"단위 : mm"}>**내가로</Popover>),
            dataIndex: 'innerBoxLength',
            width: '120px',
            editable: true,
        },
        {
            title: (<Popover content={"단위 : mm"}>**내세로</Popover>),
            dataIndex: 'innerBoxWidth',
            width: '120px',
            editable: true,
        },
        {
            title: (<Popover content={"단위 : mm"}>**내높이</Popover>),
            dataIndex: 'innerBoxHeight',
            width: '120px',
            editable: true,
        },
        {
            title: (<Popover content={"단위 : mm"}>**외가로</Popover>),
            dataIndex: 'outerBoxLength',
            width: '120px',
            editable: true,
        },
        {
            title: (<Popover content={"단위 : mm"}>**외세로</Popover>),
            dataIndex: 'outerBoxWidth',
            width: '120px',
            editable: true,
        },
        {
            title: (<Popover content={"단위 : mm"}>**외높이</Popover>),
            dataIndex: 'outerBoxHeight',
            width: '120px',
            editable: true,
        },
        {
            title: "수량",
            dataIndex: 'quantity',
            width: '120px',
            editable: true,
        },
        {
            title: (<Popover content={"단위 : Cubic Meter (m^3)"}>CBM</Popover>),
            dataIndex: 'cbm',
            width: '120px',
            editable: true,
        },
        {
            title: "수정/삭제",
            dataIndex: 'actions',
            width: '100px',
            render: (text: string, caseInfoTableRow: CaseInfoTableRow) => {
                const editable = isEditing(caseInfoTableRow);
                return (
                    <BaseSpace>
                    {editable ? (
                        <>
                            <BaseButton type="primary" onClick={() => save(caseInfoTableRow.key)}>
                                Save
                            </BaseButton>
                            <BaseButton type="ghost" onClick={cancel}>
                                Cancel
                            </BaseButton>
                        </>
                    ) : (
                        <>
                            <BaseButton type="ghost" disabled={editingKey !== 0} onClick={() => editHandler(caseInfoTableRow)}>
                                Edit
                            </BaseButton>
                            <BaseButton type="default" danger onClick={() => deleteHandler(caseInfoTableRow.key)}>
                                Delete
                            </BaseButton>
                        </>
                    )}
                    </BaseSpace>
                );
            },
        },
        {
            title: "자세히",
            dataIndex: 'detail',
            width: '100px',
            render: (text: string, caseInfoTableRow: CaseInfoTableRow) => {
                return (
                    <BaseSpace>
                        <BaseButton type="ghost" disabled={editingKey !== 0} onClick={() => navigate(`${caseInfoTableRow.key}/materials`)}>
                            공주표
                        </BaseButton>
                    </BaseSpace>
                )
            }
        }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (caseInfoTableRow: CaseInfoTableRow) => ({
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(caseInfoTableRow),
            }),
        };
      });

    return (
        <BaseForm form={form} component={false}>
            <CasesTableObserver mergedColumns={mergedColumns} pagination={pagination} loading={loading} setLoading={setLoading} handlePageChange={handlePageChange}/>
        </BaseForm>
    );
}
