export interface Prompt {
    promptId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatePrompt {
    content: string;
}

export interface UpdatePrompt {
    promptId: number;
    content: string;
}
