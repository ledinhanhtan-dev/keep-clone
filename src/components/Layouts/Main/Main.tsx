import React from 'react';
import NoteSwitch from 'src/components/Notes/NoteAdd/NoteSwitch';
import NoteEdit from 'src/components/Notes/NoteEdit/NoteEdit';
import ColorMenu from 'src/components/Notes/NoteItem/NoteControls/colorMenu/ColorMenu';
import NoteMenu from 'src/components/Notes/NoteItem/NoteControls/noteMenu/NoteMenu';
import NoteList from 'src/components/Notes/NoteList/NoteList';
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
