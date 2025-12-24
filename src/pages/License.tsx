export default function License() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Legal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">License Agreement</h1>
        <p className="mt-6 text-xl leading-8">Last Updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-10 max-w-2xl">
          <p>This License Agreement is a legal agreement between you and 94mercato for the digital products you purchase on our website. By purchasing and downloading our products, you agree to be bound by the terms of this agreement.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">1. Standard License</h2>
          <p className="mt-6">The Standard License grants you the following rights:</p>
          <ul className="mt-8 max-w-xl space-y-4 text-gray-600 list-disc pl-8">
            <li>Use of the product for personal, non-commercial projects.</li>
            <li>Use of the product for one (1) commercial project.</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">2. Extended License</h2>
          <p className="mt-6">The Extended License grants you the following rights:</p>
          <ul className="mt-8 max-w-xl space-y-4 text-gray-600 list-disc pl-8">
            <li>Use of the product for personal, non-commercial projects.</li>
            <li>Use of the product for unlimited commercial projects.</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">3. Prohibited Uses</h2>
          <p className="mt-6">Under both licenses, you are strictly prohibited from:</p>
          <ul className="mt-8 max-w-xl space-y-4 text-gray-600 list-disc pl-8">
            <li>Redistributing, reselling, or sharing the product, either for free or for profit.</li>
            <li>Including the product in a larger package for resale.</li>
            <li>Claiming ownership of the product.</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">4. Intellectual Property</h2>
          <p className="mt-6">All digital products on this website are the intellectual property of 94mercato. This license grants you the right to use the products, but it does not transfer ownership.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Contact Us</h2>
          <p className="mt-6">If you have any questions about this License Agreement, please contact us at support@mercato94.com.</p>
        </div>
      </div>
    </div>
  )
}
