import jwt from "jsonwebtoken";


interface IJwtData {
    uid: number;
}

const sign = (data: IJwtData): string | 'JWT_SECRET_NOT_FOUND' => {
    if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";
    

    return jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "1d" });
};

const verify = (token: string): IJwtData | "JWT_SECRET_NOT_FOUND" | "INVALID_TOKEN" => {
    if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";
try {

    const decoded =jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decoded === "string"){
        return "INVALID_TOKEN";
    };

    return decoded as IJwtData;
} catch (error) {
    return "INVALID_TOKEN";
}
};

export const JWTService = {
    sign,
    verify
}