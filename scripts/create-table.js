const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://bktqkbrddbtgkxrlbiwv.supabase.co',
  process.env.SERVICE_ROLE_KEY
);

const sql = `
  CREATE TABLE IF NOT EXISTS messages (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
`;

(async () => {
  const res = await fetch('https://bktqkbrddbtgkxrlbiwv.supabase.co/sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SERVICE_ROLE_KEY}`,
      'apikey': process.env.SERVICE_ROLE_KEY
    },
    body: JSON.stringify({ query: sql })
  });
  const text = await res.text();
  console.log('Status:', res.status, text);
})();
