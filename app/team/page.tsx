import React from "react";

const team = [
  { name: "Neeraj Kumar", role: "Founder & Lead Developer" },
  { name: "Aditya Chandanshive", role: "Backend Developer" },
  { name: "Girish Kumar", role: "Frontend Developer" },
];

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Our Team</h1>
      <p className="mb-6">Meet the people behind Rankify.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {team.map((member) => (
          <div key={member.name} className="bg-white/80 dark:bg-zinc-900/80 rounded-lg shadow p-5 border border-muted">
            <div className="font-semibold text-lg mb-1">{member.name}</div>
            <div className="text-muted-foreground text-sm">{member.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
