import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Tables } from '@app/components/tables/PackinglistsTable/Tables';

const PackinglistsTablePage: React.FC = () => {
  return (
    <>
      <PageTitle>패킹리스트</PageTitle>
      <Tables />
    </>
  );
};

export default PackinglistsTablePage;
