import Main from './components/Layouts/Main/Main';
import Header from './components/Layouts/Header/Header';
import Sidebar from './components/Layouts/Sidebar/Sidebar';
import PortalOverLay from './components/UI/Portals/PortalOverlay';
import Tooltip from './components/UI/Tooltip/Tooltip';

import classes from './App.module.scss';
import { useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { fetchNotes } from './store/thunks/notesThunks';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => dispatch(fetchNotes()), [dispatch]);

  return (
    <>
      <div className={classes.app}>
        <Header />
        <div className={classes.content}>
          <Sidebar />
          <Main />
        </div>
      </div>

      <PortalOverLay>
        <Tooltip />
      </PortalOverLay>
    </>
  );
}

export default App;
