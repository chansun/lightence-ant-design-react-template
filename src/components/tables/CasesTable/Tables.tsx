import React from 'react';
import * as S from './Tables.styles';
import { PackinglistSearchHandler } from '../common/PackinglistSearchHandler'
import { PackinglistPanel } from '../common/PackinglistPanel';
import { AddHandler } from './AddHandler';
import { MainTable } from './MainTable';
import { Card } from 'antd';

export const Tables: React.FC = () => {
  return (
    <>
      <S.TablesWrapper>
        <Card id="packinglist-info" title="패킹리스트 정보" style={{marginBottom: "2rem"}} extra={<PackinglistSearchHandler tableType={"cases"}/>}>
          <PackinglistPanel caching={true}/>
        </Card>
        <Card id="cases-table" title="케이스" style={{marginBottom: "2rem"}} extra={<AddHandler/>}>
          <MainTable />
        </Card>
      </S.TablesWrapper>
    </>
  );
};
