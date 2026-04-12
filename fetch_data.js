
const https = require('https');

const SUPABASE_URL = 'https://zrwpkyjsnpfekymtmmhm.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3BreWpzbnBmZWt5bXRtbWhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMTgyNjYsImV4cCI6MjA5MTU5NDI2Nn0.Le-lFFMSm30_k_4MIgEoBdiKlqIqgOQ455DAjkPV8dY';

const tables = ['team_members', 'news', 'projects', 'site_settings'];

async function fetchData(table) {
  return new Promise((resolve, reject) => {
    const url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
    const options = {
      headers: {
        'apikey': KEY,
        'Authorization': `Bearer ${KEY}`
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', (err) => reject(err));
  });
}

async function main() {
  for (const table of tables) {
    try {
      const data = await fetchData(table);
      console.log(`--- TABLE: ${table} ---`);
      console.log(JSON.stringify(data, null, 2));
      console.log('\n');
    } catch (err) {
      console.error(`Error fetching ${table}:`, err.message);
    }
  }
}

main();
