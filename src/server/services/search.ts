import 'dotenv/config'
import { Document } from 'langchain/document'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from "@langchain/openai";
import prisma from "../utils/db";
import {Candidate} from "@prisma/client";

const createStore = async () => {
  const candidates = await prisma.candidate.findMany();

  return MemoryVectorStore.fromDocuments(
    candidates.map(
      (c: Candidate) =>
        new Document({
          pageContent: `Bio: ${c.bio}`,
          metadata: { email: c.email, name: c.name },
        })
    ),
    new OpenAIEmbeddings()
  )
}

export const search = async (query: string, count: number = 2) => {
  const store = await createStore();
  return store.similaritySearch(query, count);
}
