import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"
import { OpenAIEmbeddings } from "@langchain/openai"
import supabase from "../../utils/supabase/client"

async function query() {
    const vectorStore = await SupabaseVectorStore.fromExistingIndex(new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY,
    }), {
        client: supabase,
        tableName: 'documents',
        queryName: "match_documents",
    });

    const result = await vectorStore.similaritySearch('competitors', 20, {
        question: "What makes your offerings unique or different from competitors?",
    });

    console.log(result);
}

async function run() {
    await query();
}

run();