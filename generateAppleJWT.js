const jwt = require("jsonwebtoken");
const fs = require("fs");

// Replace with your actual values
const teamId = "8ZJJB7FGT4";
const keyId = "GS28425393";
const clientId = "me.habets.app"; // Your Bundle ID
const privateKeyPath = "./AuthKey_XXXXXXXXXX.p8";


// Read the private key
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

// Create the JWT payload
const payload = {
  iss: teamId, // Issuer (Team ID)
  iat: Math.floor(Date.now() / 1000), // Issued at (current time)
  exp: Math.floor(Date.now() / 1000) + 15777000, // Expiry (6 months)
  aud: "https://appleid.apple.com", // Audience
  sub: clientId, // Subject (Service ID)
};

// Generate the JWT
const token = jwt.sign(payload, privateKey, {
  algorithm: "ES256",
  keyid: keyId,
});

console.log("Generated Apple Sign-In JWT:\n", token);
