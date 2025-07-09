interface Prompt {
    promptId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

interface CreatePrompt {
    content: string;
}

interface UpdatePrompt {
    promptId: number;
    content: string;
}


export { Prompt, CreatePrompt, UpdatePrompt };
