import FormLayout from "@/Components/Layout/FormLayout";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FormProsedurKerja() {

    const { props } = usePage();
    const id = props.id;
    const [formData, setFormData] = useState({
        judul: "",
        dokumen: null,
        dokumen_url: "", // buat nampung nama/URL file lama
    });
    const [title, setTitle] = useState("Tambah Prosedur Kerja");
    const [submitUrl, setSubmitUrl] = useState("/admin/prosedur-kerja");

    const handleSubmit = async (e, formData) => {
        e.preventDefault();
            const data = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    if (value !== null) data.append(key, value);
                });

                try {
                    if (id) {
                        // 🟢 Mode Edit → PUT
                        await axios.post(`/admin/prosedur-kerja/${id}`, data, {
                            headers: { "X-HTTP-Method-Override": "PUT" },
                        });
                        alert("Prosedur Kerja berhasil diperbarui!");
                    } else {
                        // 🟢 Mode Tambah → POST
                        await axios.post("/admin/prosedur-kerja", data);
                        alert("Prosedur Kerja berhasil ditambahkan!");
                    }

                    Inertia.visit("/admin/kelola-prosedur-kerja");
                } catch (error) {
                    console.error("Gagal kirim:", error);
                }
        };

    useEffect(() => {
        if (id) {
            setTitle("Edit Prosedur Kerja");
            setSubmitUrl(`/admin/prosedur-kerja/${id}`);

            axios.get(`/admin/prosedur-kerja/${id}`)
            .then((res) => {
                const data = res.data;
                setFormData({
                judul: data.judul || "",
                dokumen: null, // biar input file tetap kosong
                dokumen_url: data.dokumen_url || "", // buat nampilin nama file lama
                });
            })
            .catch((err) => console.error("Gagal ambil data prosedur kerja:", err));
        } else {
            // ini cuma jalan kalau mode tambah (bukan edit)
            setFormData({
            judul: "",
            dokumen: null,
            dokumen_url: "",
            });
        }
    }, [id]);


    const fields = [
        { label: "Judul", name: "judul", type: "text", placeholder: "Masukkan judul yang sesuai" },
        { label: "PDF File", name: "dokumen", type: "file", accept: ".pdf,.doc,.docx" },
    ];

    return (
        <FormLayout
            title={title}
            fields={fields}
            formData={formData}
            submitUrl={submitUrl}
            setFormData={setFormData}
            onSubmit={handleSubmit}
        />
    );
}
