export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-sm leading-relaxed">
      <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>

      <p className="mb-4 text-gray-700">
        Last updated: {new Date().toLocaleDateString("en-IN")}
      </p>

      <p className="mb-4">
        At <strong>DealMitra</strong>, your privacy matters to us. This Privacy
        Policy explains what information we collect, how we use it, and what
        choices you have while using our website{" "}
        <strong>dealmitra.online</strong>.
      </p>

      <p className="mb-4">
        By using our website, you agree to the practices described in this
        policy. If you do not agree with anything mentioned here, please avoid
        using the Site.
      </p>

      {/* SECTION 1 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        1. Information We Collect
      </h2>

      <h3 className="text-lg font-semibold mt-4 mb-2">
        1.1 Information you choose to share
      </h3>
      <p className="mb-3">
        We may collect information directly from you when you:
      </p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Contact us through email or forms</li>
        <li>Subscribe to newsletters or alerts</li>
        <li>Create an account (if this feature is available)</li>
      </ul>
      <p className="mb-4">
        This can include details like your name, email address, or anything else
        you voluntarily provide.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">
        1.2 Information collected automatically
      </h3>
      <p className="mb-3">
        When you browse our website, some information is collected automatically
        to help us improve your experience, such as:
      </p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Your IP address</li>
        <li>Browser version and device type</li>
        <li>Pages you visit and time spent on them</li>
        <li>General location (city/country level)</li>
        <li>Operating system and device details</li>
      </ul>
      <p className="mb-4">
        This data helps us understand how visitors use our site and protect the
        platform from misuse.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">
        1.3 Cookies and tracking technologies
      </h3>
      <p className="mb-3">
        We use cookies and similar technologies to make your browsing
        experience smoother. Cookies help us:
      </p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Remember your preferences</li>
        <li>Analyse how people use our website</li>
        <li>Show more relevant advertisements</li>
      </ul>
      <p className="mb-4">
        If you prefer, you can disable cookies in your browser. However, some
        parts of the site may not work as expected.
      </p>

      {/* SECTION 2 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">We use the information we collect to:</p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Improve the website and user experience</li>
        <li>Show deals and content that match your interests</li>
        <li>Send newsletters or updates (only if you subscribe)</li>
        <li>Respond to your questions and support requests</li>
        <li>Monitor activity to detect fraud or misuse</li>
        <li>Comply with legal requirements</li>
      </ul>

      {/* SECTION 3 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        3. Google AdSense and Advertising
      </h2>
      <p className="mb-4">
        We work with third-party advertising services like Google AdSense. These
        services may use cookies and similar tools to:
      </p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Show ads based on your browsing activity</li>
        <li>Measure how ads perform</li>
        <li>Reduce spam and fraudulent clicks</li>
        <li>Personalize the ads you see across the internet</li>
      </ul>

      <p className="mb-4">
        You can manage or turn off personalized advertising by visiting Google’s
        Ads Settings page.
      </p>

      <p className="mb-4">More information is available here:</p>

      <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto mb-4">
        https://policies.google.com/technologies/ads
      </pre>

      {/* SECTION 4 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        4. Links to Other Websites
      </h2>
      <p className="mb-4">
        Our website may include links to external sites. We do not control or
        take responsibility for their content or privacy practices. We recommend
        reviewing their privacy policies before sharing any information.
      </p>

      {/* SECTION 5 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        5. When We Share Your Information
      </h2>
      <p className="mb-3">We do not sell your personal information. However, we may share it:</p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>
          <strong>With service providers</strong> that help us run our website
          (analytics, hosting, email tools, etc.)
        </li>
        <li>
          <strong>If required by law</strong> or to respond to legal requests
        </li>
        <li>
          <strong>During a business transfer</strong> like a merger or sale of
          assets
        </li>
      </ul>

      {/* SECTION 6 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">6. How Long We Keep Data</h2>
      <p className="mb-4">
        We keep your information only for as long as necessary for the purposes
        outlined in this policy or as required by law.
      </p>

      {/* SECTION 7 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        7. Your Rights and Choices
      </h2>
      <p className="mb-4">Depending on your region, you may be able to:</p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Request access to the information we store about you</li>
        <li>Ask for corrections or deletion of your data</li>
        <li>Limit or object to certain types of data processing</li>
        <li>Withdraw consent for communications</li>
      </ul>
      <p className="mb-4">
        To use any of these rights, simply contact us using the details in the
        section below.
      </p>

      {/* SECTION 8 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        8. Children’s Privacy
      </h2>
      <p className="mb-4">
        DealMitra is not meant for children under 13. We do not knowingly
        collect personal information from young children. If you believe a child
        has shared data with us, please reach out so we can remove it.
      </p>

      {/* SECTION 9 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">9. Security Measures</h2>
      <p className="mb-4">
        We use reasonable security practices to protect your information.
        However, no online platform is completely risk-free, and we cannot
        guarantee absolute security.
      </p>

      {/* SECTION 10 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">
        10. Updates to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this policy from time to time. When we do, we will post
        the latest version here with the updated date. Continuing to use the
        Site means you accept the updated terms.
      </p>

      {/* SECTION 11 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">11. Contact Us</h2>
      <p className="mb-1">
        If you have questions, concerns, or feedback about this Privacy Policy,
        feel free to contact us:
      </p>

      <p className="mb-4">
        <strong>Email:</strong> dealmitra1111@gmail.com
      </p>
    </main>
  );
}
