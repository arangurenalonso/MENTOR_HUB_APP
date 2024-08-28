import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

const primaryContainer = '#376a1f';
const primaryContainerText = '#e2ffdf';

const secondaryContainer = '#55634c';
const secondaryContainerText = '#eef3e7';

const backGroundDefault = '#ffffff';
const backGroundPaper = '#d9e8cb';

const primaryText = '#686a65';
const secondaryText = '#55634c';

const dividerColor = '#72806a';

const lightTheme = createTheme({
  palette: {
    // common:{
    //   black:"",
    //   white:"",
    // },
    mode: 'light',
    contrastThreshold: 3,
    primary: {
      // light: '',
      main: primaryContainer,
      // dark: ,
      contrastText: primaryContainerText,
    },
    secondary: {
      //   light: '',
      main: secondaryContainer,
      //   dark: '',
      contrastText: secondaryContainerText,
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
      default: backGroundDefault,
      paper: backGroundPaper,
    },
    text: {
      primary: primaryText,
      secondary: secondaryText,
      // disabled:""
    },
    divider: dividerColor,
  },
});

export default lightTheme;
