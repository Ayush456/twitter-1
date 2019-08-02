const sha1 = require('sha1');

const generateUserId = (userName,userDob) => {
    const dob = userDob.trim().split('-').join('');
    const name = userName.trim();
    return sha1(name+dob);
};

const generatePasswordHash = (password) => sha1(password);

module.exports = {
    generateUserId : generateUserId,
    generatePasswordHash : generatePasswordHash
}