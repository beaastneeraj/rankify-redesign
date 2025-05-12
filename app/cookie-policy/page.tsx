import React from "react";

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      <p className="mb-4">Rankify uses cookies to enhance your experience. This Cookie Policy explains what cookies are and how we use them.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">What Are Cookies?</h2>
      <p className="mb-4">Cookies are small text files stored on your device to help websites remember information about your visit.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Cookies</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To remember your preferences</li>
        <li>To analyze site usage and improve our services</li>
        <li>For authentication and security</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Managing Cookies</h2>
      <p className="mb-4">You can control cookies through your browser settings. Disabling cookies may affect your experience on Rankify.</p>
      <p className="text-muted-foreground text-sm">For questions, contact us at privacy@rankify.in</p>
    </div>
  );
}
