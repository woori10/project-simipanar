import FormLayout from "@/Components/Layout/FormLayout";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from '@inertiajs/react';
import axios from "axios";
import { useEffect, useState } from "react";

export default function FormDaftarAlat() {

    const { props } = usePage();
    const id = props.id;
    const [formData, setFormData] = useState({
        nama_alat: "",
        deskripsi: "",
        foto: null,
    });
    const [title, setTitle] = useState("Tambah Alat");
    const [submitUrl, setSubmitUrl] = useState("/admin/daftar_alat");

    // const handleSubmit = (e, formData) => {
    //     e.preventDefault();

    //     const data = new FormData();
    //     Object.entries(formData).forEach(([key, value]) => {
    //       if (value !== null) data.append(key, value);
    //     });

    //     Inertia.post(submitUrl, data, {
    //       onSuccess: () => {
    //         console.log("Data berhasil disimpan!");
    //       },
    //       onError: (err) => console.error("Gagal kirim:", err),
    //     });
    //   };

    const handleSubmit = async (e, formData) => {
        e.preventDefault();
            const data = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    if (value !== null) data.append(key, value);
                });

                try {
                    if (id) {
                        // 🟢 Mode Edit → PUT
                        await axios.post(`/admin/daftar-alat/${id}`, data, {
                            headers: { "X-HTTP-Method-Override": "PUT" },
                        });
                        alert("Daftar Alat berhasil diperbarui!");
                    } else {
                        // 🟢 Mode Tambah → POST
                        await axios.post("/admin/daftar-alat", data);
                        alert("Daftar Alat berhasil ditambahkan!");
                    }

                    // redirect ke halaman kelola faq
                    Inertia.visit("/admin/kelola-daftar-alat");
                } catch (error) {
                    console.error("Gagal kirim:", error);
                }
        };

    useEffect(() => {
        if (id) { // Edit mode
            setTitle("Edit Alat");
            setSubmitUrl(`/admin/daftar-alat/${id}`);

            axios.get(`/admin/daftar-alat/${id}`)
            .then((res) => {
                const alat = res.data;
                if (alat) {
                    setFormData({
                    nama_alat: alat.nama_alat,
                    kategori: alat.kategori,
                    foto: null, // untuk file baru nanti
                    foto_url: alat.foto // simpan URL lama di properti terpisa
                    });
                }
            })
        } else {
            // Tambah mode
            setFormData({
            nama_alat: "",
            deskripsi: "",
            foto: null,
            foto_url : "",
            });
        }
    }, [id]);

    const fields = ([
        { label: "Nama Alat", name: "nama_alat", type: "text", placeholder: "Masukkan nama alat" },
        { label: "Kategori", name: "kategori", type: "select",
            options: [
            { label: "Alat Deteksi", value: "Alat Deteksi" },
            { label: "Alat Identifikasi", value: "Alat Identifikasi" },
            ]
         },
        { label: "Gambar", name: "foto",  type: "file", accept: "image/*" },
    ]);

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
