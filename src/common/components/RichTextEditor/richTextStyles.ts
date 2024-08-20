import { DraftStyleMap } from 'draft-js';

export const availableFontSizes = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72,
];
const fontSizeStyles: { [styleName: string]: React.CSSProperties } = {};

availableFontSizes.forEach((size) => {
  fontSizeStyles[`FONT_SIZE_${size}`] = { fontSize: `${size}px` };
});

export const customStyleMap: DraftStyleMap = {
  SUPERSCRIPT: {
    verticalAlign: 'super',
    // fontSize: 'smaller',
  },
  SUBSCRIPT: {
    verticalAlign: 'sub',
    // fontSize: 'smaller',
  },
  // LEFT_ALIGN: {
  //   display: 'inline-block' as 'inline-block', // Asegúrate que el tipo está correctamente definido
  //   textAlign: 'left' as 'left', // Tipo seguro para 'textAlign'
  //   width: '100%',
  // },
  // CENTER_ALIGN: {
  //   display: 'inline-block' as 'inline-block',
  //   textAlign: 'center' as 'center',
  //   width: '100%',
  // },
  // RIGHT_ALIGN: {
  //   display: 'inline-block' as 'inline-block',
  //   textAlign: 'right' as 'right',
  //   width: '100%',
  // },
  // JUSTIFY_ALIGN: {
  //   display: 'inline-block' as 'inline-block',
  //   textAlign: 'justify' as 'justify',
  //   width: '100%',
  // },
  // HEADER_ONE: {
  //   fontSize: '2em',
  // },
  // HEADER_TWO: {
  //   fontSize: '1.5em',
  // },
  // HEADER_THREE: {
  //   fontSize: '1.17em',
  // },
  // HEADER_FOUR: {
  //   fontSize: '1em'
  // },
  // HEADER_FIVE: {
  //   fontSize: '0.83em',
  // },
  // HEADER_SIX: {
  //   fontSize: '0.75em',
  // },
  ...fontSizeStyles,
};

export const myBlockStyleFn = (contentBlock: any) => {
  const type = contentBlock.getType();
  switch (type) {
    case 'leftAlign':
      return 'leftAlign';
    case 'rightAlign':
      return 'rightAlign';
    case 'centerAlign':
      return 'centerAlign';
    case 'justifyAlign':
      return 'justifyAlign';
    default:
      return '';
  }
};
