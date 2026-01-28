import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const initDb = async () => {
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      mobile_number TEXT NOT NULL,
      email_id TEXT NOT NULL,
      college_name TEXT NOT NULL,
      degree_dept TEXT NOT NULL,
      year_of_study TEXT NOT NULL,
      skills TEXT,
      career_goal TEXT NOT NULL,
      agreed_to_updates BOOLEAN NOT NULL,
      is_selected BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    INSERT INTO site_settings (key, value) VALUES ('registration_open', 'true') ON CONFLICT (key) DO NOTHING;
    INSERT INTO site_settings (key, value) VALUES ('max_registrations', '100') ON CONFLICT (key) DO NOTHING;
  `;
  try {
    await query(createTablesQuery);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  }
};
