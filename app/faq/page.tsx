export const metadata = {
    title: "FAQ - Dealmitra.online",
    description:
        "Find answers to common questions about Dealmitra.online — how comparisons work, how we earn, how often data is updated, privacy details, and more.",
};

export default function FAQPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">
                Frequently Asked Questions (FAQ)
            </h1>

            <p className="text-gray-700 mb-8">
                Thanks for visiting Dealmitra! This page covers the most common
                questions people ask about how our website works. We’ve kept things
                simple and easy to understand. If you still need help, feel free to
                reach out — we’re always happy to assist.
            </p>

            <FAQItem
                question="What is Dealmitra.online?"
                answer="Dealmitra.online is your smart shopping assistant. We help you compare products, understand their features, and make confident buying decisions — without spending hours researching on different websites."
            />

            <FAQItem
                question="How does the product comparison work?"
                answer="When you compare products on Dealmitra, our system breaks down the specs, features, pros and cons, prices, and ratings into an easy-to-read format. This helps you quickly spot the differences and choose what’s best for you."
            />

            <FAQItem
                question="Are your comparisons accurate?"
                answer="We always try to keep our comparisons as accurate as possible. Our data comes from trusted sources, brand websites, and verified user reviews. We also add human-written insights to make everything clearer and more useful."
            />

            <FAQItem
                question="Is Dealmitra.online free to use?"
                answer="Absolutely! Dealmitra is 100% free. You can browse comparisons, reviews, and guides without paying anything."
            />

            <FAQItem
                question="Do you earn money through affiliate links?"
                answer="Sometimes, we may earn a small commission if you purchase a product through our links. It doesn’t cost you anything extra, and it helps us keep the website running without charging users."
            />

            <FAQItem
                question="Do you sell products directly?"
                answer="No, we don’t sell anything ourselves. Our job is to help you find the right product, not to sell one."
            />

            <FAQItem
                question="How often do you update product information?"
                answer="We update product details regularly. Still, if you notice something outdated, just let us know — we’ll correct it as soon as possible."
            />

            <FAQItem
                question="Why should I trust your recommendations?"
                answer="We focus on transparency and honesty. Every product has pros and cons, and we make sure to highlight both so you can make an informed choice, not just follow what’s trending."
            />

            <FAQItem
                question="Can I request a custom comparison?"
                answer="Yes! Just visit our Contact Us page and send us the product names you want compared. We’ll prepare the comparison and update you once it’s live."
            />

            <FAQItem
                question="Do you store my personal data?"
                answer="We collect only minimal analytics to understand how the website is being used. We never sell your data. For full details, please check our Privacy Policy."
            />

            <FAQItem
                question="Why do I see ads on the site?"
                answer="Ads help us keep Dealmitra free for everyone. We try to ensure that the ads shown are relevant and not too distracting."
            />

            <FAQItem
                question="How can I contact Dealmitra support?"
                answer="You can reach us anytime through our Contact page. We usually respond within 24 hours."
            />
        </div>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    return (
        <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{question}</h2>
            <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
    );
}