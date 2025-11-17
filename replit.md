# ESP32-CAM Live Stream Server

## Overview
Express.js server that receives images from an ESP32-CAM and displays them as a live stream in the browser.

## Architecture
- **Backend**: Node.js + Express server
- **Image Upload**: Multer for handling multipart form data
- **Storage**: In-memory buffer (stores latest frame only)
- **Frontend**: Simple HTML page that auto-refreshes the image

## Recent Changes (Nov 17, 2025)
- Updated server to use in-memory storage instead of file system
- Changed upload field name from "file" to "frame" to match ESP32 code
- Added both /latest.jpg and /stream.jpg endpoints for image serving
- Configured for Render deployment with PORT environment variable
- Added cache-control headers to prevent image caching

## Deployment
- Hosted on Render at: https://threed-printer-cam.onrender.com
- ESP32 uploads to: https://threed-printer-cam.onrender.com/upload
- Automatically deploys from GitHub on push

## Project Structure
```
server/
├── index.js          # Main server file (ES modules)
├── server.js         # Alternative server (CommonJS, not used)
├── package.json      # Dependencies
└── public/
    └── index.html    # Frontend viewer
```

## Endpoints
- `POST /upload` - Receives image from ESP32-CAM (field name: "frame")
- `GET /latest.jpg` - Returns the most recent image
- `GET /stream.jpg` - Alternative endpoint for the latest image
- `GET /` - Main viewer page
