import { v4 as uuidv4 } from 'uuid';

export const generateAlphanumericCode = (length: number = 8): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const generateCode = (type: 'uuid' | 'alphanumeric' = 'uuid'): string => {
    if (type === 'alphanumeric') {
        return generateAlphanumericCode();
    }
    return uuidv4();
};
