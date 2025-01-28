import { customAlphabet } from "nanoid";

export function generateVerificationCode() {
    const generateCode = customAlphabet("123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 13);
    
    return generateCode()
}