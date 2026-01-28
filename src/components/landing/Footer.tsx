"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="bg-black/40 border-t border-white/5 py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20">
                    <div>
                        <h3 className="font-heading text-3xl mb-8 tracking-tighter">MACHODEV</h3>
                        <p className="text-gray-500 max-w-sm mb-10 leading-relaxed">
                            {t("footerDesc")}
                        </p>
                        <a
                            href="mailto:support@machodev.com"
                            className="text-primary hover:text-primary/80 font-heading text-xs tracking-[0.3em] border-b border-primary/20 pb-2 transition-all"
                        >
                            SUPPORT@MACHODEV.COM
                        </a>
                    </div>

                    <div className="flex flex-col md:items-end gap-6 text-gray-500">
                        <h4 className="font-heading text-xs tracking-[0.5em] text-white/20 mb-4">{t("quickLinks")}</h4>
                        <a href="#" className="hover:text-primary transition-colors font-heading text-[10px] tracking-[0.4em]">{t("privacyPolicy")}</a>
                        <a href="#" className="hover:text-primary transition-colors font-heading text-[10px] tracking-[0.4em]">{t("termsService")}</a>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                    <p className="text-[10px] text-gray-600 uppercase tracking-[0.5em] font-bold text-center md:text-left leading-loose max-w-2xl">
                        {t("disclaimer")}
                    </p>
                    <p className="text-[10px] text-gray-700 uppercase tracking-[0.4em] font-bold">
                        &copy; {new Date().getFullYear()} MACHODEV
                    </p>
                </div>
            </div>
        </footer>
    );
};
