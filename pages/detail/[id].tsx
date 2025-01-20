import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';

const ProjectDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Assuming the project ID is in the URL

  // State for project data and loading/error
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the project details when the component mounts
  useEffect(() => {
    if (!id) return; // Wait for the project ID to be available
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/projects/${id}`);
        setProject(response.data); // Populate the project state with the fetched data
      } catch (err: any) {
        console.log(err)
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!project) {
    return <Alert severity="info">Project not found.</Alert>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto 0', padding: 3 }} >
      <Typography variant="h4" gutterBottom>
        Project Details
      </Typography>

      <Box sx={{ marginBottom: 3 }} display={'flex'} alignItems={'center'} gap={'20px'}>
        <Typography variant="h6">Project Name:</Typography>
        <Typography>{project.name}</Typography>
      </Box>

      <Box sx={{ marginBottom: 3 }} display={'flex'} alignItems={'center'} gap={'20px'}>
        <Typography variant="h6">Project Description:</Typography>
        <Typography>{project.description}</Typography>
      </Box>

      <Box sx={{ marginBottom: 3 }} display={'flex'} alignItems={'center'} gap={'20px'}>
        <Typography variant="h6">Start Date:</Typography>
        <Typography>{project.startDate}</Typography>
      </Box>

      <Box sx={{ marginBottom: 3 }} display={'flex'} alignItems={'center'} gap={'20px'}>
        <Typography variant="h6">End Date:</Typography>
        <Typography>{project.endDate}</Typography>
      </Box>

      <Box sx={{ marginBottom: 3 }} display={'flex'} alignItems={'center'} gap={'20px'}>
        <Typography variant="h6">Project Manager:</Typography>
        <Typography>{project.manager}</Typography>
      </Box>

      <Box display="flex" justifyContent="flex-start" gap={"30px"}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push(`/`)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push(`/edit/${id}`)}
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectDetail;
