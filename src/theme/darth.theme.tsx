import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

const darkPrimaryContainer = '#9cbc80'; // Versión más clara del color primario
const darkPrimaryContainerText = '#1a2815'; // Texto en el contenedor primario

const darkSecondaryContainer = '#8a9b80'; // Versión más clara del color secundario
const darkSecondaryContainerText = '#2a2e24'; // Texto en el contenedor secundario

const darkBackGroundDefault = '#121212'; // Fondo predeterminado oscuro
const darkBackGroundPaper = '#1d1d1d'; // Fondo de los componentes (como tarjetas) en modo oscuro

const darkPrimaryText = '#e2e5df'; // Texto primario claro
const darkSecondaryText = '#c4c8c0'; // Texto secundario claro

const dividerColor = '#373737';
const darkTheme = createTheme({
  palette: {
    // common:{
    //   black:"",
    //   white:"",
    // },
    mode: 'dark',
    contrastThreshold: 3,
    primary: {
      // light: '',
      main: darkPrimaryContainer,
      // dark: ,
      contrastText: darkPrimaryContainerText,
    },
    secondary: {
      //   light: '',
      main: darkSecondaryContainer,
      //   dark: '',
      contrastText: darkSecondaryContainerText,
    },
    error: {
      //   light: '',
      main: red.A400,
      //   dark: '',
      //   contrastText: '',
    },
    // warning: {
    //   light: '',
    //   main: '',//Mandatory
    //   dark: '',
    //   contrastText: '',
    // },
    // info: {
    //   light: '',
    //   main: '',//Mandatory
    //   dark: '',
    //   contrastText: '',
    // },
    // success: {
    //   light: '',
    //   main: '',//Mandatory
    //   dark: '',
    //   contrastText: '',
    // },
    // divider: 'red',
    background: {
      default: darkBackGroundDefault,
      paper: darkBackGroundPaper,
    },
    text: {
      primary: darkPrimaryText,
      secondary: darkSecondaryText,
      // disabled:""
    },
    divider: dividerColor,
  },
});

export default darkTheme;
