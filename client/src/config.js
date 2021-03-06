const apiurl = process.env.REACT_APP_API;
const siteurl = process.env.REACT_APP_SITE;

const dev = {
  STRIPE_KEY: "pk_test_v1amvR35uoCNduJfkqGB8RLD",
  s3: {
    REGION: "us-west-2",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-6wbhcogxihbo"
  },
  apiGateway: {
    REGION: "us-west-2",
    // URL: "https://api.serverless-stack.seed-demo.club/dev"
    URL: apiurl,
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_9YvQL51n3",
    APP_CLIENT_ID: "5b4hk15eol41apunttm71o7rmp",
    IDENTITY_POOL_ID: "us-west-2:4954c07f-9234-47c1-bc30-d0d88f511c28"
  },
  oauth: {
    domain: 'wiabapp.auth.us-west-2.amazoncognito.com',
    scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: siteurl+'',
    redirectSignOut: siteurl+'',
    responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
  }
};

// const prod = {
//   STRIPE_KEY: "pk_test_v1amvR35uoCNduJfkqGB8RLD",
//   s3: {
//     REGION: "us-west-2",
//     BUCKET: "notes-app-2-api-prod-attachmentsbucket-1h5n5ttet1hy0"
//   },
//   apiGateway: {
//     REGION: "us-west-2",
//     URL: "https://api.serverless-stack.seed-demo.club/prod"
//   },
//   cognito: {
//     REGION: "us-west-2",
//     USER_POOL_ID: "us-west-2_TwYpMXIJH",
//     APP_CLIENT_ID: "6kfg0o7qo2i3ndk2ur906sc5fd",
//     IDENTITY_POOL_ID: "us-west-2:f4c754b4-24f0-4754-8596-30afedece1fc"
//   }
// };

// Default to dev if not set
// const config = process.env.REACT_APP_STAGE === 'prod'
//   ? prod
//   : dev;
const config = dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
