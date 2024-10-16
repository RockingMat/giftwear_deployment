// server.js

import express from 'express';
import Airtable from 'airtable';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS to allow requests from the React frontend
app.use(cors());

// Airtable configuration
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appOGVFN0HbzbUzbV');

// API endpoint to get Upperwear items
app.get('/api/Upperwear', (req, res) => {
  let allRecords = [];

  base('New Upperwear')
    .select({
      view: 'Grid view',
    })
    .eachPage(
      function page(records, fetchNextPage) {
        allRecords = [...allRecords, ...records];
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          res.status(500).send('Error fetching data from Airtable');
        } else {
          res.json(allRecords);
        }
      }
    );
});

// API endpoint to get Lowerwear items
app.get('/api/Lowerwear', (req, res) => {
  let allRecords = [];

  base('New Lowerwear')
    .select({
      view: 'Grid view',
    })
    .eachPage(
      function page(records, fetchNextPage) {
        allRecords = [...allRecords, ...records];
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          res.status(500).send('Error fetching data from Airtable');
        } else {
          res.json(allRecords);
        }
      }
    );
});


// API endpoint to get catalog items
app.get('/api/Footwear', (req, res) => {
  let allRecords = [];

  base('New Footwear')
    .select({
      view: 'Grid view',
    })
    .eachPage(
      function page(records, fetchNextPage) {
        allRecords = [...allRecords, ...records];
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          res.status(500).send('Error fetching data from Airtable');
        } else {
          res.json(allRecords);
        }
      }
    );
});

// API endpoint to get celebrity data
app.get('/api/celebrities', (req, res) => {
  let allRecords = [];

  base('Celebrity')
    .select({
      view: 'Grid view',
    })
    .eachPage(
      function page(records, fetchNextPage) {
        allRecords = [...allRecords, ...records];
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          res.status(500).send('Error fetching data from Airtable');
        } else {
          res.json(allRecords);
        }
      }
    );
});

// Wrap the Express app with serverless
const handler = serverless(app);

// Export the serverless handler
export default handler;

// Keep the local development server
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
