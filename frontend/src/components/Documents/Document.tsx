import { Layout } from 'antd';
import React from 'react';
import MissionDocumentation from 'src/documents-markdown/MissionDocumentation';

const Document: React.FC = () => {
  return (
    <Layout>
      <MissionDocumentation />
    </Layout>
  );
};

export default Document;
