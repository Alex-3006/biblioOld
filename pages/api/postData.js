/* eslint-disable import/no-anonymous-default-export */
import fs from 'fs/promises';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = req.body; // Data sent by the client

      // Write data to the JSON file
      await fs.writeFile('pages/api/lend.json', JSON.stringify(data));

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Error writing to the file' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
