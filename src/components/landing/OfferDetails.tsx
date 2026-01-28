"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const OfferDetails = () => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(sectionRef.current,
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            }
        );
    }, []);

    return (
        <section className="py-32 px-6">
            <div ref={sectionRef} className="max-w-7xl mx-auto glass-panel rounded-[48px] p-12 md:p-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="font-heading text-4xl md:text-6xl mb-8 leading-tight">
                            {t("limitedOffer")}
                        </h2>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-center gap-4 text-lg">
                                <CheckCircle2 className="text-primary" />
                                <span>{t("offerNote")}</span>
                            </div>
                            <div className="flex items-start gap-4 text-lg text-gray-400">
                                <AlertCircle className="mt-1" size={20} />
                                <span>{t("offerWarning")}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-12 rounded-[40px] border border-white/5 bg-white/5 relative group">
                        <div className="absolute inset-0 bg-primary/5 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <span className="text-gray-500 line-through text-2xl mb-4 font-heading tracking-widest opacity-50">{t("priceOld")}</span>
                        <div className="text-7xl md:text-9xl font-heading text-primary mb-4 text-glow">{t("priceNew")}</div>
                        <p className="text-xs uppercase tracking-[0.5em] font-bold text-gray-500 mb-10">{t("onlyFor5")}</p>

                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
                            <div className="h-full bg-primary w-[20%] shadow-[0_0_10px_#97fe5c]" />
                        </div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest italic animate-pulse">{t("waitlist")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
