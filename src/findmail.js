import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.ANYMAIL_API_KEY;

if (!API_KEY) {
  console.error("API key is missing! Please check your .env file.");
  process.exit(1);
}

// Function to find email by domain and full name
export async function findEmailByFullName(domain, fullName) {
  try {
    const response = await axios.post(
      `https://api.anymailfinder.com/v5.0/search/person.json`,
      { domain, full_name: fullName },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    const data = response.data;
    if (data.status === "success" && data.result) {
      return {
        email: data.result.email,
        name: data.result.name,
        domain: data.result.domain,
        verificationStatus: data.result.verification.status,
      };
    } else if (data.error === "upgrade_needed") {
      return {
        error: "API Error: Insufficient credits. Please purchase more credits.",
        errorDetails: data.error_explained,
      };
    } else {
      return {
        error: "Email not found or error in response.",
        responseData: data,
      };
    }
  } catch (error) {
    if (error.response) {
      // Check for the specific 402 status code and its message
      if (error.response.status === 402) {
        return {
          error: "API Error: Insufficient credits.",
          errorDetails: error.response.data.error_explained || "Upgrade needed.",
        };
      } else {
        throw new Error(
          `API Error: ${error.response.data} (Status: ${error.response.status})`
        );
      }
    } else if (error.request) {
      throw new Error(`No response received: ${error.request}`);
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
}

// Function to find email by domain and first/last name
export async function findEmailByName(domain, firstName, lastName) {
  try {
    const response = await axios.post(
      `https://api.anymailfinder.com/v5.0/search/person.json`,
      { domain, first_name: firstName, last_name: lastName },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    const data = response.data;
    if (data.status === "success" && data.result) {
      return {
        email: data.result.email,
        name: data.result.name,
        domain: data.result.domain,
        verificationStatus: data.result.verification.status,
      };
    } else if (data.error === "upgrade_needed") {
      return {
        error: "API Error: Insufficient credits. Please purchase more credits.",
        errorDetails: data.error_explained,
      };
    } else {
      return {
        error: "Email not found or error in response.",
        responseData: data,
      };
    }
  } catch (error) {
    if (error.response) {
      // Check for the specific 402 status code and its message
      if (error.response.status === 402) {
        return {
          error: "API Error: Insufficient credits.",
          errorDetails: error.response.data.error_explained || "Upgrade needed.",
        };
      } else {
        throw new Error(
          `API Error: ${error.response.data} (Status: ${error.response.status})`
        );
      }
    } else if (error.request) {
      throw new Error(`No response received: ${error.request}`);
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
}


// Todo: With Console Log Info
// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

// const API_KEY = process.env.ANYMAIL_API_KEY;

// if (!API_KEY) {
//     console.error('API key is missing! Please check your .env file.');
//     process.exit(1);
// }

// // Function to find email by domain and full name using POST request
// async function findEmailByFullName(domain, fullName) {
//     try {
//         const response = await axios.post(`https://api.anymailfinder.com/v5.0/search/person.json`, {
//             domain: domain,
//             full_name: fullName,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${API_KEY}`, // Add the Authorization header here
//             }
//         });

//         const data = response.data;
//         if (data.status === "success" && data.result) {
//             console.log("Email Found:", data.result.email);
//             console.log("Name:", data.result.name);
//             console.log("Domain:", data.result.domain);
//             console.log("Verification Status:", data.result.verification.status);
//         } else {
//             console.log("Email not found or error in response.");
//             console.log("Response Data:", data);
//         }
//     } catch (error) {
//         if (error.response) {
//             // The server responded with a status code that falls out of the range of 2xx
//             console.error("API Error Response:", error.response.data);
//             console.error("Status Code:", error.response.status);
//         } else if (error.request) {
//             console.error("No response received:", error.request);
//         } else {
//             console.error("Error", error.message);
//         }
//     }
// }

// // Function to find email by domain and first/last name using POST request
// async function findEmailByName(domain, firstName, lastName) {
//     try {
//         const response = await axios.post(`https://api.anymailfinder.com/v5.0/search/person.json`, {
//             domain: domain,
//             first_name: firstName,
//             last_name: lastName,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${API_KEY}`, // Add the Authorization header here
//             }
//         });

//         const data = response.data;

//         if (data.status === "success" && data.result) {
//             console.log("Email Found:", data.result.email);
//             console.log("Name:", data.result.name);
//             console.log("Domain:", data.result.domain);
//             console.log("Verification Status:", data.result.verification.status);
//         } else {
//             console.log("Email not found or error in response.");
//         }
//     } catch (error) {
//         if (error.response) {
//             // The server responded with a status code that falls out of the range of 2xx
//             console.error("API Error Response:", error.response.data);
//             console.error("Status Code:", error.response.status);
//         } else if (error.request) {
//             console.error("No response received:", error.request);
//         } else {
//             console.error("Error", error.message);
//         }
//     }
// }

// findEmailByFullName("microsoft.com", "Satya Nadella");
// findEmailByName('microsoft.com', 'Satya', 'Nadella');