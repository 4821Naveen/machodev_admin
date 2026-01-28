"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Users, Star, Trophy, Loader2, ArrowLeft, RefreshCcw, ToggleLeft, ToggleRight, FileSpreadsheet } from "lucide-react";
import axios from "axios";

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [settings, setSettings] = useState<any>({});
    const [selecting, setSelecting] = useState(false);
    const [toggling, setToggling] = useState(false);

    useEffect(() => {
        const isAuth = localStorage.getItem("admin_session");
        if (!isAuth) {
            router.push("/admin/login");
        } else {
            fetchData();
        }
    }, [router]);

    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setError(null);
            const res = await axios.get("/api/admin");
            setRegistrations(res.data.registrations || []);
            setSettings(res.data.settings || {});
        } catch (err: any) {
            console.error("Fetch error:", err);
            const msg = err.response?.data?.details || err.response?.data?.error || err.message;
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const toggleRegistration = async () => {
        setToggling(true);
        const newValue = settings.registration_open === 'true' ? 'false' : 'true';
        try {
            await axios.put("/api/admin", { action: 'TOGGLE_REGISTRATION', value: newValue });
            await fetchData();
        } catch (err) {
            alert("Failed to toggle registration.");
        } finally {
            setToggling(false);
        }
    };

    const selectWinners = async () => {
        if (!confirm("This will randomly select 5 winners and reset previous selections. Continue?")) return;
        setSelecting(true);
        try {
            await axios.put("/api/admin", { action: 'SELECT_WINNERS' });
            await fetchData();
            alert("5 Winners selected successfully!");
        } catch (err) {
            console.error("Selection error:", err);
            alert("Failed to select winners.");
        } finally {
            setSelecting(false);
        }
    };

    const exportToCSV = () => {
        const headers = ["ID", "Full Name", "Mobile", "Email", "College", "Degree", "Year", "Skills", "Goal", "Selected", "Created At"];
        const rows = registrations.map(reg => [
            reg.id,
            reg.full_name,
            reg.mobile_number,
            reg.email_id,
            reg.college_name,
            reg.degree_dept,
            reg.year_of_study,
            `"${(reg.skills || "").replace(/"/g, '""')}"`,
            reg.career_goal,
            reg.is_selected ? "YES" : "NO",
            new Date(reg.created_at).toLocaleString()
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `registrations_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_session");
        router.push("/admin/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#030014] flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    const isRegOpen = settings.registration_open === 'true';

    return (
        <main className="min-h-screen bg-[#030014] text-white p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
                {error && (
                    <div className="mb-12 glass-panel p-8 rounded-[32px] border-red-500/20 bg-red-500/5 text-center">
                        <h2 className="font-heading text-xl text-red-500 mb-2 uppercase tracking-widest">DATABASE CONNECTION FAILED</h2>
                        <p className="text-gray-400 text-sm mb-4">The admin panel cannot retrieve data from the vault.</p>
                        <div className="bg-black/40 p-4 rounded-xl border border-red-500/10 text-left">
                            <p className="text-[10px] font-heading text-red-400 uppercase tracking-widest mb-2">Error Details:</p>
                            <p className="text-xs font-mono text-red-300 break-all">{error}</p>
                        </div>
                        <button
                            onClick={fetchData}
                            className="mt-6 text-[10px] font-heading text-primary uppercase tracking-[0.3em] flex items-center justify-center gap-2 mx-auto hover:opacity-80 transition-opacity"
                        >
                            <RefreshCcw size={14} /> Retry Connection
                        </button>
                    </div>
                )}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <button onClick={handleLogout} className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-heading tracking-widest uppercase">
                                <ArrowLeft size={14} /> Logout
                            </button>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl">REGISTRATION <span className="text-primary italic">VAULT</span></h1>
                        <div className="flex items-center gap-6 mt-4">
                            <p className="text-gray-500 text-xs tracking-[0.3em] font-heading uppercase">Total Students: {registrations.length} / 100</p>
                            <button
                                onClick={toggleRegistration}
                                disabled={toggling}
                                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${isRegOpen ? 'bg-primary/10 text-primary border-primary/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                                    }`}
                            >
                                {isRegOpen ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                                {isRegOpen ? 'Registration OPEN' : 'Registration CLOSED'}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 w-full md:w-auto">
                        <button
                            onClick={exportToCSV}
                            className="btn-primary !bg-white/5 hover:!bg-white/10 !text-white !border-white/10 !py-4 !px-8 !text-[10px] !uppercase !tracking-widest flex-1 md:flex-none"
                        >
                            <FileSpreadsheet size={16} />
                            Export to Excel
                        </button>
                        <button
                            onClick={selectWinners}
                            disabled={selecting}
                            className="btn-primary !py-4 !px-8 !text-[10px] !uppercase !tracking-widest flex-1 md:flex-none shadow-[0_0_20px_rgba(151,254,92,0.2)]"
                        >
                            {selecting ? <Loader2 className="animate-spin" size={16} /> : <Trophy size={16} />}
                            Select 5 Random Winners
                        </button>
                    </div>
                </header>

                <div className="glass-panel rounded-[40px] overflow-hidden border-white/5 bg-white/[0.02]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.03]">
                                    <th className="px-8 py-6 font-heading text-[10px] tracking-widest text-gray-500 uppercase">Student</th>
                                    <th className="px-8 py-6 font-heading text-[10px] tracking-widest text-gray-500 uppercase">Details</th>
                                    <th className="px-8 py-6 font-heading text-[10px] tracking-widest text-gray-500 uppercase">College</th>
                                    <th className="px-8 py-6 font-heading text-[10px] tracking-widest text-gray-500 uppercase">Status</th>
                                    <th className="px-8 py-6 font-heading text-[10px] tracking-widest text-gray-500 uppercase">Registered</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.02]">
                                {registrations.map((reg) => (
                                    <tr key={reg.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-8">
                                            <div className="flex flex-col">
                                                <span className="font-heading text-sm tracking-widest text-primary mb-1 uppercase">{reg.full_name}</span>
                                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{reg.email_id}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-gray-300">{reg.mobile_number}</span>
                                                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em]">{reg.career_goal}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-gray-300 font-medium">{reg.college_name}</span>
                                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">{reg.degree_dept} • {reg.year_of_study}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8">
                                            {reg.is_selected ? (
                                                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20 shadow-[0_0_10px_rgba(151,254,92,0.1)]">
                                                    <Star size={12} fill="currentColor" /> Selected
                                                </span>
                                            ) : (
                                                <span className="text-gray-700 text-[10px] font-bold uppercase tracking-widest">Waitlisted</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-8">
                                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                                                {new Date(reg.created_at).toLocaleDateString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {registrations.length === 0 && (
                        <div className="py-32 text-center">
                            <Users className="mx-auto text-white/5 mb-6" size={64} />
                            <p className="font-heading text-xs tracking-[0.5em] text-gray-600 uppercase">Zero Registrations Found</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
