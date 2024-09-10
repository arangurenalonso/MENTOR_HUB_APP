import { ListItem, ListItemButton, ListItemText } from '@mui/material';

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type SideBarItemProp = {
  primaryText: string;
  to: string;
};

const SidBarItem = ({ primaryText = '', to }: SideBarItemProp) => {
  const navigate = useNavigate();

  const newTitle = useMemo(() => {
    return primaryText.length > 20
      ? primaryText.substring(0, 20) + '...'
      : primaryText;
  }, [primaryText]);
  return (
    <ListItem key={primaryText} disablePadding onClick={() => navigate(to)}>
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
