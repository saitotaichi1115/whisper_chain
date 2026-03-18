import { betterAuth } from 'better-auth';
import { anonymous } from 'better-auth/plugins';
import { Pool } from 'pg';

export const auth = betterAuth({
    database: new Pool({
        host: process.env.POSTGRES_HOST!,     // db.[project-ref].supabase.co
        port: 6543,                           // Supabaseは通常5432
        database: process.env.POSTGRES_DB!,   // postgres（デフォルト）
        user: process.env.POSTGRES_USER!,     // postgres
        password: process.env.POSTGRES_PASSWORD!,
        ssl: {
            ca: Buffer.from(process.env.SUPABASE_CA_BASE64!, 'base64').toString(),
            rejectUnauthorized: true,
        },
    }),
    emailAndPassword: {
        enabled: false,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
        twitter: {
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
        },
    },
    plugins: [
        anonymous(),
    ],
    session: {
        expiresIn: 60 * 60 * 24 * 30, // 30日
    }
});