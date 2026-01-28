"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="fixed top-8 right-8 z-[100]">
            <div className="glass-panel p-1 rounded-full flex gap-1">
                <button
                    onClick={() => setLanguage("en")}
                    className={`px-4 py-2 rounded-full font-heading text-[10px] tracking-widest transition-all ${language === "en" ? "bg-primary text-black" : "text-white/40 hover:text-white"
                        }`}
                >
                    EN
                </button>
                <button
                    onClick={() => setLanguage("ta")}
                    className={`px-4 py-2 rounded-full font-heading text-[10px] tracking-widest transition-all ${language === "ta" ? "bg-primary text-black" : "text-white/40 hover:text-white"
                        }`}
                >
                    தமிழ்
                </button>
            </div>
        </div>
    );
};
