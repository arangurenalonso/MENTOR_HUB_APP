import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import useAuthStore from '../../../../hooks/useAuthStore';
import ThemeSwitcher from '../../../../common/components/ThemeSwitcher';
type NavbarProps = {
  drawerWidth?: number;
  title: string;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
};

const NavBar = ({
  drawerWidth = 240,
  title,
  isDrawerOpen,
  toggleDrawer,
}: NavbarProps) => {
  const { logOutProcess } = useAuthStore();
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer}
          sx={{
            mr: 2,
            display: { sm: isDrawerOpen ? 'none' : 'block' },
          }}
        >
          <MenuOutlined />
        </IconButton>

        {!isDrawerOpen && (
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={toggleDrawer}
            color={'inherit'}
          >
            {title}
          </Typography>
        )}

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <ThemeSwitcher />
          <IconButton color="inherit" onClick={logOutProcess}>
            <LogoutOutlined />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
