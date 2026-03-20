import { betterAuth } from 'better-auth';
import { anonymous } from 'better-auth/plugins';
import { Pool } from 'pg';
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: new Pool({
        host: process.env.POSTGRES_HOST!,
        port: 6543,
        database: process.env.POSTGRES_DB!,
        user: process.env.POSTGRES_USER!,
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
        nextCookies(),
    ],
    session: {
        expiresIn: 60 * 60 * 24 * 30, // 30日
    }
});