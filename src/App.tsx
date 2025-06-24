import React from 'react';
import { ConfirmationProvider } from '@/contexts';
import MemeEditorPage from '@/pages/MemeEditor';

const App: React.FC = () => (
  <ConfirmationProvider>
    <MemeEditorPage />
  </ConfirmationProvider>
);

export default App;
