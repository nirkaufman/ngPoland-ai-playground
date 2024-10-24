import { defineEventHandler, readMultipartFormData } from 'h3';
import { promises as fs } from 'fs';
import * as path from 'path';
import {loadFileAsDocumentAndStore} from "../services/store";

export default defineEventHandler(async (event: any) => {
  const body = await readMultipartFormData(event);

  if (body && body.length > 0) {
    const file = body[0];
    const filePath = path.join(process.cwd(), 'src', 'uploads', file.filename!);

    await fs.writeFile(filePath, file.data);

    // load the file into the store
    await loadFileAsDocumentAndStore(filePath);
  }

  return { message: 'File uploaded successfully' };
});
