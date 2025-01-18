import { verifyEmail } from './src/verifymail.js';
import { findEmailByFullName, findEmailByName } from './src/findmail.js';

async function EmailVerification(testEmail) {
    try {
        const result = await verifyEmail(testEmail);
        if (result.isValid) {
            console.log(`\nPassed: Verification Result for ${testEmail}:`, result);
        } else {
            console.log(`\nFailed: Verification Result for ${testEmail}:`, result);
        }
    } catch (error) {
        console.error('\nError verifying email:', error.message);
    }
}

async function findEmailByFullNameHandle(domain, fullName) {
    try {
        const result = await findEmailByFullName(domain, fullName);
        if (result) {
            console.log(`\nPassed: Result from Full Name (${fullName}):`, result);
        } else {
            console.log(`\nFailed: Result from Full Name (${fullName}): Not found`);
        }
    } catch (error) {
        console.error('\nError finding email by full name:', error.message);
    }
}

async function findEmailByNameHandle(domain, firstName, lastName) {
    try {
        const result = await findEmailByName(domain, firstName, lastName);
        if (result) {
            console.log(`\nPassed: Result from Name (${firstName} ${lastName}):`, result);
        } else {
            console.log(`\nFailed: Result from Name (${firstName} ${lastName}): Not found`);
        }
    } catch (error) {
        console.error('\nError finding email by name:', error.message);
    }
}

// !User Inputs
// const testEmail = "fake@tempmail.com";
// EmailVerification(testEmail);

// const domain = 'microsoft.com';
// const fullName = 'Satya Nadella';
// findEmailByFullNameHandle(domain, fullName);

// const firstName = 'Sundar';
// const lastName = 'Pichai';
// findEmailByNameHandle(domain, firstName, lastName);
