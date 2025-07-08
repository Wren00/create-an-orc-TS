interface Prompt {
    promptId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}

interface CreatePrompt {
    content: string;
}

interface UpdatePrompt {
    promptId: number;
    content?: string;
    updatedAt: Date;
    isDeleted?: boolean;
}


export { Prompt, CreatePrompt, UpdatePrompt };
