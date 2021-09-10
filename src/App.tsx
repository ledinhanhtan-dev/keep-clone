import Main from './components/Layouts/Main/Main';
import Header from './components/Layouts/Header/Header';
import Sidebar from './components/Layouts/Sidebar/Sidebar';
import PortalOverLay from './components/UI/Portals/PortalOverlay';
import Tooltip from './components/UI/Tooltip/Tooltip';

import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.content}>
        <Sidebar />
        <Main />
      </div>

      <PortalOverLay>
        <Tooltip />
      </PortalOverLay>
    </div>
  );
}

export default App;
