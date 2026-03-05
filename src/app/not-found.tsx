"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center px-6">
      <p className="font-serif text-8xl md:text-9xl font-medium text-brand-navy tracking-tight">
        404
      </p>
      <h1 className="font-serif text-2xl md:text-3xl text-brand-navy mt-4">
        Page Not Found
      </h1>
      <p className="text-text-body mt-2 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-brand-navy text-white font-medium rounded-md hover:bg-brand-navy/90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}
