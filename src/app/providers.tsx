'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import React from 'react';

const RECAPTCHA_KEY_ID = '6LeMyxIpAAAAAIgSBtBuI2_MGpbhJKGyw3dfMYTA';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={RECAPTCHA_KEY_ID}
      useRecaptchaNet={false}
      useEnterprise={true}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
