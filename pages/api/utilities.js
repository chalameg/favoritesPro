// lib/delayResponse.js
export const delayResponse = (res, data, status = 200) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        return res.status(500).json({ error: 'Random API error occurred.' });
      }
      return res.status(status).json(data);
    }, 1000);
  };
  