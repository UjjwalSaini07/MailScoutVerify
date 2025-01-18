import { verifyEmail } from './src/verifymail.js';
import { findEmailByFullName, findEmailByName } from './src/findmail.js';

(async () => {
    try {
        
        console.log('\n---Verify The EMail---');
        const testEmail = "test@gmail.com";
        const testEmailResult = await verifyEmail(testEmail);
        if (testEmailResult.isValid) {
            console.log(`Passed: Verification Result for ${testEmail}:`, testEmailResult);
        } else {
            console.log(`Failed: Verification Result for ${testEmail}:`, testEmailResult);
        }

        const disposableEmail = "fake@tempmail.com";
        const disposableEmailResult = await verifyEmail(disposableEmail);
        if (!disposableEmailResult.isValid) {
            console.log(`Passed: Verification Result for ${disposableEmail}:`, disposableEmailResult);
        } else {
            console.log(`Failed: Verification Result for ${disposableEmail}:`, disposableEmailResult);
        }

        console.log('\n---Find The EMail---');
        const emailByFullName = await findEmailByFullName('microsoft.com', 'Satya Nadella');
        if (emailByFullName) {
            console.log('Passed: Result from Full Name:', emailByFullName);
        } else {
            console.log('Failed: Result from Full Name: Not found');
        }

        const emailByName = await findEmailByName('google.com', 'Sundar', 'Pichai');
        if (emailByName) {
            console.log('Passed: Result from Name:', emailByName);
        } else {
            console.log('Failed: Result from Name: Not found');
        }
    } catch (error) {
        console.error('Error: Failed due to', error.message);
    }
})();
