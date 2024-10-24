import 'dotenv/config'
import {MemoryVectorStore} from 'langchain/vectorstores/memory'
import {OpenAIEmbeddings} from "@langchain/openai";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import {DirectoryLoader} from "langchain/document_loaders/fs/directory";
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters";
import OpenAI from 'openai'
import * as path from "path";

// set working directory
const dir = path.join(path.dirname(process.cwd()), 'playground', 'src', 'uploads');
const openAi = new OpenAI();

// DirectoryLoader will load all the documents in the
// specified directory.
const directoryLoader = new DirectoryLoader(
  dir,
  {
    ".pdf": (path: string) => new PDFLoader(path),
  }
);

// RecursiveCharacterTextSplitter will split the text
// into smaller chunks
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const loadDocs = async () => {
  return await directoryLoader.load();
}

const splitDocs = async () => {
  const docs = await loadDocs();
  return await textSplitter.splitDocuments(docs);
}

// we will use the MemoryVectorStore to store the documents
// and the OpenAIEmbeddings to vectorize the text
const loadStore = async () => {
  const docs = await splitDocs();
  return MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings())
}

export const docQuery = async (userPrompt: string) => {
  const store = await loadStore()
  const results = await store.similaritySearch(userPrompt, 1)

  const response = await openAi.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      {
        role: 'assistant',
        content:
          'You are a helpful AI HR assistant. Answer questions to your best ability.',
      },
      {
        role: 'user',
        content: `
        Answer the following question using the provided context. If you cannot answer the question with the context,
        don't lie and make up stuff. Just say you need more context.
        Provide as many details as possible. expect a "skills" section on provided context.
        Question: ${userPrompt}
        Context: ${results.map((r) => r.pageContent).join('\n')}
        `,
      },
    ],
  })

  return {
    answer: response.choices[0].message.content,
    sources: results.map((r) => r.metadata['source']),
  }
}
