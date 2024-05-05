import React from 'react';
import * as S from './Tables.styles';
import { AddHandler } from './AddHandler'
import { MainTable } from './MainTable';
import { Card } from 'antd';

export const Tables: React.FC = () => {

    return (
        <S.TablesWrapper>
            <Card id="packinglists-table" title="패킹리스트" style={{marginBottom: "2rem"}} extra={<AddHandler/>}>
                <MainTable />
            </Card>
        </S.TablesWrapper>
    );
};
