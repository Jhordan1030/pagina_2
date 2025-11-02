const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Middleware para registrar IP
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const log = `IP: ${ip} - Fecha: ${new Date().toLocaleString()}\n`;
  fs.appendFileSync(path.join(__dirname, 'ips.txt'), log);
  next();
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
