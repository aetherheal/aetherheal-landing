export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-light">
      <div className="w-10 h-10 border-2 border-brand-gold border-t-brand-navy rounded-full animate-spin" />
      <p className="mt-4 text-brand-navy font-medium">Loading...</p>
    </div>
  )
}
