import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { useStore } from '@app/temp/utils/store';
import { PackinglistBaseType, Pagination, PackinglistTableRow } from "@app/temp/utils/types"
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { DataObserver } from './DataObserver';

export const MainTable: React.FC = () => {

    const { packinglistStore } = useStore();
    const [form] = BaseForm.useForm();
    const [editingKey, setEditingKey] = useState(0);
    const [pagination, setPagination] = useState<Pagination>({current: 1, pageSize: 10})
    const [loading, setLoading] = useState<Boolean>(false)
    const navigate = useNavigate();

    const isEditing = (packinglistTableRow: PackinglistTableRow) => packinglistTableRow.key === editingKey;

    const save = async (key: number) => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            const packinglistId: number = key
            const dto: PackinglistBaseType = {
                customerName: values.customerName,
                forkliftType: values.forkliftType
            }
            await packinglistStore.updatePackinglist(packinglistId, dto)
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

    const editHandler = (packinglistTableRow: PackinglistTableRow) => {
        form.setFieldsValue({ ...packinglistTableRow });
        setEditingKey(packinglistTableRow.key);
    }

    const deleteHandler = async (key: number) => {
        setLoading(true)
        await packinglistStore.deletePackinglist(key)
        setLoading(false)
      };

    const handlePageChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        setPagination(pagination)
    };

    const columns = [
        {
            title: "ID",
            dataIndex: 'key',
            sorter: (a: PackinglistTableRow, b: PackinglistTableRow) => a.key - b.key,
            showSorterTooltip: true,
            width: "70px",
            editable: false
        },
        {
            title: "고객사",
            dataIndex: 'customerName',
            width: '300px',
            editable: true
        },
        {
            title: "지게차타입",
            dataIndex: 'forkliftType',
            width: '300px',
            editable: true,
            render: (text: string, packinglistTableRow: PackinglistTableRow) => {
                return <span>{packinglistTableRow.forkliftType == 1 ? "일반 3단" : (packinglistTableRow.forkliftType == 2 ? "활자 3단" : "활자 2단")}</span>
            }
        },
        {
            title: "수정/삭제",
            dataIndex: 'actions',
            width: '300px',
            render: (text: string, packinglistTableRow: PackinglistTableRow) => {
                const editable = isEditing(packinglistTableRow);
                return (
                    <BaseSpace>
                    {editable ? (
                        <>
                            <BaseButton type="primary" onClick={() => save(packinglistTableRow.key)}>
                                Save
                            </BaseButton>
                            <BaseButton type="ghost" onClick={cancel}>
                                Cancel
                            </BaseButton>
                        </>
                    ) : (
                        <>
                            <BaseButton type="ghost" disabled={editingKey !== 0} onClick={() => editHandler(packinglistTableRow)}>
                                Edit
                            </BaseButton>
                            <BaseButton type="default" danger onClick={() => deleteHandler(packinglistTableRow.key)}>
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
            render: (text: string, packinglistTableRow: PackinglistTableRow) => {
                return (
                    <BaseSpace>
                        <BaseButton type="ghost" disabled={editingKey !== 0} onClick={() => navigate(`${packinglistTableRow.key}/cases`)}>
                            케이스작성
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
            onCell: (packinglistTableRow: PackinglistTableRow) => ({
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(packinglistTableRow),
            }),
        };
    });

    return (
        <BaseForm form={form} component={false}>
            <DataObserver mergedColumns={mergedColumns} pagination={pagination} loading={loading} setLoading={setLoading} handlePageChange={handlePageChange}/>
        </BaseForm>
    );
}
