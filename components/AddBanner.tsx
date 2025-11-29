"use client";
import { useEffect, useState } from "react";

export default function AdBanner() {
    const [adLoaded, setAdLoaded] = useState(false);
    const customAds = [
        {
            link: "https://www.instagram.com/vensi_shiroya_12/p/DRleAtCjD4z/?hl=en",
            image:
                "https://scontent.cdninstagram.com/v/t51.82787-15/587606318_18045998276697710_1383631647273158589_n.webp?_nc_cat=104&ig_cache_key=Mzc3NTU1NTg1MjM3NjQ4OTUyMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjg1OHgxMDgwLnNkci5DMyJ9&_nc_ohc=BfN6GMkBsGIQ7kNvwGG1hbQ&_nc_oc=AdnuHuMUBCHjMFgpe_IRO5_30Rp1W9MW7vlKpM_XPg2GpMVffgw5aLOIF9J9VsM31FeatEil_iZtif8nL9ubJIuK&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=4ttOIgHlIrZ0Cl-v7VteqA&oh=00_AfgTWeO5lrA_bz-JhxT4kAdlDZD-yUDIaoGwpM6evxgM4w&oe=69305AD1"
        },
        {
            link: "https://www.instagram.com/vensi_shiroya_12/?hl=en",
            image: "https://scontent.cdninstagram.com/v/t51.82787-15/587579138_18045796529697710_4435856168917232166_n.webp?_nc_cat=104&ig_cache_key=Mzc3NDExNjUxMzExMzE4NDc5OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTA4MC5zZHIuQzIifQ%3D%3D&_nc_ohc=ndw_VDsYWhkQ7kNvwHriwzZ&_nc_oc=AdkqU6dq33OOvqoyVGNZiXR9kwKU3oSCL8I1bxapUHTQTVNw4nJz-32i-aJJR9Tia4th8bskV5GCpcE9ltk5ElNe&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=bWOwJn09wvrE22dqV5WooQ&oh=00_AfhcxXdyQeosdRKmffVcbaG7O93q96dGtWFhDmOVEOPKGg&oe=69305BAC"
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