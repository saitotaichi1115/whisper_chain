import { betterAuth } from 'better-auth';
import { anonymous } from 'better-auth/plugins';
import { Pool } from 'pg';

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.aiartgame_POSTGRES_URL!,
        ssl: {
            rejectUnauthorized: true,
            ca: process.env.CERTIFICATE,
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