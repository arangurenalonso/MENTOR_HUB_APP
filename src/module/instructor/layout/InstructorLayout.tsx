import { Box, Toolbar } from '@mui/material';
import { ReactNode, useState } from 'react';
import NavBar from './components/Navbar';
import SideBar from './components/Sidebar';

const drawerWidth = 280;
const title = 'Mentor Hub';
const InstructorLayout = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <>
      <Box className="animate__animated animate__fadeIn animate__faster">
        <NavBar
          drawerWidth={drawerWidth}
          title={title}
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
        />

        <SideBar
          drawerWidth={drawerWidth}
          title={title}
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
            ml: { sm: isDrawerOpen ? `${drawerWidth}px` : 0 },
          }}
        >
          <Toolbar />

          {children}
        </Box>
      </Box>
    </>
  );
};

export default InstructorLayout;
