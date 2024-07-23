import React from 'react'
import logoImage from './pages/images/reviews.png';
import { Box } from "@mui/material";

export default function WelcomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(${logoImage})`,
        backgroundSize: 'cover',
        filter: 'blur(-0px)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.3)',
        }}
      />
      </Box>
  )
}
