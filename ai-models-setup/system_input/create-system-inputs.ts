import customerPersonaGenerator from "./system-input-generator";
import { authenticated_supabase, signInWithEmail, signOut } from "../../utils/supabase/client";
import { users } from "../../data/dummy-users";
import { PostgrestError } from "@supabase/supabase-js";

export default async function generateSystemInputs() {
    const prefix = `You are a spiritual coach and course creator who runs a successful coaching business.`

    const suffix = `You are now going to answer a series of questions to help me understand 
        your business. Please provide detailed and thoughtful responses to each question. 
        As you respond to each question, consider how you can best serve your clients 
        and create meaningful impact through your offerings. I invite you to share insights 
        from your perspective as an ideal client in the spiritual coaching or course creation field.`

    const topics = [
        "products and services",
        "ideal clients",
        "brand",
        "mission",
        "values",
        "goals"
    ]

    users.forEach(async ({ email, password }) => {
        topics.forEach(async (topic) => {
            await signInWithEmail(email, password);

            const system_msg = prefix.concat(await customerPersonaGenerator(topic)).concat(suffix);

            topic = topic.replace(/ /g, "_");

            let error: PostgrestError | null = null;

            switch (topic) {
                case "products_and_services":
                    ({ error } = await authenticated_supabase
                        .from('system_inputs')
                        .insert({
                            products_and_services: system_msg  
                        }))
                    break;
                case "ideal_clients":
                    ({ error } = await authenticated_supabase
                        .from('system_inputs')
                        .insert({
                            ideal_clients: system_msg  
                        }))
                    break;
                case "brand":
                    ({ error } = await authenticated_supabase
                        .from('system_inputs')
                        .insert({
                            brand: system_msg  
                        }))
                    break;
                case "mission":
                    ({ error } = await authenticated_supabase
                        .from('system_inputs')
                        .insert({
                            mission: system_msg  
                        }))
                    break;
                case "values":
                    ({ error } = await authenticated_supabase
                        .from('system_inputs')
                        .insert({
                            values: system_msg  
                        }))
                    break;
                case "goals":
                    ({ error } = await authenticated_supabase
                        .from('system_inputs')
                        .insert({
                            goals: system_msg  
                        }))
                    break;
                default:
                    throw new Error("Invalid question topic");
            }
            if (error) {
                console.log(error)
            }
        });

        await signOut();
    });

    console.log("System inputs generated");
}

generateSystemInputs();

