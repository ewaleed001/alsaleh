
const https = require('https');

const SUPABASE_URL = 'https://cxdnzvvqqgcvdloiapuf.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZG56dnZxcWdjdmRsb2lhcHVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM4NDI4MiwiZXhwIjoyMDg4OTYwMjgyfQ.YKL9G5IuSiOGksncbTPfEhEKzPHHdCCA_bLOeAI2eM8';

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
