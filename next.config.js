/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    connectionString: "mongodb://localhost/giftme",
    secret:
      "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
    publicSecret:
      "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
    nonProtectedApiRoutes: [
      "/api/business/register",
      "/api/business/authenticate",
      "/api/charity/register",
      "/api/charity/authenticate",
      "/api/giftCard",
      "/api/giftCard/create",
      "/api/businessBox",
      "/api/businessBox/create",
      "/api/businessBox/addGiftCard",
      "/api/business/delete",
    ],
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "http://localhost:3000/api", // production api
  },
};

module.exports = nextConfig;
