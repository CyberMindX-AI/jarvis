import React from 'react';
import { JarvisInterface } from '@/components/JarvisInterface';

const Index = () => {
  // Hardcoded credentials
  const agentId = 'your_agent_id_here';
  const apiKey = 'your_api_key_here';

  return <JarvisInterface agentId={agentId} apiKey={apiKey} />;
};

export default Index;
