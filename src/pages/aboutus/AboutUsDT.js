import React from 'react';
import logoImage from '../images/ab1.jpg';
import { Box, Typography } from "@mui/material";

export default function AboutUsDT() {
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
          background: 'rgba(255, 255, 255, 0.5)',
        }}
      />
      {/* Text on the left side */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '10%', // Adjust left position as needed
          transform: 'translateY(-50%)',
          textAlign: 'left',
          color: '#000', // Adjust text color as needed
        }}
      >
        <Typography variant="h4" sx={{color:'antiquewhite',ml:'380px',fontFamily:'monospace',fontSize:'69px'}}>About Us</Typography>
        <Typography variant="body1" sx={{color:'black',mt:'100px',fontFamily:'monospace',fontSize:'20px'}}>
        Welcome to Movie Reviews! We are passionate about cinema and dedicated to providing you with insightful reviews, recommendations, and discussions on the latest movies. Whether you're a casual moviegoer or a cinephile, our goal is to help you make informed decisions about what to watch next. Our team of reviewers watches a wide range of films across genres and provides unbiased critiques to help you discover your next favorite movie. Stay tuned for regular updates, top 10 lists, and special features as we explore the world of cinema together.
        </Typography>
      </Box>
    </Box>
  );
}
