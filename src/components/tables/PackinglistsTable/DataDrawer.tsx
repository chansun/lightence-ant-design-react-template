import React from 'react';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { PackinglistType, PackinglistTableRow } from "@app/temp/utils/types"
import { MainTableCell } from './MainTableCell';

export const DataDrawer: React.FC<any> = ({mergedColumns, pagination, loading, handlePageChange, packinglists}) => {

    const datasource: PackinglistTableRow[] = packinglists.map((packinglist: PackinglistType) => {return {key: packinglist.id, customerName: packinglist.customerName, forkliftType: packinglist.forkliftType}})
    //const marginBottom = datasource.length == 0 ? "1.25rem" : "0"

    return (
            <BaseTable
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
                scroll={{ x: 970 }}
                //bordered
            />
    );
}