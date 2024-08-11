import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0D47A1', // Azul Cobalto
    },
    secondary: {
      main: '#64FFDA', // Verde Menta
    },
    error: {
      main: '#FF6E6E', // Rojo Lava
    },
    background: {
      default: '#121212', // Gris Carbón
      paper: '#1E1E1E', // Gris oscuro para elementos como tarjetas
    },
    text: {
      primary: '#E0E0E0', // Blanco Humo
      secondary: '#B0BEC5', // Gris claro para textos secundarios
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#E0E0E0', // Color del texto del botón
        },
        outlined: {
          borderColor: '#E0E0E0', // Color del borde en botones con estilo "outlined"
        },
        contained: {
          color: '#121212', // Color del texto en botones con estilo "contained"
          backgroundColor: '#0D47A1', // Color de fondo del botón
          '&:hover': {
            backgroundColor: '#0B3D91', // Color de fondo cuando el botón es hover
          },
        },
      },
    },
  },
});

export default darkTheme;
