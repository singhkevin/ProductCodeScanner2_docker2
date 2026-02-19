import { useState, useEffect } from 'react';
import { ShieldCheck, Loader2, Plus, AlertCircle, Building2, Hash, Fingerprint } from 'lucide-react';
import { dashboardApi } from '../api';

export default function AdminGenerate() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [companies, setCompanies] = useState<{ id: string, name: string }[]>([]);
    const [formData, setFormData] = useState({
        companyId: '',
        name: '',
        sku: '',
        batchNumber: '',
        description: '',
        quantity: '10',
        codeType: 'alphanumeric'
    });

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await dashboardApi.getCompanies();
                setCompanies(response.data);
            } catch (error) {
                console.error('Failed to fetch companies', error);
            }
        };
        fetchCompanies();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            await dashboardApi.generateProductsAdmin(formData);
            setSuccess(true);
            setFormData({
                ...formData,
                name: '',
                sku: '',
                batchNumber: '',
                description: '',
                quantity: '10'
            });
        } catch (error: any) {
            console.error('Failed to generate products', error);
            alert(error.response?.data?.message || 'Failed to generate products');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="pb-6 border-b border-slate-200/50">
                <h1 className="text-3xl font-bold text-white tracking-tight">Admin Batch Generation</h1>
                <p className="text-slate-400 mt-1 text-sm">Create and assign cryptographic payloads for partner companies</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 premium-card p-10 rounded-[2.5rem] relative group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Building2 size={12} /> Target Company
                        </label>
                        <select
                            required
                            name="companyId"
                            value={formData.companyId}
                            onChange={handleChange}
                            className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 px-5 py-3 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm outline-none appearance-none"
                        >
                            <option value="">Select a company</option>
                            {companies.map(company => (
                                <option key={company.id} value={company.id}>{company.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Fingerprint size={12} /> Code Architecture
                        </label>
                        <select
                            required
                            name="codeType"
                            value={formData.codeType}
                            onChange={handleChange}
                            className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 px-5 py-3 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm outline-none appearance-none"
                        >
                            <option value="alphanumeric">Alphanumeric (8 Chars)</option>
                            <option value="uuid">UUID (Standard QR)</option>
                        </select>
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Asset Name</label>
                        <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Premium Batch A"
                            className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 px-5 py-3 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-600 text-sm outline-none"
                        />
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">SKU identifier</label>
                        <input
                            required
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            placeholder="e.g. SKU-BATCH-001"
                            className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 px-5 py-3 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-600 text-sm outline-none"
                        />
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Batch Number</label>
                        <input
                            required
                            type="text"
                            name="batchNumber"
                            value={formData.batchNumber}
                            onChange={handleChange}
                            placeholder="e.g. 2024-Q1-ADMIN"
                            className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 px-5 py-3 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-600 text-sm outline-none"
                        />
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Hash size={12} /> Generation Quantity
                        </label>
                        <input
                            required
                            type="number"
                            min="1"
                            max="1000"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 px-5 py-3 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-2.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Metadata / Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Additional batch details..."
                        className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 px-5 py-3 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-600 text-sm outline-none resize-none"
                    />
                </div>

                <div className="pt-4">
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-600/20 font-bold text-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99]"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                        {loading ? 'Initializing Generation Mesh...' : 'Begin Batch Generation'}
                    </button>
                </div>

                {success && (
                    <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex items-center gap-5 animate-in zoom-in-95">
                        <div className="p-3 bg-emerald-500 rounded-xl text-white shadow-lg shadow-emerald-500/20">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Generation Successful</p>
                            <p className="text-sm font-semibold text-white mt-0.5">Batch generated and cryptographically assigned to company.</p>
                        </div>
                    </div>
                )}
            </form>

            <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-3xl flex gap-6 items-center">
                <div className="p-4 bg-white/5 rounded-2xl text-indigo-400 ring-1 ring-white/10 shrink-0">
                    <AlertCircle size={28} />
                </div>
                <div className="space-y-1">
                    <h4 className="text-white font-semibold text-sm">Administrative Override Active</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                        This terminal facilitates mass asset generation without verification loops. All generated codes are immediately active and billable to the target company.
                    </p>
                </div>
            </div>
        </div>
    );
}
