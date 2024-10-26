import { defineEventHandler, readBody } from 'h3';
import { startConversation } from'../services/tools'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // H3 will return 204 - no content
  if (!body.query) return null;

  return startConversation(body.query);
});
