declare global {
    namespace NodeJS {
        interface ProcessEnv {
            OPENAI_API_KEY: string;
            SUPABASE_API_KEY: string;
            SUPABASE_URL: string;
        }
    }
}

export {}