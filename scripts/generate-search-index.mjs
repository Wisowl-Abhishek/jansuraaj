import fs from 'fs';
import path from 'path';
import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function generateSearchIndex() {
    console.log('Generating search index for static semantic matching...');
    try {
        const query = `
            SELECT role, location
            FROM jobs
            WHERE status = 'open'
              AND role IS NOT NULL
              AND location IS NOT NULL
            GROUP BY role, location
            ORDER BY 
              CASE WHEN LOWER(role) LIKE '%python%' THEN 0 ELSE 1 END,
              COUNT(*) DESC
            LIMIT 5000
        `;
        const result = await pool.query(query);

        const indexData = result.rows.map(row => {
            const r = row.role || '';
            const l = row.location || '';

            const rawSlug = l ? `${r}-${l}` : r;
            let cleanSlug = rawSlug
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');

            if (cleanSlug.length > 200) {
                cleanSlug = cleanSlug.substring(0, 200).replace(/-+$/, '');
            }

            return {
                role: r,
                location: l,
                slug: cleanSlug
            };
        });

        const publicDir = path.resolve(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        fs.writeFileSync(
            path.join(publicDir, 'search-index.json'),
            JSON.stringify(indexData)
        );
        console.log(`✅ Search index generated with ${indexData.length} semantic entries.`);
    } catch (e) {
        console.error('Failed to generate search index:', e);
    } finally {
        await pool.end();
    }
}

generateSearchIndex();
