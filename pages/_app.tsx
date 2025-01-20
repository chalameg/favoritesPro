import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { CssBaseline, useMediaQuery, Drawer, AppBar, Toolbar, Typography, Box } from '@mui/material';
import FavoriteSidebar from '@/components/FavoriteSidebar';
import { FavoriteProvider } from '@/store/FavoriteContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is 600px or less (mobile view)

  return (
    <FavoriteProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: isMobile ? 'column' : 'row' }}>
        {/* Sidebar for Desktop and AppBar for Mobile */}
        {isMobile ? (
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6">Favorites</Typography>
            </Toolbar>
          </AppBar>
        ) : (
          <FavoriteSidebar />
        )}

        {/* Main Content */}
        <main style={{ flexGrow: 1, padding: '1rem' }}>
          <Component {...pageProps} />
        </main>
      </Box>
    </FavoriteProvider>
  );
};

export default MyApp;
