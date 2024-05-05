import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Tables } from '@app/components/tables/CasesTable/Tables';

const CasesTablePage: React.FC = () => {
  return (
    <>
      <PageTitle>케이스</PageTitle>
      <Tables />
    </>
  );
};

export default CasesTablePage;
