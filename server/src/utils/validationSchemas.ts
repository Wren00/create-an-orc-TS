import Joi from 'joi';
import {Role} from "@prisma/client";

export const validationSchemas = {
    createUser: {
        body: Joi.object({
            userName: Joi.string().required(),
            emailAddress: Joi.string().email().required(),
            userPassword: Joi.string().min(6).required()
        })
    },
    updateUser: {
        body: Joi.object({
            userId: Joi.number().required(),
            userName: Joi.string().optional(),
            emailAddress: Joi.string().email().optional(),
            userPassword: Joi.string().min(6).required().optional()
        })
    },
    updateUserAsAdmin: {
        body: Joi.object({
            userId: Joi.number().required(),
            userName: Joi.string().optional(),
            emailAddress: Joi.string().email().optional(),
            userPassword: Joi.string().min(6).required().optional(),
            availableTokens: Joi.number().optional(),
            role: Joi.object(Role).optional()
        })
    },
    createOrc: {
        body: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            promptsCollectionId: Joi.number().required(),
            orcImagesId: Joi.number().required(),
            userId: Joi.number().required()
        })
    },
    createPrompt: {
        body: Joi.object({
            content: Joi.string().required()
        })
    },
    updatePrompt: {
        body: Joi.object({
            promptId: Joi.number().required(),
            content: Joi.string().required()
        })
    }
};