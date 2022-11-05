const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export const isEmailValid = (email: string) => {
    return email != null &&
        emailRegex.test(email);
};

export const isUsernameValid = (username: string) => {
    if (username.length < 3 || username.length > 25) {
        return false;
    }

    return /^[a-zA-Z0-9]*$/.test(username);
};

export const getValidUsernameDescription = () => {
    return 'Username must be between 3 to 25 characters long and contain only letters and numbers.';
};

export const isPasswordValid = (password: string) => {
    if (password.length < 8) {
        return false;
    }

    return /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

export const getValidPasswordDescription = () => {
    return 'Password must be at least 8 characters long and contain a lowercase letter, an uppercase letter, and a number.';
};
