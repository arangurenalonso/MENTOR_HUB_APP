import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1A237E', // Azul Medianoche
    },
    secondary: {
      main: '#4FC3F7', // Azul Cielo
    },
    error: {
      main: red.A400, // Rojo Coral
    },
    background: {
      default: '#FFFFFF', // Blanco Nieve
      paper: '#F5F5F5', // Blanco suave para elementos como tarjetas
    },
    text: {
      primary: '#37474F', // Gris Pizarra
      secondary: '#757575', // Gris medio para textos secundarios
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#37474F', // Color del texto del botón en estado normal
        },
        outlined: {
          borderColor: '#37474F', // Color del borde en botones con estilo "outlined"
        },
        contained: {
          color: '#FFFFFF', // Color del texto en botones con estilo "contained"
          backgroundColor: '#1A237E', // Color de fondo del botón
          '&:hover': {
            backgroundColor: '#0D1C66', // Color de fondo cuando el botón es hover
          },
        },
      },
    },
  },
});

export default lightTheme;
