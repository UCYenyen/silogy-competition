"use client";
import { useUser } from "@/context/UserContext";
import supabase from "@/lib/db";

interface TakeQuestButtonProps {
    questId: number;
    pembuat_id: number;
}

export default function TakeQuestButton({ questId, pembuat_id }: TakeQuestButtonProps) {
    const { loggedInUser } = useUser();
    const questIdNumber = Number(questId);

    return (
        <form
            action={async () => {
            if (!loggedInUser) {
                alert("Anda harus login untuk mengambil permintaan ini.");
                return;
            }
            if (pembuat_id == 0) {
                alert("Anda harus login untuk mengambil permintaan ini.");
                return;
            }

            const deskripsi = prompt("Masukkan deskripsi atau pesan Anda:");
            if (!deskripsi) {
            alert("Deskripsi tidak boleh kosong.");
            return;
            }

            console.log("Inserting data:", {
            permintaan_id: questIdNumber,
            pembuat_id: pembuat_id,
            calon_penerima_id: loggedInUser.id,
            status_penerimaan: "Pending",
            deskripsi_penawar: deskripsi,
            });

            const { error } = await supabase
            .from("users_permintaan")
            .insert([
                {
                permintaan_id: questIdNumber,
                pembuat_id: pembuat_id,
                calon_penerima_id: loggedInUser.id,
                status_penerimaan: "Pending",
                deskripsi_penawar: deskripsi,
                },
            ])
            .select();

            if (error) {
            console.error("Error inserting data:", error.message);
            alert("Terjadi kesalahan saat mengambil permintaan. Silakan coba lagi.");
            return;
            }
            alert("Permintaan berhasil diambil! silakan tunggu konfirmasi dari pembuat permintaan.");
            window.location.reload();
            }}
        >
            <button
            type="submit"
            className="p-2 px-8 text-2xl text-white bg-blue-400 text-center rounded-2xl"
            >
            Tolong
            </button>
        </form>
    );
}
