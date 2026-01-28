"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, Copy, Share2, Loader2, ArrowRight, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";

const API_URL = "/api";

export const RegistrationForm = () => {
    const { t } = useLanguage();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);
    const [regStatus, setRegStatus] = useState({ open: true, count: 0, limit: 100 });
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        email: "",
        college: "",
        degree: "",
        year: "Final Year",
        skills: "",
        careerGoal: "Job",
        agreed: false,
    });

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            const res = await axios.get(`${API_URL}/register`);
            setRegStatus({
                open: res.data.registrationOpen,
                count: res.data.count,
                limit: res.data.maxRegistrations
            });
        } catch (err: any) {
            const errorMsg = err.response?.data?.details || err.response?.data?.error || err.message;
            console.error("Status fetch error details:", errorMsg);
            setRegStatus({
                open: false,
                count: -1,
                limit: -1, // Special flag for error details
                errorDetails: errorMsg
            } as any);
        } finally {
            setChecking(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${API_URL}/register`, formData);
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.response?.data?.error || "Registration failed. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert(t("linkCopied"));
    };

    const handleWhatsAppShare = () => {
        const text = encodeURIComponent("Hey! Check out this Placement-Ready Portfolio Program. They are selecting 5 students for a special offer! Register here: " + window.location.href);
        window.open(`https://wa.me/?text=${text}`, "_blank");
    };

    if (checking) {
        return (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-primary" />
                <p className="text-[10px] font-heading tracking-[0.3em] text-gray-500 uppercase">{t("connecting")}</p>
            </div>
        );
    }

    if (!regStatus.open && regStatus.count === -1) {
        return (
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto glass-panel p-16 rounded-[48px] text-center border-red-500/20">
                    <AlertTriangle className="text-red-500 mx-auto mb-8" size={64} />
                    <h3 className="font-heading text-3xl mb-4 text-red-500">{t("techErrorTitle")}</h3>
                    <p className="text-gray-400 font-medium mb-8">
                        {t("techErrorDesc")}
                    </p>
                    {regStatus.limit === -1 && (
                        <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20 mb-8 text-left">
                            <p className="text-[10px] font-heading text-red-400 uppercase tracking-widest mb-2">{t("errorDetails")}</p>
                            <p className="text-xs font-mono text-red-300 break-all">{(regStatus as any).errorDetails || t("unknownError")}</p>
                        </div>
                    )}
                </div>
            </section>
        );
    }

    const isClosed = !regStatus.open || regStatus.count >= regStatus.limit;

    if (isSubmitted) {
        return (
            <section className="py-32 px-6 min-h-[700px] flex items-center">
                <div className="max-w-3xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-16 rounded-[48px] text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-10 shadow-[0_0_40px_rgba(151,254,92,0.2)]">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl mb-6">{t("successTitle")}</h2>
                        <p className="text-xl text-gray-400 mb-12 italic">
                            {t("successSub")}
                        </p>

                        <div className="border-t border-white/10 pt-12">
                            <h3 className="font-heading text-2xl mb-6">{t("helpFriends")}</h3>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <button
                                    onClick={handleWhatsAppShare}
                                    className="btn-primary !bg-[#25D366] !text-white !border-none shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                                >
                                    <Share2 size={20} />
                                    {t("shareWA")}
                                </button>
                                <button
                                    onClick={handleCopyLink}
                                    className="btn-primary !bg-white/5 hover:!bg-white/10 !text-white"
                                >
                                    <Copy size={20} />
                                    {t("copyLink")}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="register" className="py-32 px-6 relative">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl md:text-7xl mb-6">{t("secureSpot")}</h2>
                </div>

                {isClosed ? (
                    <div className="glass-panel p-16 rounded-[48px] text-center border-red-500/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
                        <AlertTriangle className="text-red-500 mx-auto mb-8" size={64} />
                        <h3 className="font-heading text-3xl mb-4">{t("regClosedTitle")}</h3>
                        <p className="text-gray-400 font-medium mb-8">
                            {t("regClosedDesc")}
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="glass-panel p-10 md:p-16 rounded-[48px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                            <div className="text-[10px] font-bold text-primary/40 uppercase tracking-widest font-heading">
                                {regStatus.count} / {regStatus.limit} Registered
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                            {[
                                { label: t("fullName"), key: "fullName", type: "text", placeholder: t("fullName").toUpperCase() },
                                { label: t("mobile"), key: "mobile", type: "tel", placeholder: "98765 43210" },
                                { label: t("email"), key: "email", type: "email", placeholder: "JOHN@EMAIL.COM" },
                                { label: t("college"), key: "college", type: "text", placeholder: t("college").toUpperCase() },
                                { label: t("degree"), key: "degree", type: "text", placeholder: "B.E CSE" },
                            ].map((field) => (
                                <div key={field.key} className="space-y-4">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] font-heading">
                                        {field.label}
                                    </label>
                                    <input
                                        required
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-primary/50 focus:bg-white/10 outline-none transition-all font-heading tracking-widest text-sm text-primary placeholder:text-white/10"
                                        value={(formData as any)[field.key]}
                                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                    />
                                </div>
                            ))}

                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] font-heading">
                                    {t("year")}
                                </label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-primary/50 focus:bg-white/10 outline-none transition-all font-heading tracking-widest text-sm text-primary appearance-none cursor-pointer"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                >
                                    <option className="bg-[#030014]" value="2nd Year">{t("year2")}</option>
                                    <option className="bg-[#030014]" value="3rd Year">{t("year3")}</option>
                                    <option className="bg-[#030014]" value="Final Year">{t("yearFinal")}</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-10 mb-12">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] font-heading">
                                    {t("skills")}
                                </label>
                                <textarea
                                    placeholder="REACT, JAVA, PYTHON..."
                                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-primary/50 focus:bg-white/10 outline-none transition-all font-heading tracking-widest text-sm text-primary placeholder:text-white/10 resize-none h-32"
                                    value={formData.skills}
                                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] font-heading">
                                    {t("careerGoal")}
                                </label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-primary/50 focus:bg-white/10 outline-none transition-all font-heading tracking-widest text-sm text-primary appearance-none cursor-pointer"
                                    value={formData.careerGoal}
                                    onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                                >
                                    <option className="bg-[#030014]" value="Job">{t("goalJob")}</option>
                                    <option className="bg-[#030014]" value="Internship">{t("goalIntern")}</option>
                                    <option className="bg-[#030014]" value="Higher Studies">{t("goalHigher")}</option>
                                </select>
                            </div>

                            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                                <input
                                    required
                                    type="checkbox"
                                    className="mt-1 h-5 w-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary checked:bg-primary transition-colors cursor-pointer"
                                    checked={formData.agreed}
                                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                                />
                                <label className="text-xs text-gray-400 leading-relaxed font-medium">
                                    {t("agree")}
                                </label>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-8 p-4 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 text-[10px] font-bold uppercase tracking-widest">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed !py-6 !text-sm group"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    {t("submit")}
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};
