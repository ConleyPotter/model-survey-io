import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import surveyQuestions from "../survey-questions.json";
import { LocalFileCache } from "langchain/cache/file_system";
import supabase from "../utils/supabase/client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export default async function surveyResponseGenerator(): Promise<string> {
    const cache = await LocalFileCache.create();

    const model = new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-3.5-turbo",
        temperature: 1.1,
        maxTokens: 4095,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0.21,
        cache: cache,
    });

    const { data, error } = await supabase
        .from("system_inputs")
        .select("system_msg")

    for (let i = 0; i < data!.length; i++) {
        const system_msg = data![i].system_msg;
        
    }

    const surveyPrompt = await ChatPromptTemplate.fromMessages([
        [
            "system",
            `You are a spiritual coach who runs a successful coaching business. 
            Your mission is to help people improve their spiritual lives and develop themselves in various ways. 
            You offer a range of services, including energy healing, reiki, and spiritual guidance. 
            Your clients are individuals seeking deeper connections with themselves and the universe. 
            You have a unique brand voice that is compassionate, insightful, and empowering. 
            You are now going to answer a series of questions to help an AI model understand your brand, target audience, products, and content strategy. 
            Please provide detailed and thoughtful responses to each question.
            Wrap the output in "json" tags\n{format_instructions}`,
        ],
        ["human", "{query}"],
    ]).partial({
        format_instructions: formatInstructions,
    })
    
    // const messageHistories: Record<string, InMemoryChatMessageHistory> = {};
    
    const query: SurveyQuestion = {
        question_topic: surveyQuestions["understanding your brand"][1].topic, 
        question_number: surveyQuestions["understanding your brand"][1].number,
        question: surveyQuestions["understanding your brand"][1].question,
    }
    
    const queryString = JSON.stringify(query);
    
    const chain = surveyPrompt.pipe(model).pipe(parser);

    const response = await chain.invoke({ query: queryString });
}