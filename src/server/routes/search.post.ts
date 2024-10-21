import { defineEventHandler, readBody } from 'h3';
import { search } from'../services/search'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // H3 will return 204 - no content
  if (!body.query) return null;

  return search(body.query);
});
