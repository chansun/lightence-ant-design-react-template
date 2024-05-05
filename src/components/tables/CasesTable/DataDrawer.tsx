import React from 'react';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { CaseInfoType, CaseInfoTableRow } from "@app/temp/utils/types"
import { MainTableCell } from './MainTableCell';

export const DataDrawer: React.FC<any> = ({mergedColumns, pagination, loading, handlePageChange, caseInfos}) => {

    const datasource: CaseInfoTableRow[] = caseInfos.map((caseInfo: CaseInfoType) => {return {...caseInfo, key: caseInfo.id}})
    //const marginBottom = datasource.length == 0 ? "1.25rem" : "0"
    
    return (
            <BaseTable
                //size="small"
                //style={{ margin: `0 0 ${marginBottom} 0`}}
                components={{
                    body: {
                        cell: MainTableCell,
                    },
                }}
                columns={mergedColumns}
                rowClassName="editable-row"
                dataSource={datasource}
                pagination={pagination}
                //loading={loading}
                onChange={handlePageChange}
                scroll={{ x: 1850 }}
                //bordered
            />
    );
}