import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of role-based email addresses, used for business purposes
const ROLE_BASED = new Set([
  "admin", "administrator", "webmaster", "hostmaster", "postmaster", "info",
  "contact", "support", "help", "sales", "marketing", "abuse"
]);

// Regex to validate domain
const isValidDomain = (domain) => 
  /^(?!-)[A-Za-z0-9-]+(?<!-)(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(domain);

// Function to categorize the email based on its domain and local part
const categorizeEmail = (localPart, domain, domains) => {
  if (domains.personal.includes(domain)) return "personal";
  if (domains.disposable.includes(domain)) return "disposable";
  if (domains.educational.some(suffix => domain.endsWith(suffix))) return "educational";
  if (ROLE_BASED.has(localPart.toLowerCase())) return "business";
  return "unknown";
};

// Main email verification function
const verifyEmail = async (email) => {
  // Read domain data from the domains.json file
  const domainsPath = path.join(__dirname, "domains.json");
  const domainsData = await fs.readFile(domainsPath, "utf8");
  const domains = JSON.parse(domainsData);

  // Basic email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { isValid: false, category: "unknown", reason: "Invalid email format" };
  }

  const [localPart, domain] = email.split("@");

  // Check for valid
  if (localPart.length > 64 || domain.length > 255 || !isValidDomain(domain)) {
    return { isValid: false, category: "unknown", reason: "Invalid local part or domain" };
  }
  // Check for invalid characters
  if (email.includes("..") || /[()<>,;:\\\\"\\[\\]]/.test(localPart)) {
    return { isValid: false, category: "unknown", reason: "Invalid characters in email" };
  }
  // Check if the domain is blacklisted
  if (domains.blacklisted.includes(domain)) {
    return { isValid: false, category: "unknown", reason: "Blacklisted domain" };
  }
  // Categorize the email based on its domain and local part
  const category = categorizeEmail(localPart, domain, domains);

  // If it's a disposable email address, reject it
  if (category === "disposable") {
    return { isValid: false, category, reason: "Disposable email addresses are not allowed" };
  }
  // Return the final result if everything is valid
  return { isValid: true, category };
};

// Export the function for external use
export { verifyEmail };
