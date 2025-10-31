import express from 'express';
import path from 'node:path';

const app = express();
const dist = path.join(process.cwd(), 'dist');
const port = Number(process.argv[2] ?? 4173);

app.use(express.static(dist));
app.get('/*path', (_req, res) => res.sendFile(path.join(dist, 'index.html')));

app.listen(port, () => console.log('Preview on http://localhost:' + port));
