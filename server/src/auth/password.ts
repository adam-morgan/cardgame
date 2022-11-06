import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, passwordHash: string) => {
    return bcrypt.compare(password, passwordHash);
};
