export default function AskHelpForm() {
    return (
        <div
            className="relative min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8"
            style={{ backgroundImage: "url('/images/background-home-desktop.svg')", backgroundAttachment: "fixed" }}
        >
            <div className="relative min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10">
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 text-center mb-8">
                            Buat Permintaan Bantuan
                        </h1>
                        <form className="space-y-6">
                            {/* Title and Location Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-lg font-semibold text-slate-700 mb-3">
                                        Judul Permintaan
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-4 bg-slate-200 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-slate-700 placeholder-slate-500"
                                        placeholder="Masukkan judul permintaan"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-semibold text-slate-700 mb-3">
                                        Lokasi
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-4 bg-slate-200 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-slate-700 placeholder-slate-500"
                                        placeholder="Masukkan lokasi"
                                    />
                                </div>
                            </div>

                            {/* Deadline and Status Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-lg font-semibold text-slate-700 mb-3">
                                        Batas Waktu Pengerjaan
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-4 bg-slate-200 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-slate-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-semibold text-slate-700 mb-3">
                                        Status
                                    </label>
                                    <select className="w-full px-4 py-4 bg-slate-200 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-slate-700">
                                        <option value="">Pilih status</option>
                                        <option value="high">High</option>
                                        <option value="medium">medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-lg font-semibold text-slate-700 mb-3">
                                    Deskripsi
                                </label>
                                <textarea
                                    rows={6}
                                    className="w-full px-4 py-4 bg-slate-200 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-slate-700 placeholder-slate-500 resize-none"
                                    placeholder="Jelaskan detail permintaan bantuan Anda..."
                                />
                            </div>

                            {/* Button */}
                            <div className="pt-4 text-center">
                                <button
                                    type="submit"
                                    className="px-10 py-3 bg-blue-300 hover:bg-blue-400 text-slate-800 font-semibold rounded-2xl shadow-md transition-all duration-200"
                                >
                                    Publish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
