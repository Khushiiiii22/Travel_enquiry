/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  console.log('=== Initializing Nilhans Travels Full-Stack Server ===');
  
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Render compatibility: server health checking
  app.get('/api/health', (req, res) => {
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV || 'development'
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    console.log('--- DEVELOPMENT MODE: Loading Vite asset middleware ---');
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
      console.log('Vite middleware mounted successfully on Express.');
    } catch (viteMountError) {
      console.error('FATAL ERROR: Failed to instantiate Vite middleware server:', viteMountError);
      throw viteMountError;
    }
  } else {
    console.log('--- PRODUCTION MODE: Static file server active ---');
    const distPath = path.join(process.cwd(), 'dist');
    console.log(`Serving builds from absolute location: ${distPath}`);
    
    app.use(express.static(distPath));

    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Listening according to standard Render specifications
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 Nilhans Travels server is running successfully on port ${PORT}`);
    console.log(`Local Access: http://localhost:${PORT}`);
  }).on('error', (expressBindErr: any) => {
    console.error('❌ PORT BINDING ERROR (Startup Failed):', expressBindErr);
    process.exit(1);
  });
}

startServer().catch((fatalStartupErr) => {
  console.error('❌ CRITICAL STARTUP FAILURE DURING LIFECYCLE INITIALIZATION:', fatalStartupErr);
  process.exit(1);
});
