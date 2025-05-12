import React from "react";

export default function CompanyPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Company</h1>
      <p className="mb-4">Rankify is an independent technology company dedicated to making educational data accessible, transparent, and actionable for everyone in India.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Our Mission</h2>
      <p className="mb-4">To empower students, educators, and institutions with reliable data and tools for informed decision-making.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Our Values</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Transparency</li>
        <li>Innovation</li>
        <li>Inclusivity</li>
        <li>Integrity</li>
      </ul>
    </div>
  );
}
