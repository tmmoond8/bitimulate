import React from 'react';
import { Header, PageTemplate, PolyBackground } from 'components';

const HomePage = () => {
  return (
    <PageTemplate 
      header={<Header/>}>
      <PolyBackground/>
      Home
    </PageTemplate>
  );
};

export default HomePage; 