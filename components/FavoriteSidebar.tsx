import React, { useContext } from 'react';
import { List, ListItem, ListItemText, Drawer, Typography } from '@mui/material';
import { FavoriteContext } from '@/store/FavoriteContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FavoriteSidebar: React.FC = () => {
  const { favorites } = useContext(FavoriteContext) || { favorites: [] };
  const router = useRouter();

  const goToDetailPage = (id: number) => {
    router.push(`/detail/${id}`);  
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Typography variant="h6" sx={{ padding: 2, cursor:'pointer' }}>
        <Link href={'/'}>Favorite Projects</Link>
      </Typography>
      <List>
        {favorites.map((project) => (
        <ListItem key={project.id} onClick={() => goToDetailPage(project.id)}>
          <ListItemText primary={project.name} />
        </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default FavoriteSidebar;
