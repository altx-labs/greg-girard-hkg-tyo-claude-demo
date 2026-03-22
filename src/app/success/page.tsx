import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="text-2xl font-medium mb-3">Thank you for your order</h1>
        <p className="text-sm text-neutral-600 mb-6">
          Your payment has been received. You will receive a confirmation email
          shortly. Pre-order items will be shipped on their listed availability
          date.
        </p>
        <Link
          href="/"
          className="inline-block text-sm px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-700 transition-colors"
        >
          Back to store
        </Link>
      </div>
    </div>
  );
}
