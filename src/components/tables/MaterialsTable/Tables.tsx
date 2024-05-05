import React from 'react';
import { MaterialsTable } from './MaterialsTable';
import * as S from './Tables.styles';
import { PackinglistSearchHandler } from '../common/PackinglistSearchHandler'
import { PackinglistPanel } from '../common/PackinglistPanel';
import { CaseSearchHandler } from './CaseSearchHandler';
import { CasePanel } from './CasePanel';
import { Card } from 'antd';

export const Tables: React.FC = () => {
  return (
    <>
      <S.TablesWrapper>
        <Card id="packinglist-info" title="패킹리스트 정보" style={{marginBottom: "2rem"}} extra={<PackinglistSearchHandler tableType={"materials"}/>}>
          <PackinglistPanel caching={false} />
        </Card>
        <Card id="case-info" title="케이스 정보" style={{marginBottom: "2rem"}} extra={<CaseSearchHandler/>}>
          <CasePanel caching={true}/>
        </Card>
        <Card id="materials-table" title="공주표" style={{marginBottom: "2rem"}}>
          {/* <MaterialsTable /> */}
        </Card>
      </S.TablesWrapper>
    </>
  );
};
