"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Share2, FileText, Linkedin, MessageSquare, Headset } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Features = () => {
    const { t } = useLanguage();

    const features = [
        {
            title: t("feat1Title"),
            description: t("feat1Desc"),
            icon: Share2,
        },
        {
            title: t("feat2Title"),
            description: t("feat2Desc"),
            icon: FileText,
        },
        {
            title: t("feat3Title"),
            description: t("feat3Desc"),
            icon: Linkedin,
        },
        {
            title: t("feat4Title"),
            description: t("feat4Desc"),
            icon: MessageSquare,
        },
        {
            title: t("feat5Title"),
            description: t("feat5Desc"),
            icon: Headset,
        },
    ];

    const containerRef = useRef(null);

    useEffect(() => {
        const cards = gsap.utils.toArray(".feature-card");
        gsap.fromTo(cards,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="font-heading text-4xl md:text-6xl mb-6">{t("whatYouGet")}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card glass-panel p-10 rounded-[32px] group hover:border-primary/50 transition-colors"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                                <feature.icon size={28} />
                            </div>
                            <h3 className="font-heading text-xl mb-6">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
