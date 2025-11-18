/**
 * AWS Amplify Configuration for Attunio Mobile
 * Connects to existing AWS Cognito user pool
 */

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID || '',
      userPoolClientId: process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID || '',
      signUpVerificationMethod: 'code' as const,
      loginWith: {
        email: true,
      },
    }
  },
  API: {
    REST: {
      'AttunioAPI': {
        endpoint: process.env.EXPO_PUBLIC_API_URL || '',
        region: process.env.EXPO_PUBLIC_AWS_REGION || 'us-east-1',
      }
    }
  }
};

export { amplifyConfig };
