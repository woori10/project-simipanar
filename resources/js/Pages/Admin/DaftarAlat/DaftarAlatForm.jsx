import AlertModalHooks from "@/Components/Hooks/AlertModalHooks";
import FormLayout from "@/Components/Layout/FormLayout";
import AlertModal from "@/Components/Modal/AlertModal";
import SuccessModal from "@/Components/Modal/SuccessModal";

import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FormDaftarAlat() {

    const { props } = usePage();
    const id = props.id;

    const [title, setTitle] = useState("Tambah Alat");
    const [submitUrl, setSubmitUrl] = useState("/admin/daftar-alat");

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const { alert, showAlert } = AlertModalHooks();

    const [formData, setFormData] = useState({
        nama_alat: "",
        kategori: "",
        foto: null,
        foto_url: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nama_alat) {
            showAlert("Nama alat wajib diisi");
            return;
        }
        if (!formData.kategori) {
            showAlert("Kategori wajib dipilih");
            return;
        }
        if (!id && !formData.foto) {
            showAlert("Gambar alat wajib diupload");
            return;
        }

        const data = new FormData();

        // kirim hanya field yang dibutuhkan backend
        data.append("nama_alat", formData.nama_alat);
        data.append("kategori", formData.kategori);

        if (formData.foto) {
            data.append("foto", formData.foto);
        }

        try {
            let res;

            if (id) {
                res = await axios.post(`/admin/daftar-alat/${id}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-HTTP-Method-Override": "PUT",
                    },
                });
            } else {
                res = await axios.post("/admin/daftar-alat", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            setSuccessMessage(res.data.message);
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                Inertia.visit("/admin/kelola-daftar-alat");
            }, 1500);

        } catch (error) {
            console.error("Gagal kirim:", error.response?.data || error);
        }
    };



    useEffect(() => {
        if (id) {
            setTitle("Edit Alat");
            setSubmitUrl(`/admin/daftar-alat/${id}`);

            axios.get(`/admin/daftar-alat/${id}`)
                .then((res) => {
                    const alat = res.data;
                    if (alat) {
                        setFormData({
                            nama_alat: alat.nama_alat,
                            kategori: alat.kategori,
                            foto: null,
                            foto_url: alat.foto,
                        });
                    }
                });
        } else {
            setFormData({
                nama_alat: "",
                kategori: "",
                foto: null,
                foto_url: "",
            });
        }
    }, [id]);

    const fields = [
        { label: "Nama Alat", name: "nama_alat", type: "text", placeholder: "Masukkan nama alat" },
        {
            label: "Kategori",
            name: "kategori",
            type: "select",
            options: [
                { label: "Alat Deteksi", value: "Alat Deteksi" },
                { label: "Alat Identifikasi", value: "Alat Identifikasi" },
            ]
        },
        { label: "Gambar", name: "foto", type: "file", accept: "image/*" },
    ];

    return (
        <>
            <FormLayout
                title={title}
                fields={fields}
                formData={formData}
                submitUrl={submitUrl}
                setFormData={setFormData}
                onSubmit={handleSubmit}
            />

            <SuccessModal show={showSuccess} message={successMessage} />
            <AlertModal show={alert.show} message={alert.message} />
        </>
    );
}
