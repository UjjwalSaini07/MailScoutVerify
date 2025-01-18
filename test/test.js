// import { findEmailByFullName, findEmailByName } from '../src/findmail.js';

// async function main() {
//     try {
//         const emailByFullName = await findEmailByFullName('microsoft.com', 'Satya Nadella');
//         console.log('Result from Full Name:', emailByFullName);

//         const emailByName = await findEmailByName('google.com', 'Sundar', 'Pichai');
//         console.log('Result from Name:', emailByName);
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// }

// main();

// const { verifyEmail } = require("./verifyEmail");
import { verifyEmail } from '../src/verifymail.js';

(async () => {
    try {
        const result = await verifyEmail("test@gmail.com");
        console.log("Verification Result for test@gmail.com:", result);
        // Expected Output: { isValid: true, category: "personal" }
    } catch (error) {
        console.error("Error verifying email (test@gmail.com):", error.message);
    }

    try {
        const disposableResult = await verifyEmail("fake@tempmail.com");
        console.log("Verification Result for fake@tempmail.com:", disposableResult);
        // Expected Output: { isValid: false, category: "disposable", reason: "Disposable email addresses are not allowed" }
    } catch (error) {
        console.error("Error verifying email (fake@tempmail.com):", error.message);
    }
})();
