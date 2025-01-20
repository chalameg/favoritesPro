import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';

const CreateProject: React.FC = () => {
  const router = useRouter();

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    manager: '',
  });

  // State for loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/projects', formData);
      console.log('Project created:', response.data);
      router.push('/'); // Redirect to the project list page
    } catch (err) {
      setError('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Project
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Project Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleInputChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleInputChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Project Manager"
          name="manager"
          value={formData.manager}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: 3 }}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push('/')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Create Project'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateProject;
