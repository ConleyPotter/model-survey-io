import { OpenAIEmbeddings } from '@langchain/openai';
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import supabase, { signInWithEmail, signOut } from '../../utils/supabase/client';
import fetchResponsesForUser from './fetch-responses-for-user';

// Function to generate vector embeddings document for each survey response
export default async function generateVectorStore(user): Promise<SupabaseVectorStore> {
    try {
        await signInWithEmail(user.email, user.password);
        const surveyResponses = await fetchResponsesForUser(user);

        // Create vector embeddings document for each survey response
        const embeddings = new OpenAIEmbeddings({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const vectorStore = await SupabaseVectorStore.fromTexts(
            surveyResponses!.map((responseObject): string => {
                return responseObject.answer!
            }),
            surveyResponses!.map(responseObject => {
                return {
                    response_id: responseObject.id!,
                    question: responseObject.question!,
                    created_at: responseObject.created_at!,
                    question_number: responseObject.question_number!,
                }
            }),
            embeddings,
            {
                client: supabase,
                tableName: "documents",
                queryName: "match_documents"
            }
        )
            
        await signOut();

        console.log('Vector embeddings generation completed!');
        return vectorStore;

    } catch (error) {
        throw new Error(error);
    }
}