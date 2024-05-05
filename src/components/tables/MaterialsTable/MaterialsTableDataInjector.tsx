import React from 'react';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { useStore } from '@app/temp/utils/store';
import { observer } from 'mobx-react-lite';
import { CaseInfoType, CaseInfoTableRow } from "@app/temp/utils/types"
import { CasesTableCell } from './MaterialsTableCell';

export const CasesTableDataInjector: React.FC<any> = observer(({mergedColumns, pagination, loading, handlePageChange}) => {

    const page = "materials"

    const { caseStore } = useStore();

    const datasource: CaseInfoTableRow[] = caseStore.getCaseInfosByPage(page).map((caseInfo: CaseInfoType) => {return {...caseInfo, key: caseInfo.id}})
    const marginBottom = datasource.length == 0 ? "1.25rem" : "0"
    
    return (
            <BaseTable
            style={{ margin: `0 0 ${marginBottom} 0`}}
                components={{
                    body: {
                    cell: CasesTableCell,
                    },
                }}
                columns={mergedColumns}
                rowClassName="editable-row"
                dataSource={datasource}
                pagination={pagination}
                loading={loading}
                onChange={handlePageChange}
                scroll={{ x: 1550 }}
                bordered
            />
    );
})