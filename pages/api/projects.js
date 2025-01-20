// pages/api/projects.js
export default function handler(req, res) {
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
  
    const delayResponse = (data, status = 200) => {
      setTimeout(() => {
        if (Math.random() < 0.2) {
          return res.status(500).json({ error: 'Random API error occurred.' });
        }
        return res.status(status).json(data);
      }, 1000);
    };
  
    if (req.method === 'GET') {
      delayResponse(projects);
    } else if (req.method === 'POST') {
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
      delayResponse(newProject, 201);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  