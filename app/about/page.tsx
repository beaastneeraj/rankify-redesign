import React from "react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="mb-4">Rankify was founded to bring clarity and transparency to the world of educational rankings in India. Our platform is built by a passionate team of engineers, data scientists, and educators.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">What We Do</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Aggregate and analyze official ranking data</li>
        <li>Provide customizable ranking tools</li>
        <li>Promote data-driven decision making</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-4">For media, partnership, or general inquiries, email us at <a href="mailto:info@rankify.in" className="text-primary underline">info@rankify.in</a></p>
    </div>
  );
}
