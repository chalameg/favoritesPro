import React, { useState, useEffect } from 'react';
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

const EditProject: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Assuming the project ID is in the URL

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    manager: '',
  });

  // State for loading, error, and fetching data
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch the existing project details when the component mounts
  useEffect(() => {
    if (!id) return; // Wait for the project ID to be available
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/projects/${id}`);
        setFormData(response.data); // Populate the form with the fetched data
      } catch (err: any) {
        console.log(err)
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:3001/projects/${id}`,
        formData
      );
      console.log('Project updated:', response.data);
      router.push('/'); // Redirect to the project list page
    } catch (err) {
      setError('Failed to update project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Project
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
            disabled={saving}
          >
            {saving ? <CircularProgress size={24} /> : 'Update Project'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProject;
