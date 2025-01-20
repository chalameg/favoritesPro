// pages/api/projects/[id]/favorite.js
export default function handler(req, res) {
    const { id } = req.query;
  
    const projects = [
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
  
    const projectIndex = projects.findIndex((p) => p.id === parseInt(id, 10));
  
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found.' });
    }
  
    // Toggle the favorite status
    projects[projectIndex].isFavorite = !projects[projectIndex].isFavorite;
  
    setTimeout(() => {
      if (Math.random() < 0.2) {
        return res.status(500).json({ error: 'Random API error occurred.' });
      }
      return res.status(200).json(projects[projectIndex]);
    }, 1000);
  }
  