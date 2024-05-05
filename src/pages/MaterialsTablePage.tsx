import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Tables } from '@app/components/tables/MaterialsTable/Tables';

const MaterialsTablePage: React.FC = () => {
  return (
    <>
      <PageTitle>공주표</PageTitle>
      <Tables />
    </>
  );
};

export default MaterialsTablePage;
