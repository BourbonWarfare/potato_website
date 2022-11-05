import { Layout } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import MissionDocumentation from 'src/documents-markdown/MissionDocumentation';

const Document: React.FC = () => {
  const { document } = useParams();
  console.log('document: ', document);
  return (
    <Layout>
      <MissionDocumentation />
    </Layout>
  );
};

export default Document;
