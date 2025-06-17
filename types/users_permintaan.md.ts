type IUserPermintaan = {
    id: number;
    permintaan_id: number;
    pembuat_id: number;
    calon_penerima_id: number;
    status_penerimaan: string;

    nama_permintaan: string;
    deskripsi_permintaan: string;
    tingkat_kedaruratan: string;
    lokasi_permintaan: string;
    upah_permintaan: number;
    status_permintaan: string;
    // add other properties if needed
};
export type { IUserPermintaan };