import { ListItem, ListItemButton, ListItemText } from '@mui/material';

import { useMemo } from 'react';

type SideBarItemProp = {
  primaryText: string;
};

const SidBarItem = ({ primaryText = '' }: SideBarItemProp) => {
  const newTitle = useMemo(() => {
    return primaryText.length > 20
      ? primaryText.substring(0, 20) + '...'
      : primaryText;
  }, [primaryText]);
  return (
    <ListItem
      key={primaryText}
      disablePadding
      // onClick={() => {
      //   onClickNote();
      // }}
    >
      <ListItemButton>
        {/* <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon> */}
        <ListItemText
          primary={newTitle}
          // secondary={body}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SidBarItem;
