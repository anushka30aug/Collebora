const emailExistence = require('email-existence');

function CheckEmail(email){
    return new Promise((resolve, reject) => {
        emailExistence.check(email, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports= CheckEmail;
