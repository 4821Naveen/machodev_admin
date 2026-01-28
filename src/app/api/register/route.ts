import { NextResponse } from 'next/server';
import { query, initDb } from '../../../lib/database';

export async function GET() {
    try {
        await initDb();
        const countRes = await query('SELECT COUNT(*) FROM registrations');
        const settingsRes = await query('SELECT * FROM site_settings');
        const settings: any = {};
        settingsRes.rows.forEach(row => { settings[row.key] = row.value; });

        return NextResponse.json({
            count: parseInt(countRes.rows[0].count),
            registrationOpen: settings.registration_open === 'true',
            maxRegistrations: parseInt(settings.max_registrations)
        });
    } catch (err: any) {
        console.error('Registration status fetch error:', err);
        const errorDetail = err.code ? `${err.code}: ${err.message || 'Connection Refused'}` : err.message;
        return NextResponse.json({ error: 'Failed to fetch status', details: errorDetail }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const {
        fullName,
        mobile,
        email,
        college,
        degree,
        year,
        skills,
        careerGoal,
        agreed
    } = body;

    try {
        await initDb();

        // Check settings
        const settingsRes = await query('SELECT * FROM site_settings');
        const settings: any = {};
        settingsRes.rows.forEach(row => { settings[row.key] = row.value; });

        if (settings.registration_open !== 'true') {
            return NextResponse.json({ error: 'Registration is closed by Admin' }, { status: 403 });
        }

        const countRes = await query('SELECT COUNT(*) FROM registrations');
        const currentCount = parseInt(countRes.rows[0].count);
        const maxCount = parseInt(settings.max_registrations);

        if (currentCount >= maxCount) {
            return NextResponse.json({ error: 'Registration limit reached (100 students)' }, { status: 403 });
        }

        if (!fullName || !mobile || !email || !college || !degree || !careerGoal) {
            return NextResponse.json({ error: 'Missing mandatory fields' }, { status: 400 });
        }

        const result = await query(
            `INSERT INTO registrations 
      (full_name, mobile_number, email_id, college_name, degree_dept, year_of_study, skills, career_goal, agreed_to_updates)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
            [fullName, mobile, email, college, degree, year, skills, careerGoal, agreed]
        );
        return NextResponse.json({ message: 'Registration successful', data: result.rows[0] }, { status: 201 });
    } catch (err: any) {
        console.error('Registration error:', err);
        const errorDetail = err.code ? `${err.code}: ${err.message || 'Connection Refused'}` : err.message;
        return NextResponse.json({ error: 'Internal server error', details: errorDetail }, { status: 500 });
    }
}
