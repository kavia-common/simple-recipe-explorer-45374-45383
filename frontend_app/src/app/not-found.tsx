import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <section className="card p-8 text-center" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
          404 – Page Not Found
        </h1>
        <p className="text-sm mb-4" style={{ color: "rgba(17,24,39,0.7)" }}>
          The page you’re looking for doesn’t exist.
        </p>
        <Link href="/" className="btn inline-block">
          Go home
        </Link>
      </section>
    </div>
  );
}
