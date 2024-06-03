import { ChatOpenAI } from "@langchain/openai";
import { 
    ChatPromptTemplate, 
    FewShotChatMessagePromptTemplate,
} from "@langchain/core/prompts";

import { prompts, examplesObject } from "./few-shot-examples";

export default async function customerPersonaGenerator(questionTopic: string): Promise<string> {
    const model = new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-3.5-turbo",
        temperature: 1.2,
        topP: 1,
        frequencyPenalty: 0.25,
        presencePenalty: 0.25,
    });
    
    const examplePrompt = ChatPromptTemplate.fromMessages([
        ["human", "{input}"],
        ["ai", "{output}"],
    ]);

    let examples: { input: string, output: string }[] = [];
    let prompt: string = "";

    switch (questionTopic) {
        case "products and services": {
            examples = examplesObject.productsAndServicesExample;
            prompt = prompts.productsAndServices;
            break;
        }
        case "ideal clients": {
            examples = examplesObject.idealClientsExample;
            prompt = prompts.idealClients;
            break;
        }
        case "brand": {
            examples = examplesObject.brandExample;
            prompt = prompts.brand;
            break;
        }
        case "mission": {
            examples = examplesObject.missionExample;
            prompt = prompts.mission;
            break;
        }
        case "values": {
            examples = examplesObject.valuesExample;
            prompt = prompts.values;
            break;
        }
        case "goals": {
            examples = examplesObject.goalsExample;
            prompt = prompts.goals;
            break;
        }
        default: {
            throw new Error("Invalid question topic");
        }
    }

    const fewShotPrompt: ChatPromptTemplate = new FewShotChatMessagePromptTemplate({
        examplePrompt,
        examples,
        inputVariables: [],
    }) as unknown as ChatPromptTemplate;

    const finalPrompt = ChatPromptTemplate.fromMessages([
        ["system", "You are an AI prompt engineer"],
        fewShotPrompt,
        ["human", "{input}"],
    ]);

    const chain = finalPrompt.pipe(model);

    const response = await chain.invoke({ input: prompt });

    return response.content as string;
}