import React, { createContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';
import { Project } from '../types/project';

interface FavoriteContextType {
  favorites: Project[];
  setFavorites: Dispatch<SetStateAction<Project[]>>;
  toggleFavorite: (project: Project) => void;
}

const defaultValue: FavoriteContextType = {
  favorites: [],
  setFavorites: () => {
    throw new Error('setFavorites must be used within a FavoriteProvider');
  },
  toggleFavorite: () => {
    throw new Error('toggleFavorite must be used within a FavoriteProvider');
  },
};

export const FavoriteContext = createContext<FavoriteContextType>(defaultValue);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Project[]>([]);

  const toggleFavorite = (project: Project) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === project.id)
        ? prev.filter((fav) => fav.id !== project.id)
        : [...prev, project]
    );
  };

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
