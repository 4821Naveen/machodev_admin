import { NextResponse } from 'next/server';
import { query, initDb } from '../../../lib/database';

export async function GET() {
    try {
        await initDb();
        const regs = await query('SELECT * FROM registrations ORDER BY created_at DESC');
        const settingsRes = await query('SELECT * FROM site_settings');
        const settings: any = {};
        settingsRes.rows.forEach(row => { settings[row.key] = row.value; });

        return NextResponse.json({
            registrations: regs.rows,
            settings: settings
        });
    } catch (err: any) {
        console.error('Admin API fetch error:', err);
        const errorDetail = err.code ? `${err.code}: ${err.message || 'Connection Refused'}` : err.message;
        return NextResponse.json({ error: 'Failed to fetch data', details: errorDetail }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const body = await request.json();
    const { action, value } = body;

    try {
        if (action === 'TOGGLE_REGISTRATION') {
            await query('UPDATE site_settings SET value = $1 WHERE key = \'registration_open\'', [value]);
            return NextResponse.json({ message: 'Registration status updated' });
        }

        if (action === 'SELECT_WINNERS') {
            await query('UPDATE registrations SET is_selected = FALSE');
            const result = await query(
                'UPDATE registrations SET is_selected = TRUE WHERE id IN (SELECT id FROM registrations ORDER BY RANDOM() LIMIT 5) RETURNING *'
            );
            return NextResponse.json({ message: 'Winners selected', winners: result.rows });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (err: any) {
        console.error('Admin action error:', err);
        return NextResponse.json({ error: 'Failed to perform action' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const action = searchParams.get('action');

    try {
        if (action === 'DELETE_ALL') {
            await query('DELETE FROM registrations');
            return NextResponse.json({ message: 'All registrations deleted' });
        }

        if (id) {
            await query('DELETE FROM registrations WHERE id = $1', [id]);
            return NextResponse.json({ message: 'Registration deleted' });
        }

        return NextResponse.json({ error: 'Missing ID or action' }, { status: 400 });
    } catch (err: any) {
        console.error('Delete error:', err);
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}
