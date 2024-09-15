import { Backdrop, Box, Toolbar } from '@mui/material';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import NavBar from './components/Navbar';
import SideBar from './components/Sidebar';

const drawerWidth = 280;
const title = 'Mentor Hub';
const InstructorLayout = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [toolbarHeight, setToolbarHeight] = useState(0);

  const toolbarRef = useRef<HTMLDivElement>(null);

  const updateToolbarHeight = useCallback(() => {
    if (toolbarRef.current) {
      setToolbarHeight(toolbarRef.current.clientHeight);
    }
  }, [toolbarRef.current]);

  useEffect(() => {
    updateToolbarHeight();
    window.addEventListener('resize', updateToolbarHeight);
    return () => window.removeEventListener('resize', updateToolbarHeight);
  }, [updateToolbarHeight]);

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
            height: '100vh',
            overflow: 'hidden',
            width: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
            ml: { sm: isDrawerOpen ? `${drawerWidth}px` : 0 },
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: '100%',
              overflow: 'auto',
            }}
          >
            <Toolbar ref={toolbarRef} />
            <Box
              onClick={() => {
                setIsDrawerOpen(false);
              }}
              sx={{
                height: `calc(100vh - ${toolbarHeight}px)`,
                overflow: 'auto',
                width: '100%',
                position: 'relative',
              }}
            >
              <Backdrop
                open={isDrawerOpen}
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer - 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
                onClick={toggleDrawer} // Oculta el drawer al hacer clic en el backdrop
              />
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default InstructorLayout;
