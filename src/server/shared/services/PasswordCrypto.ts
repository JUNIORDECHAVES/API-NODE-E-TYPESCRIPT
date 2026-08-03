import  { compare, genSalt, hash } from "bcryptjs";

const hashPassword = async (password: string) => {
    const saltRounds = 12;
    const saltGenerated = await genSalt(saltRounds);

    const hashedPassword = await hash(password, saltGenerated);

    return hashedPassword
};

const verifyPassword = async (password: string, hashedPassword: string) => {
    const isPasswordValid = await compare(password, hashedPassword);

    return isPasswordValid;
};

export const PasswordCrypto =  {
    hashPassword,
    verifyPassword
};