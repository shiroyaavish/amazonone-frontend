"use client";
import { useEffect, useState } from "react";

export default function AdBanner() {
    const [adLoaded, setAdLoaded] = useState(false);
    const customAds = [
        {
            link: "https://www.instagram.com/vensi_shiroya_12/p/DRleAtCjD4z/?hl=en",
            image:"/ad1.webp"
        },
        {
            link: "https://www.instagram.com/vensi_shiroya_12/?hl=en",
            image: "/ad2.webp"
        }
    ];
    const randomAd = customAds[Math.floor(Math.random() * customAds.length)];

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setTimeout(() => {
                // Check if adsense turned the <ins> tag into an iframe (ad loaded)
                const ins = document.querySelector(".adsbygoogle");
                if (ins && ins.querySelector("iframe")) {
                    setAdLoaded(true);
                }
            }, 2500); // wait 2.5 sec for google ad response
        } catch (e) {
            setAdLoaded(false);
        }
    }, []);

    if (!adLoaded) {
        // Fallback custom ad
        return (
            <a
                href={randomAd.link}
                target="_blank"
                className="block group"
                style={{
                    display: "block",
                    width: "100%",
                    textDecoration: "none",
                }}
            >
                <div
                    style={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.14)",
                        background: "#fff",
                        transition: "transform .25s ease, box-shadow .25s ease",
                    }}
                    className="group-hover:scale-[1.02] group-hover:shadow-xl"
                >
                    <img
                        src={randomAd.image}
                        alt="Instagram"
                        style={{
                            width: "100%",
                            height: "230px",
                            objectFit: "cover",
                            display: "block",
                        }}
                    />

                    <div style={{ padding: "14px 16px" }}>
                        <span
                            style={{
                                background: "#E1306C",
                                color: "white",
                                padding: "3px 6px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: "600",
                            }}
                        >
                            Sponsored
                        </span>

                        <div
                            style={{
                                marginTop: "8px",
                                textAlign: "center",
                                padding: "8px",
                                background: "#E1306C",
                                color: "white",
                                borderRadius: "6px",
                                fontWeight: "600",
                                fontSize: "15px",
                            }}
                        >
                            View Profile →
                        </div>
                    </div>
                </div>
            </a>

        );
    }

    return (
        <ins
            style={{
                display: "block", width: "100vw",
                height: "320"
            }}
            data-ad-client="ca-pub-8569782505338512"
            data-ad-slot="2555459266"
            data-ad-format="auto"
            data-auto-format="rspv"
            data-full-width-responsive="true"
        ></ins>
    );
}