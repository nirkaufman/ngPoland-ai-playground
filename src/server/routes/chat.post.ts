import { defineEventHandler, readBody } from 'h3';
import { getChatResponse } from'../services/chat'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return getChatResponse(body.message);
});
