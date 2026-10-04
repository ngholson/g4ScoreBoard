import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Serve static assets from project root
app.use(express.static(__dirname, {
  extensions: ['html', 'htm']
}));

// Route for hotkeys status check to avoid caching issues
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', time: Date.now() });
});

app.listen(PORT, HOST, () => {
  console.log(`g4ScoreBoard server running on http://${HOST}:${PORT}`);
});
