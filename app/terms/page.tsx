import React from "react";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">By using Rankify, you agree to these Terms of Service. Please read them carefully.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Service</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Use Rankify for lawful purposes only</li>
        <li>Do not misuse or attempt to disrupt the platform</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Accounts</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Provide accurate information when creating an account</li>
        <li>You are responsible for your account security</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
      <p className="mb-4">Rankify is provided "as is" without warranties. We are not liable for any damages arising from use of the platform.</p>
      <p className="text-muted-foreground text-sm">For questions, contact us at legal@rankify.in</p>
    </div>
  );
}
