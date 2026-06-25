declare global {
    namespace Express {
        interface Request {
            authenticated?: boolean;
        }
    }
}

export {};