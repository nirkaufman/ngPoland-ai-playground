import { defineEventHandler, readBody } from 'h3';
import {docQuery} from "../services/docs";
import {queryVectorStore} from "../services/store";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // H3 will return 204 - no content
  if (!body.query) return null;

  // return docQuery(body.query);
  return queryVectorStore(body.query);
});
