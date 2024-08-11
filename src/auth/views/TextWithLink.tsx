import React from 'react';
import { Typography, Link } from '@mui/material';

interface TextWithLinkProps {
  mainText: string;
  linkText: string;
  linkHref: string;
}

const TextWithLink: React.FC<TextWithLinkProps> = ({
  mainText,
  linkText,
  linkHref,
}) => {
  return (
    <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
      {mainText}{' '}
      <Link
        href={linkHref}
        underline="hover"
        sx={{ fontWeight: 'bold', color: 'primary.main' }}
      >
        {linkText}
      </Link>
    </Typography>
  );
};

export default TextWithLink;
