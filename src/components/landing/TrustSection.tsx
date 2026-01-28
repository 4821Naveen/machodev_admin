"use client";

import React from "react";
import { ShieldCheck, Database, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const TrustSection = () => {
    const { t } = useLanguage();
    return (
        <section className="py-32 px-6 border-t border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center gap-12 mb-12 opacity-20">
                    <ShieldCheck size={64} />
                    <Database size={64} />
                    <Lock size={64} />
                </div>

                <h2 className="font-heading text-3xl md:text-5xl mb-10">{t("trustTitle")}</h2>

                <div className="space-y-8 text-gray-400 leading-relaxed text-lg pb-12">
                    <p>{t("trustDesc")}</p>
                </div>

                <div className="inline-flex flex-col items-center gap-4 py-8 px-12 glass-panel rounded-full border-primary/20">
                    <span className="font-heading text-xs tracking-[0.4em] text-primary">{t("trustNoData")}</span>
                </div>
            </div>
        </section>
    );
};
