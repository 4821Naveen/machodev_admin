"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Hero = () => {
    const { t } = useLanguage();
    const headingRef = useRef(null);
    const subRef = useRef(null);
    const btnRef = useRef(null);
    const badgeRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(badgeRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(headingRef.current,
                { opacity: 0, y: 100, rotateX: 45 },
                { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: "power4.out" },
                "-=0.5"
            )
            .fromTo(subRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.8"
            )
            .fromTo(btnRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
                "-=0.6"
            );
    }, []);

    return (
        <section className="min-h-screen flex items-center pt-24 pb-20 px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-primary/5 blur-[200px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="max-w-4xl">
                    <div ref={badgeRef} className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-bold text-primary mb-8 uppercase tracking-widest">
                        <Sparkles className="h-3 w-3" />
                        <span>{t("heroBadge")}</span>
                    </div>

                    <h1
                        ref={headingRef}
                        className="font-heading text-6xl md:text-8xl lg:text-[120px] leading-[0.85] mb-12 tracking-[-0.05em]"
                    >
                        {t("heroHeading1")} <br />
                        <span className="text-primary opacity-80 italic">{t("heroHeading2")}</span>
                    </h1>

                    <div ref={subRef} className="space-y-6 mb-12">
                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
                            {t("heroSub")}
                        </p>
                    </div>

                    <div ref={btnRef} className="flex flex-col sm:flex-row gap-6">
                        <button
                            onClick={() => {
                                const el = document.getElementById("register");
                                el?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="btn-primary group !py-5 !px-10 !text-xs !uppercase !tracking-[0.2em] shadow-[0_0_30px_rgba(151,254,92,0.3)]"
                        >
                            {t("registerNow")}
                            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold">{t("scroll")}</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
            </div>
        </section>
    );
};
