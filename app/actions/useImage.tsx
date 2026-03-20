"use server"
import { put } from "@vercel/blob";
//試合中に生成した画像について扱う関数をここに書く

//画像をAPIを使用して生成
export async function createImage(prompt: string, model: string = "@cf/black-forest-labs/flux-1-schnell", steps: number = 4) {
    const response = await fetch("https://oekakiworkersapi.saitotaichi-1115.workers.dev/api/generate-image", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.CLOUDFLARE_AI_API_KEY!,
        },
        body: JSON.stringify({
            prompt,
            model,
            steps,
        }),
    });
    const data = await response.blob();
    return data;
}

export async function saveImage(image: Blob, roomId: string, chainId: number, playerId: string) {
    const blob = await put(`images/${roomId}/${chainId}/${playerId}.png`, image, {
        access: "public",
        token: process.env.ai_artgame_READ_WRITE_TOKEN,
    });
    return blob.url;
}

export async function createAndSaveImage(prompt: string, roomId: string, chainId: number, playerId: string) {
    const image = await createImage(prompt);
    const imageUrl = await saveImage(image, roomId, chainId, playerId);
    return imageUrl;
}
