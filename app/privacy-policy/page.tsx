import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how Rankify collects, uses, and protects your information when you use our platform.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Personal information (name, email) when you sign up</li>
        <li>Usage data (pages visited, preferences)</li>
        <li>Cookies and similar technologies</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Information</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To provide and improve our services</li>
        <li>To personalize your experience</li>
        <li>To communicate updates and offers</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Access, update, or delete your data</li>
        <li>Opt out of marketing communications</li>
      </ul>
      <p className="text-muted-foreground text-sm">For questions, contact us at privacy@rankify.in</p>
    </div>
  );
}
