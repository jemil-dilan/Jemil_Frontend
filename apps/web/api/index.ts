import { handle } from "hono/vercel";

// @ts-ignore -- Hono app instance built by `react-router build`
import server from "../build/server/index.js";

const honoHandler = handle(server);

export default async function handler(request: Request) {
  return honoHandler(request);
}

export const GET = honoHandler;
export const POST = honoHandler;
export const PUT = honoHandler;
export const PATCH = honoHandler;
export const DELETE = honoHandler;
export const HEAD = honoHandler;
export const OPTIONS = honoHandler;