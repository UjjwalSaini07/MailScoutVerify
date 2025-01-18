import { findEmailByFullName, findEmailByName } from '../src/findmail.js';

async function main() {
    try {
        const emailByFullName = await findEmailByFullName('microsoft.com', 'Satya Nadella');
        console.log('Result from Full Name:', emailByFullName);

        const emailByName = await findEmailByName('google.com', 'Sundar', 'Pichai');
        console.log('Result from Name:', emailByName);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();


// import { verifyEmail } from '../src/verifymail.js';

// (async () => {
//   const result = await verifyEmail("test@gmail.com");
//   console.log(result);
//   // Output: { isValid: true, category: "personal" }

//   const disposableResult = await verifyEmail("fake@tempmail.com");
//   console.log(disposableResult);
//   // Output: { isValid: false, category: "disposable", reason: "Disposable email addresses are not allowed" }
// })();