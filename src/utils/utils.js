import crypto from 'crypto';

export const hashPassword = (plainPassword) => {
    return crypto.createHash('md5').update(plainPassword).digest('hex');
}