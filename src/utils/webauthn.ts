
// WebAuthn utility functions for biometric authentication

export interface BiometricCredential {
  id: string;
  rawId: ArrayBuffer;
  response: AuthenticatorAttestationResponse | AuthenticatorAssertionResponse;
  type: string;
}

// Convert ArrayBuffer to base64url string
export function arrayBufferToBase64url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Convert base64url string to ArrayBuffer
export function base64urlToArrayBuffer(base64url: string): ArrayBuffer {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const paddedBase64 = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
  const binary = atob(paddedBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Generate a random challenge
export function generateChallenge(): ArrayBuffer {
  return crypto.getRandomValues(new Uint8Array(32)).buffer;
}

// Detect if we're in an iframe environment
export function isInIframe(): boolean {
  try {
    return window !== window.top;
  } catch (e) {
    return true; // If we can't access window.top, we're likely in an iframe
  }
}

// Detect if we're in Lovable preview environment
export function isLovablePreview(): boolean {
  return window.location.hostname.includes('lovableproject.com');
}

// Detect mobile device
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Get the appropriate origin for the current environment
function getOrigin(): string {
  return window.location.origin;
}

// Get the RP ID for the current environment
function getRpId(): string {
  const hostname = window.location.hostname;
  // For Lovable preview environment, use the full hostname
  if (hostname.includes('lovableproject.com')) {
    return hostname;
  }
  // For localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return hostname;
  }
  // For production, use the domain
  return hostname;
}

// Check if WebAuthn is supported
export function isWebAuthnSupported(): boolean {
  const isSupported = !!(navigator.credentials && window.PublicKeyCredential);
  console.log('WebAuthn support check:', {
    isSupported,
    hasNavigatorCredentials: !!navigator.credentials,
    hasPublicKeyCredential: !!window.PublicKeyCredential,
    userAgent: navigator.userAgent,
    origin: window.location.origin,
    hostname: window.location.hostname,
    isInIframe: isInIframe(),
    isMobile: isMobileDevice()
  });
  return isSupported;
}

// Check if biometric authentication is available
export async function isBiometricAvailable(): Promise<boolean> {
  if (!isWebAuthnSupported()) {
    console.log('WebAuthn not supported');
    return false;
  }
  
  // If we're in an iframe on mobile in Lovable preview, biometrics won't work
  if (isInIframe() && isMobileDevice() && isLovablePreview()) {
    console.log('Biometric blocked: iframe + mobile + Lovable preview');
    return false;
  }
  
  try {
    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    console.log('Biometric availability check:', {
      available,
      origin: window.location.origin,
      hostname: window.location.hostname,
      isIframe: isInIframe(),
      isMobile: isMobileDevice(),
      isLovablePreview: isLovablePreview()
    });
    return available;
  } catch (error) {
    console.error('Error checking biometric availability:', error);
    return false;
  }
}

// Register biometric credential
export async function registerBiometric(userId: string): Promise<BiometricCredential> {
  if (!isWebAuthnSupported()) {
    throw new Error('WebAuthn is not supported on this device');
  }

  const challenge = generateChallenge();
  const rpId = getRpId();
  
  console.log('Starting biometric registration:', {
    userId,
    rpId,
    origin: getOrigin(),
    isIframe: isInIframe(),
    isMobile: isMobileDevice()
  });
  
  const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
    challenge,
    rp: {
      name: "EduAttend",
      id: rpId,
    },
    user: {
      id: new TextEncoder().encode(userId),
      name: userId,
      displayName: "Student",
    },
    pubKeyCredParams: [
      { alg: -7, type: "public-key" }, // ES256
      { alg: -257, type: "public-key" }, // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "preferred",
      requireResidentKey: false,
    },
    timeout: 300000, // 5 minutes for mobile devices
    attestation: "none",
  };

  try {
    console.log('Creating credential with options:', publicKeyCredentialCreationOptions);
    
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions,
    }) as PublicKeyCredential;

    if (!credential) {
      throw new Error('Failed to create credential');
    }

    console.log('Credential created successfully:', {
      id: credential.id,
      type: credential.type,
      rawIdLength: credential.rawId.byteLength
    });

    return {
      id: credential.id,
      rawId: credential.rawId,
      response: credential.response as AuthenticatorAttestationResponse,
      type: credential.type,
    };
  } catch (error) {
    console.error('Biometric registration failed:', error);
    
    if (error instanceof Error) {
      if (error.name === 'NotAllowedError') {
        if (isInIframe() && isMobileDevice()) {
          throw new Error('Biometric authentication is blocked in this environment. Please open the app in a new tab by tapping the "Open in New Tab" button.');
        } else {
          throw new Error('Biometric registration was cancelled. Please try again and follow your device prompts.');
        }
      } else if (error.name === 'InvalidStateError') {
        throw new Error('A fingerprint for this account already exists. Try authenticating instead.');
      } else if (error.name === 'NotSupportedError') {
        throw new Error('Your device does not support fingerprint authentication.');
      } else if (error.name === 'SecurityError') {
        throw new Error('Security error: Please ensure you are using a secure connection.');
      }
    }
    
    throw new Error('Failed to setup fingerprint authentication. Please ensure your device has a fingerprint scanner and try again.');
  }
}

// Authenticate using biometric
export async function authenticateBiometric(credentialId: string): Promise<BiometricCredential> {
  if (!isWebAuthnSupported()) {
    throw new Error('WebAuthn is not supported on this device');
  }

  const challenge = generateChallenge();
  
  console.log('Starting biometric authentication:', {
    credentialId,
    origin: getOrigin(),
    isIframe: isInIframe(),
    isMobile: isMobileDevice()
  });
  
  const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
    challenge,
    allowCredentials: [
      {
        id: base64urlToArrayBuffer(credentialId),
        type: "public-key",
        transports: ["internal", "hybrid"],
      },
    ],
    userVerification: "preferred",
    timeout: 300000, // 5 minutes for mobile devices
  };

  try {
    console.log('Getting credential with options:', publicKeyCredentialRequestOptions);
    
    const credential = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions,
    }) as PublicKeyCredential;

    if (!credential) {
      throw new Error('Authentication failed');
    }

    console.log('Authentication successful:', {
      id: credential.id,
      type: credential.type
    });

    return {
      id: credential.id,
      rawId: credential.rawId,
      response: credential.response as AuthenticatorAssertionResponse,
      type: credential.type,
    };
  } catch (error) {
    console.error('Biometric authentication failed:', error);
    
    if (error instanceof Error) {
      if (error.name === 'NotAllowedError') {
        if (isInIframe() && isMobileDevice()) {
          throw new Error('Biometric authentication is blocked in this environment. Please open the app in a new tab.');
        } else {
          throw new Error('Biometric authentication was cancelled. Please try again.');
        }
      } else if (error.name === 'InvalidStateError') {
        throw new Error('No registered fingerprint found. Please setup your fingerprint first.');
      } else if (error.name === 'NotSupportedError') {
        throw new Error('Your device does not support fingerprint authentication.');
      } else if (error.name === 'SecurityError') {
        throw new Error('Security error: Please ensure you are using a secure connection.');
      }
    }
    
    throw new Error('Fingerprint authentication failed. Please try again.');
  }
}
