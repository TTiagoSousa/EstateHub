import { Route, Routes } from 'react-router-dom';
import * as Public_Page from './Imports/public.pages.ts';
import * as Private_Page from './Imports/private.pages.ts';
import './App.scss';
import Authentication_Check from './Authentication/Authentication_Check.tsx';
import Simple_Alert from './Components/Alerts/Simple_Alert/Simple_Alert.tsx';

function App() {

  return (
    <main>
      <Simple_Alert></Simple_Alert>
      <Routes>
        <Route index element={<Public_Page.Index />} />
        <Route path='Auth' element={ <Public_Page.Auth /> } />

        <Route
          path="/*"
          element={
            <Authentication_Check>
                <Private_Page.Main />
            </Authentication_Check>
          }
        />
      </Routes>
    </main>
  )
};
export default App;
