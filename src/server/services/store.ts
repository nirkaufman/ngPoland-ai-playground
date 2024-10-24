import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import OpenAI from 'openai'

const openAi = new OpenAI();

// Instantiate the OpenAIEmbeddings class with the model you want to use
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

// Instantiate the Chroma class with the embeddings
// url is optional and will default to "http://localhost:8000"
const vectorStore = new Chroma(embeddings, {
  collectionName: "candidate-cv-collection",
});

// utility function to load a single PDF file from file system
// into a LangChainDocument
export const loadFileAsDocumentAndStore = async (filePath: string) => {
  const pdfLoader = new PDFLoader(filePath);

  // create a LangChainDocument from the PDF file
  const document = await pdfLoader.load();

  // add the document to the vector store
  await vectorStore.addDocuments(document);
}

// Utility function to query the vector store
export const queryVectorStore = async (query: string) => {
  const results =  await vectorStore.similaritySearch(query);

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
        Question: ${query}
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


export default vectorStore;
