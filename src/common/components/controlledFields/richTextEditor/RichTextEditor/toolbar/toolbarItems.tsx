import {
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatUnderlined as FormatUnderlinedIcon,
  StrikethroughS as StrikethroughSIcon,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  FormatAlignCenter as FormatAlignCenterIcon,
  FormatAlignRight as FormatAlignRightIcon,
  FormatAlignJustify as FormatAlignJustifyIcon,
  FormatListBulleted as FormatListBulletedIcon,
  FormatListNumbered as FormatListNumberedIcon,
  // LooksOne as LooksOneIcon,
  // LooksTwo as LooksTwoIcon,
  // Looks3 as LooksThreeIcon,
  // Looks4 as LooksFourIcon,
  // Looks5 as LooksFiveIcon,
  // Looks6 as LooksSixIcon,
} from '@mui/icons-material';

const toolbarItems: {
  label: string;
  style: string;
  icon: JSX.Element;
  method: string;
}[] = [
  {
    label: 'bold',
    style: 'BOLD',
    icon: <FormatBoldIcon />,
    method: 'inline',
  },
  {
    label: 'italic',
    style: 'ITALIC',
    icon: <FormatItalicIcon />,
    method: 'inline',
  },
  {
    label: 'underline',
    style: 'UNDERLINE',
    icon: <FormatUnderlinedIcon />,
    method: 'inline',
  },
  {
    label: 'strike-through',
    style: 'STRIKETHROUGH',
    icon: <StrikethroughSIcon />,
    method: 'inline',
  },
  {
    label: 'Superscript',
    style: 'SUPERSCRIPT',
    icon: <SuperscriptIcon />,
    method: 'inline',
  },
  {
    label: 'Subscript',
    style: 'SUBSCRIPT',
    icon: <SubscriptIcon />,
    method: 'inline',
  },
  {
    label: 'leftAlign',
    style: 'leftAlign',
    icon: <FormatAlignLeftIcon />,
    method: 'block',
  },
  {
    label: 'centerAlign',
    style: 'centerAlign',
    icon: <FormatAlignCenterIcon />,
    method: 'block',
  },
  {
    label: 'rightAlign',
    style: 'rightAlign',
    icon: <FormatAlignRightIcon />,
    method: 'block',
  },
  {
    label: 'justifyAlign',
    style: 'justifyAlign',
    icon: <FormatAlignJustifyIcon />,
    method: 'block',
  },
  // {
  //   label: 'leftAlign',
  //   style: 'LEFT_ALIGN',
  //   icon: <FormatAlignLeftIcon />,
  //   method: 'inline', // Cambiado a 'inline'
  // },
  // {
  //   label: 'centerAlign',
  //   style: 'CENTER_ALIGN',
  //   icon: <FormatAlignCenterIcon />,
  //   method: 'inline', // Cambiado a 'inline'
  // },
  // {
  //   label: 'rightAlign',
  //   style: 'RIGHT_ALIGN',
  //   icon: <FormatAlignRightIcon />,
  //   method: 'inline', // Cambiado a 'inline'
  // },
  // {
  //   label: 'justifyAlign',
  //   style: 'JUSTIFY_ALIGN',
  //   icon: <FormatAlignJustifyIcon />,
  //   method: 'inline', // Cambiado a 'inline'
  // },
  {
    label: 'unordered-list',
    style: 'unordered-list-item',
    icon: <FormatListBulletedIcon />,
    method: 'block',
  },
  {
    label: 'ordered-list',
    style: 'ordered-list-item',
    icon: <FormatListNumberedIcon />,
    method: 'block',
  },
  // {
  //   label: 'H1',
  //   style: 'HEADER_ONE',
  //   method: 'inline',
  //   icon: <LooksOneIcon />,
  // },
  // {
  //   label: 'H2',
  //   style: 'HEADER_TWO',
  //   method: 'inline',
  //   icon: <LooksTwoIcon />,
  // },
  // {
  //   label: 'H3',
  //   style: 'HEADER_THREE',
  //   method: 'inline',
  //   icon: <LooksThreeIcon />,
  // },
  // {
  //   label: 'H4',
  //   style: 'HEADER_FOUR',
  //   method: 'inline',
  //   icon: <LooksFourIcon />,
  // },
  // {
  //   label: 'H5',
  //   style: 'HEADER_FIVE',
  //   method: 'inline',
  //   icon: <LooksFiveIcon />,
  // },
  // {
  //   label: 'H6',
  //   style: 'HEADER_SIX',
  //   method: 'inline',
  //   icon: <LooksSixIcon />,
  // },
  // {
  //   label: 'H1',
  //   style: 'header-one',
  //   method: 'block',
  //   icon: <LooksOneIcon />,
  // },
  // {
  //   label: 'H2',
  //   style: 'header-two',
  //   method: 'block',
  //   icon: <LooksTwoIcon />,
  // },
  // {
  //   label: 'H3',
  //   style: 'header-three',
  //   method: 'block',
  //   icon: <LooksThreeIcon />,
  // },
  // {
  //   label: 'H4',
  //   style: 'header-four',
  //   method: 'block',
  //   icon: <LooksFourIcon />,
  // },
  // {
  //   label: 'H5',
  //   style: 'header-five',
  //   method: 'block',
  //   icon: <LooksFiveIcon />,
  // },
  // {
  //   label: 'H6',
  //   style: 'header-six',
  //   method: 'block',
  //   icon: <LooksSixIcon />,
  // },
];

export default toolbarItems;
