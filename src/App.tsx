import { Route, Routes } from 'react-router-dom';
import * as Public_Page from './Imports/public.pages.ts';
import './App.scss';

function App() {

  return (
    <main>
      <Routes>
        <Route index element={<Public_Page.Index />} />
      </Routes>
    </main>
  )
};
export default App;
