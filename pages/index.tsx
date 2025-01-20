import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Favorite, FavoriteBorder, Add } from '@mui/icons-material';
import { Project } from '../types/project';
import { FavoriteContext } from '@/store/FavoriteContext';
import Link from 'next/link';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toggleFavorite } = useContext(FavoriteContext);

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
        setProjects(response.data);
      } catch (err: any) {
        console.log(err)
        setError('Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle navigation to the Create page
  const handleCreate = () => {
    router.push('/create');
  };

  // Handle navigation to the Edit page
  const handleEdit = (id: number) => {
    router.push(`/edit/${id}`);
  };

  // Handle favorite toggle
  const handleToggleFavorite = (project: Project) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/projects/${project.id}/favorite`)
      .then(() => {
        toggleFavorite(project);
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, isFavorite: !p.isFavorite } : p))
        );
      })
      .catch(() => setError('Failed to toggle favorite.'));
  };

  // Loading and error states
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Project List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleCreate}
        sx={{ marginBottom: 2 }}
      >
        Create New Project
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Id</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Link href={`/detail/${project.id}`}>
                    {project.id}
                  </Link>

                </TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.startDate}</TableCell>
                <TableCell>{project.endDate}</TableCell>
                <TableCell>{project.manager}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleToggleFavorite(project)}
                    aria-label="favorite"
                  >
                    {project.isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                  </IconButton>
                  

                  <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(project.id)}
                          >
                            Edit
                          </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectList;
