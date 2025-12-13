export const metadata = {
    title: "How DealMitra Works – Compare & Buy Smarter in India",
    description:
        "Learn how DealMitra compares products, tracks prices, and helps Indian shoppers find the best value from trusted online stores.",
};

export default function HowItWorksPage() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-14">
            <h1 className="text-4xl font-bold text-center mb-6">
                How DealMitra Works
            </h1>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
                We know online shopping can be overwhelming with so many options out there.
                That's why we built DealMitra—to cut through the noise and help you shop
                with confidence. Here's what we do behind the scenes to make your life easier.
            </p>

            <div className="space-y-10">
                <Step
                    step="1"
                    title="We Do the Heavy Lifting"
                    description="Think of us as your personal shopping assistant. We're constantly keeping tabs on prices and products across India's biggest online stores—so you don't have to open 10 different tabs to compare."
                />

                <Step
                    step="2"
                    title="Everything in One Place"
                    description="Want to know which phone has better specs? Which deal actually saves you money? We pull together prices, features, ratings, and reviews—all the stuff that matters—and lay it out clearly so you can decide what's right for you."
                />

                <Step
                    step="3"
                    title="No Gimmicks, Just Real Value"
                    description="We're not here to push products that pay us the most. Our goal is simple: show you what genuinely offers the best bang for your buck. Whether it's the cheapest option or the one with the best reviews, we help you find what fits."
                />

                <Step
                    step="4"
                    title="You're Always in Control"
                    description="Once you've found what you want, we send you directly to the seller's site to complete your purchase safely. We don't handle payments or store your data—you buy directly from trusted platforms you already know."
                />
            </div>

            <div className="mt-16 p-8 bg-blue-50 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Why We Built This
                </h3>
                <p className="text-gray-700 leading-relaxed">
                    Honestly? Because we got tired of the endless scrolling, fake discounts,
                    and confusing comparisons. We wanted a simpler way to shop online—one that
                    doesn't waste your time or trick you into bad deals. DealMitra is what we
                    wish existed when we were hunting for the best prices ourselves.
                </p>
            </div>
        </div>
    );
}

function Step({
    step,
    title,
    description,
}: {
    step: string;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-6 items-start">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg shrink-0">
                {step}
            </div>
            <div>
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                <p className="mt-2 text-gray-600 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}