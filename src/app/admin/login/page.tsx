"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLogin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Using the user-provided credentials
        if (formData.email === "info@machodev.com" && formData.password === "4821aa@#") {
            // Simulate session storage
            localStorage.setItem("admin_session", "true");
            router.push("/admin/dashboard");
        } else {
            setError("Invalid credentials / தவறான விவரங்கள்");
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#030014] flex items-center justify-center px-6 relative">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

            <div className="max-w-md w-full relative z-10">
                <div className="text-center mb-10">
                    <h1 className="font-heading text-4xl mb-2">ADMIN LOGIN</h1>
                    <p className="text-primary text-xs tracking-widest uppercase opacity-50">MachoDev Portfolio Program</p>
                </div>

                <form onSubmit={handleLogin} className="glass-panel p-10 rounded-[40px] space-y-8">
                    <div className="space-y-4">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-heading">Email Address</label>
                        <div className="relative">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                            <input
                                required
                                type="email"
                                placeholder="info@machodev.com"
                                className="w-full bg-white/5 border border-white/10 pl-16 pr-6 py-4 rounded-2xl focus:border-primary/50 focus:bg-white/10 outline-none transition-all font-heading tracking-widest text-sm text-primary placeholder:text-white/5"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-heading">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 pl-16 pr-6 py-4 rounded-2xl focus:border-primary/50 focus:bg-white/10 outline-none transition-all font-heading tracking-widest text-sm text-primary placeholder:text-white/5"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 text-[10px] font-bold uppercase tracking-widest text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary !py-5 !text-xs group"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                                AUTHENTICATE
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
