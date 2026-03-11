import { Redis } from '@upstash/redis';

export const redis = new Redis({
    url: process.env.upstash_whisper_chain_KV_REST_API_URL || '',
    token: process.env.upstash_whisper_chain_KV_REST_API_TOKEN || '',
});
