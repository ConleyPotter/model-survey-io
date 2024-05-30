import customerPersonaGenerator from "./system-input-generator";
import supabase from "../utils/supabase/client";

export default async function generateSystemInputs() {
    const prefix = `You are a spiritual coach and course creator who runs a successful coaching business.`
    
    for(let i = 0; i < 10; i++) {
        const system_msg = prefix.concat(await customerPersonaGenerator());
        const { error } = await supabase
            .from('system_inputs')
            .insert({
                system_msg: system_msg,
            })
        if (error) {
            console.log(error)
        }
    }

    console.log("System inputs generated")
}

generateSystemInputs();

export const suffix1 = `You are now going to answer a series of questions to help an AI model understand 
your brand, target audience, products, and content strategy. Please provide detailed and
 thoughtful responses to each question.`

export const suffix2 = `As you respond to each question, consider how you can best serve your clients 
and create meaningful impact through your offerings. ' + 'We invite you to share insights 
from your perspective as an ideal client in the spiritual coaching or course creation field.`