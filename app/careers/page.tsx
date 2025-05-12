import React from "react";

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Careers</h1>
      <p className="mb-4">Join Rankify and help shape the future of educational data in India. We are always looking for talented, passionate people!</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Open Positions</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Frontend Developer (React/Next.js)</li>
        <li>Backend Developer (Node.js, MongoDB)</li>
        <li>Data Analyst</li>
        <li>Community Manager</li>
      </ul>
      <p className="mb-4">To apply, send your resume and a short introduction to <a href="mailto:careers@rankify.in" className="text-primary underline">careers@rankify.in</a></p>
    </div>
  );
}
