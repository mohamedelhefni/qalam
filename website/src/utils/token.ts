export const generateUserToken = () => {
    const timestamp = new Date().getTime(); // Current timestamp
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // Random string
    const hash = timestamp.toString() + randomString; // Combine timestamp and random string
    const token = btoa(hash); // Encode the string to base64 to create the token
    return token;
}


