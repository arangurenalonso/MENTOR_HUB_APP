import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';

const BrandName = 'Mentor HUB';
const durationIn = 1;
const startTransitionIn = (durationIn * 3) / 5;
const durationOut = 2;
const startTransitionOut = (durationIn * 3) / 5;

const InitComponent = () => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 }); // repeatDelay para dar un respiro entre repeticiones

    tl.fromTo(
      '.brand-name-1',
      { x: -1000, y: 1000, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: durationIn, ease: 'power4.out' }
    )
      .fromTo(
        '.brand-name-2',
        { x: 1000, y: 500, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: durationIn, ease: 'power4.out' },
        `-=${startTransitionIn}` // Comienza antes para que la transición sea más fluida
      )
      .fromTo(
        '.brand-name-3',
        { x: 1000, y: -1000, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: durationIn, ease: 'power4.out' },
        `-=${startTransitionIn}`
      )
      .fromTo(
        '.brand-name-4',
        { x: -1000, y: -500, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: durationIn, ease: 'power4.out' },
        `-=${startTransitionIn}`
      )
      .fromTo(
        '.brand-name-5',
        { x: 0, y: -1000, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: durationIn, ease: 'power4.out' },
        `-=${startTransitionIn}`
      )
      .to('.brand-name-5', {
        x: 0,
        y: -1000,
        opacity: 0,
        duration: durationOut,
        ease: 'power4.in',
      })
      .to(
        '.brand-name-4',
        {
          x: -1000,
          y: -500,
          opacity: 0,
          duration: durationOut,
          ease: 'power4.in',
        },
        `-=${startTransitionOut}`
      )
      .to(
        '.brand-name-3',
        {
          x: 1000,
          y: -1000,
          opacity: 0,
          duration: durationOut,
          ease: 'power4.in',
        },
        `-=${startTransitionOut}`
      )
      .to(
        '.brand-name-2',
        {
          x: 1000,
          y: 500,
          opacity: 0,
          duration: durationOut,
          ease: 'power4.in',
        },
        `-=${startTransitionOut}`
      )
      .to(
        '.brand-name-1',
        {
          x: -1000,
          y: 1000,
          opacity: 0,
          duration: durationOut,
          ease: 'power4.in',
        },
        `-=${startTransitionOut}`
      );
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Typography
          key={index}
          variant="h2"
          className={`brand-name brand-name-${index + 1}`}
          sx={{
            position: 'absolute',
            color: '#fff',
          }}
        >
          {BrandName}
        </Typography>
      ))}
    </Box>
  );
};

export default InitComponent;
