import Link from 'next/link';
import React from 'react';

export default function RecaptchaNotice() {
  return (
    <div className="text-xs leading-none text-gray-400">
      This site is protected by reCAPTCHA and the Google{' '}
      <Link
        href="https://policies.google.com/privacy"
        target="_blank"
        className="hover:underline"
      >
        Privacy Policy
      </Link>{' '}
      and{' '}
      <Link
        href="https://policies.google.com/terms"
        target="_blank"
        className="hover:underline"
      >
        Terms of Service
      </Link>{' '}
      apply.
    </div>
  );
}
