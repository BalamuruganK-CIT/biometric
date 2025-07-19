
import { useState, useEffect } from "react";
import { Fingerprint, CheckCircle, XCircle, Loader2, AlertTriangle, ExternalLink, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  isWebAuthnSupported, 
  isBiometricAvailable, 
  registerBiometric, 
  authenticateBiometric,
  arrayBufferToBase64url,
  isInIframe,
  isMobileDevice,
  isLovablePreview
} from "@/utils/webauthn";

interface BiometricScannerProps {
  onScanComplete: (success: boolean) => void;
  disabled?: boolean;
}

type ScanState = 'checking' | 'unsupported' | 'iframe-blocked' | 'setup' | 'ready' | 'scanning' | 'success' | 'failed';

export function BiometricScanner({ onScanComplete, disabled = false }: BiometricScannerProps) {
  const [scanState, setScanState] = useState<ScanState>('checking');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      console.log('Checking biometric support...');
      
      if (!isWebAuthnSupported()) {
        setScanState('unsupported');
        setErrorMessage('Your browser does not support biometric authentication');
        return;
      }

      // Special handling for mobile devices in Lovable preview iframe
      if (isInIframe() && isMobileDevice() && isLovablePreview()) {
        setScanState('iframe-blocked');
        setErrorMessage('Biometric authentication requires opening the app in a new tab on mobile devices');
        return;
      }

      const biometricAvailable = await isBiometricAvailable();
      if (!biometricAvailable) {
        setScanState('unsupported');
        setErrorMessage('No fingerprint scanner detected on this device');
        return;
      }

      const existingCredential = localStorage.getItem('biometric_credential_id');
      if (existingCredential) {
        setScanState('ready');
      } else {
        setScanState('setup');
      }
    } catch (error) {
      console.error('Error checking biometric support:', error);
      setScanState('unsupported');
      setErrorMessage('Unable to check biometric support');
    }
  };

  const setupBiometric = async () => {
    if (disabled) return;
    
    setScanState('scanning');
    setErrorMessage('');

    try {
      const userId = `student_${Date.now()}`;
      
      toast({
        title: "Setting up Fingerprint",
        description: "Please use your fingerprint when prompted by your device.",
      });

      const credential = await registerBiometric(userId);
      
      const credentialId = arrayBufferToBase64url(credential.rawId);
      localStorage.setItem('biometric_credential_id', credentialId);
      localStorage.setItem('biometric_user_id', userId);

      setScanState('success');
      toast({
        title: "Fingerprint Setup Complete",
        description: "Your fingerprint has been registered successfully.",
      });

      setTimeout(() => {
        setScanState('ready');
      }, 2000);

    } catch (error) {
      console.error('Biometric setup failed:', error);
      setScanState('failed');
      setErrorMessage(error instanceof Error ? error.message : 'Setup failed');
      
      toast({
        title: "Setup Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });

      setTimeout(() => setScanState('setup'), 3000);
    }
  };

  const startAuthentication = async () => {
    if (disabled) return;
    
    const credentialId = localStorage.getItem('biometric_credential_id');
    if (!credentialId) {
      setScanState('setup');
      return;
    }

    setScanState('scanning');
    setErrorMessage('');

    try {
      toast({
        title: "Authenticating",
        description: "Please use your fingerprint to verify your identity.",
      });

      await authenticateBiometric(credentialId);
      
      setScanState('success');
      toast({
        title: "Authentication Successful",
        description: "Your attendance has been recorded.",
      });

      setTimeout(() => onScanComplete(true), 1500);

    } catch (error) {
      console.error('Biometric authentication failed:', error);
      setScanState('failed');
      setErrorMessage(error instanceof Error ? error.message : 'Authentication failed');
      
      toast({
        title: "Authentication Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });

      setTimeout(() => setScanState('ready'), 3000);
    }
  };

  const openInNewTab = () => {
    const currentUrl = window.location.href.replace('?forceHideBadge=true', '');
    window.open(currentUrl, '_blank');
  };

  const getScannerColor = () => {
    switch (scanState) {
      case 'checking':
      case 'scanning': return 'text-warning';
      case 'success': return 'text-success';
      case 'failed':
      case 'unsupported':
      case 'iframe-blocked': return 'text-destructive';
      case 'setup': return 'text-primary';
      default: return 'text-primary';
    }
  };

  const getScannerIcon = () => {
    switch (scanState) {
      case 'checking':
      case 'scanning': return <Loader2 className="animate-spin" />;
      case 'success': return <CheckCircle />;
      case 'failed': return <XCircle />;
      case 'iframe-blocked': return <Smartphone />;
      case 'unsupported': return <AlertTriangle />;
      default: return <Fingerprint />;
    }
  };

  const getTitle = () => {
    switch (scanState) {
      case 'checking': return "Checking Device Support";
      case 'unsupported': return "Fingerprint Not Available";
      case 'iframe-blocked': return "Open in New Tab Required";
      case 'setup': return "Setup Fingerprint";
      case 'ready': return "Ready to Scan";
      case 'scanning': return localStorage.getItem('biometric_credential_id') ? "Authenticating..." : "Setting up...";
      case 'success': return "Authentication Successful";
      case 'failed': return "Authentication Failed";
    }
  };

  const getDescription = () => {
    switch (scanState) {
      case 'checking': return "Verifying fingerprint scanner availability...";
      case 'unsupported': return errorMessage || "This device does not have a working fingerprint scanner";
      case 'iframe-blocked': return "For security reasons, fingerprint authentication must be used in a direct browser window";
      case 'setup': return "Register your fingerprint to enable secure attendance marking";
      case 'ready': return "Tap the button and use your fingerprint to mark attendance";
      case 'scanning': return localStorage.getItem('biometric_credential_id') ? "Place your finger on the scanner" : "Follow your device's prompts to register your fingerprint";
      case 'success': return "Attendance marked successfully";
      case 'failed': return errorMessage || "Please try again";
    }
  };

  const getButtonText = () => {
    switch (scanState) {
      case 'iframe-blocked': return "Open in New Tab";
      case 'setup': return "Setup Fingerprint";
      case 'ready': return "Use Fingerprint";
      case 'scanning': return "Scanning...";
      case 'success': return "Completed";
      case 'failed': return "Try Again";
      default: return "Not Available";
    }
  };

  const handleButtonClick = () => {
    if (scanState === 'iframe-blocked') {
      openInNewTab();
    } else if (scanState === 'setup') {
      setupBiometric();
    } else if (scanState === 'ready') {
      startAuthentication();
    } else if (scanState === 'failed') {
      const credentialId = localStorage.getItem('biometric_credential_id');
      setScanState(credentialId ? 'ready' : 'setup');
    }
  };

  const isButtonDisabled = () => {
    return disabled || 
           scanState === 'checking' || 
           scanState === 'scanning' || 
           scanState === 'success' || 
           scanState === 'unsupported';
  };

  return (
    <Card className="p-8 text-center bg-gradient-to-br from-card to-muted/20 border-2">
      <div className="space-y-6">
        <div className={`w-32 h-32 mx-auto rounded-full border-4 border-dashed ${getScannerColor()} flex items-center justify-center transition-all duration-300 ${scanState === 'scanning' ? 'animate-pulse' : ''}`}>
          <div className="text-6xl">
            {getScannerIcon()}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {getTitle()}
          </h3>
          <p className="text-muted-foreground">
            {getDescription()}
          </p>
        </div>

        <Button 
          onClick={handleButtonClick}
          disabled={isButtonDisabled()}
          size="lg"
          className="w-full"
          variant={scanState === 'unsupported' ? 'destructive' : 'default'}
        >
          {scanState === 'scanning' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {getButtonText()}
            </>
          ) : scanState === 'success' ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              {getButtonText()}
            </>
          ) : scanState === 'iframe-blocked' ? (
            <>
              <ExternalLink className="mr-2 h-4 w-4" />
              {getButtonText()}
            </>
          ) : scanState === 'unsupported' ? (
            <>
              <AlertTriangle className="mr-2 h-4 w-4" />
              {getButtonText()}
            </>
          ) : (
            <>
              <Fingerprint className="mr-2 h-4 w-4" />
              {getButtonText()}
            </>
          )}
        </Button>

        {scanState === 'iframe-blocked' && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-start gap-3">
              <Smartphone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-primary mb-1">
                  Mobile Fingerprint Detected
                </p>
                <p className="text-xs text-muted-foreground">
                  Your device has a fingerprint scanner, but biometric authentication is restricted in preview environments. 
                  Tap "Open in New Tab" above to use your fingerprint scanner in a direct browser window.
                </p>
              </div>
            </div>
          </div>
        )}

        {scanState === 'unsupported' && !isInIframe() && (
          <div className="mt-4 p-3 bg-destructive/10 rounded-lg">
            <p className="text-sm text-destructive">
              To use fingerprint attendance, please access this system from a device with a working fingerprint scanner 
              (modern smartphones or laptops with fingerprint readers).
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
