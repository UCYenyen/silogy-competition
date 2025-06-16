type IPermintaan = {
    id: number;
    nama_permintaan: string;
    lokasi_permintaan: string;
    deskripsi_permintaan: string;
    upah_permintaan: number;
    status_permintaan: string;
    created_at: string;
    pembuat_id: number;
    penerima_id: number;
    tingkat_kedaruratan: string;
    // add other properties if needed
};
export type { IPermintaan };