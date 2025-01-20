// eslint-disable-next-line @typescript-eslint/no-require-imports
const express = require('express');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const cors = require('cors');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock data
let projects = [
  {
    id: 1,
    name: 'Project Alpha',
    description: 'A description of Project Alpha.',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    manager: 'John Doe',
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Project Beta',
    description: 'A description of Project Beta.',
    startDate: '2023-02-01',
    endDate: '2023-10-15',
    manager: 'Jane Smith',
    isFavorite: true,
  },
];

// Inject delay and random errors for demonstration
const delayResponse = (res, data, status = 200) => {
  setTimeout(() => {
    if (Math.random() < 0.2) {
      return res.status(500).json({ error: 'Random API error occurred.' });
    }
    return res.status(status).json(data);
  }, 1000);
};

// Routes

// Get all projects
app.get('/projects', (req, res) => {
  delayResponse(res, projects);
});

// Get project by ID
app.get('/projects/:id', (req, res) => {
  const { id } = req.params;
  const project = projects.find((p) => p.id === parseInt(id, 10));
  if (!project) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  delayResponse(res, project);
});

// Create a new project
app.post('/projects', (req, res) => {
  const { name, description, startDate, endDate, manager } = req.body;
  if (!name || !startDate || !endDate || !manager) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const newProject = {
    id: Date.now(),
    name,
    description,
    startDate,
    endDate,
    manager,
    isFavorite: false,
  };
  projects.push(newProject);
  delayResponse(res, newProject, 201);
});

// Update a project by ID
app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, manager, isFavorite } = req.body;
  const projectIndex = projects.findIndex((p) => p.id === parseInt(id, 10));

  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  const updatedProject = {
    ...projects[projectIndex],
    name,
    description,
    startDate,
    endDate,
    manager,
    isFavorite,
  };

  projects[projectIndex] = updatedProject;
  delayResponse(res, updatedProject);
});

// Delete a project by ID
app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex((p) => p.id === parseInt(id, 10));

  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  projects.splice(projectIndex, 1);
  delayResponse(res, { message: 'Project deleted successfully.' });
});

// Mark a project as favorite/unfavorite
app.post('/projects/:id/favorite', (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex((p) => p.id === parseInt(id, 10));

  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  projects[projectIndex].isFavorite = !projects[projectIndex].isFavorite;
  delayResponse(res, projects[projectIndex]);
});

// Start the mock API server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});

// module.exports = app;
