import { styled } from '@mui/material/styles';
import { TooltipProps, Tooltip, tooltipClasses } from '@mui/material';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.divider || '#dadde9'}`,
  },
}));

export default HtmlTooltip;
