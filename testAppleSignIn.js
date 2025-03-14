import * as AppleAuthentication from 'expo-apple-authentication';

async function testAppleSignIn() {
    try {
        const response = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
        });

        console.log("Apple ID Token:", response.identityToken);
    } catch (error) {
        console.error("Apple Sign-In Error:", error);
    }
}

testAppleSignIn();
