import React from 'react';
import { ConfirmationProvider } from './contexts';
import { MemeEditorPage } from './pages';

const App: React.FC = () => {
  return (
    <ConfirmationProvider>
      <MemeEditorPage />
    </ConfirmationProvider>
  );
};

export default App;
