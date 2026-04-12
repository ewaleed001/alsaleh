// Script to create an admin user in Supabase
// Run with: node create-admin.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cxdnzvvqqgcvdloiapuf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZG56dnZxcWdjdmRsb2lhcHVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM4NDI4MiwiZXhwIjoyMDg4OTYwMjgyfQ.YKL9G5IuSiOGksncbTPfEhEKzPHHdCCA_bLOeAI2eM8';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createAdmin() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@alsaleh-gr.com',
    password: 'Admin@2024',
    email_confirm: true,
  });

  if (error) {
    console.error('Error creating admin user:', error.message);
  } else {
    console.log('Admin user created successfully!');
    console.log('Email: admin@alsaleh-gr.com');
    console.log('Password: Admin@2024');
    console.log('User ID:', data.user.id);
  }
}

createAdmin();
