import { ChevronLeftOutlined } from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import SidBarItem from './SideBarItem';
import instructorRoutesDefinition from '../../routes/instructorRoutesDefinition';

type SideBarProps = {
  drawerWidth?: number;
  title: string;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
};

const SideBar = ({
  drawerWidth = 240,
  title,
  isDrawerOpen,
  toggleDrawer,
}: SideBarProps) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="persistent" // temporary
        open={isDrawerOpen}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={toggleDrawer}
          >
            {isDrawerOpen ? title : ''}
          </Typography>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            sx={{ ml: 'auto' }}
          >
            <ChevronLeftOutlined />
          </IconButton>
        </Toolbar>
        <Divider />
        <Box sx={{ height: '100%', overflowY: 'auto' }}>
          <List>
            {instructorRoutesDefinition.map(({ name, to, isShowNavBar }) =>
              isShowNavBar ? (
                <SidBarItem key={name} primaryText={name} to={to} />
              ) : null
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
export default SideBar;

//   const { user } = useAuthStore();
