import React from 'react';
import NoteSwitch from 'src/components/Notes/noteAdd/NoteSwitch';
import NoteEdit from 'src/components/Notes/noteEdit/NoteEdit';
import ColorMenu from 'src/components/Notes/noteItem/noteControls/colorMenu/ColorMenu';
import NoteMenu from 'src/components/Notes/noteItem/noteControls/noteMenu/NoteMenu';
import NoteList from 'src/components/Notes/noteList/NoteList';
import PortalOverLay from 'src/components/UI/Portals/PortalOverlay';

import classes from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <div className={classes.main} role="main">
      <NoteSwitch />
      <NoteList />
      <PortalOverLay>
        <NoteEdit />
        <NoteMenu />
        <ColorMenu />
      </PortalOverLay>
    </div>
  );
};

export default Main;
