import bcrypt from 'bcryptjs';

// Hash a password
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12); // Using promise-based version
        const hashedPassword = await bcrypt.hash(password, salt); // Using promise-based version
        return hashedPassword;
    } catch (err) {
        throw err;
    }
};

// Compare a password with a hashed password
const comparePassword = async (password, hashed) => {
    try {
        const isMatch = await bcrypt.compare(password, hashed); // Using promise-based version
        return isMatch;
    } catch (err) {
        throw err;
    }
};

export { hashPassword, comparePassword };


