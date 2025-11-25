import AlertModalHooks from "@/Components/Hooks/AlertModalHooks";
import FormLayout from "@/Components/Layout/FormLayout";
import AlertModal from "@/Components/Modal/AlertModal";
import SuccessModal from "@/Components/Modal/SuccessModal";

import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FormProsedurKerja() {
    const { props } = usePage();
    const id = props.id;

    const { alert, showAlert } = AlertModalHooks();

    const [formData, setFormData] = useState({
        judul: "",
        dokumen: null,
        dokumen_url: "",
    });

    const [title, setTitle] = useState("Tambah Prosedur Kerja");
    const [submitUrl, setSubmitUrl] = useState("/admin/prosedur-kerja");
    const [previewUrl, setPreviewUrl] = useState(null);

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // 🧩 Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // VALIDASI
        if (!formData.judul) {
            showAlert("Judul wajib diisi");
            return;
        }

        if (!id && !formData.dokumen) {
            // Tambah: dokumen wajib
            showAlert("File dokumen wajib diupload");
            return;
        }

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) data.append(key, value);
        });

        try {
            let res;

            if (id) {
                res = await axios.post(`/admin/prosedur-kerja/${id}`, data, {
                    headers: { "X-HTTP-Method-Override": "PUT" },
                });
            } else {
                res = await axios.post("/admin/prosedur-kerja", data);
            }

            setSuccessMessage(res.data.message);
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                Inertia.visit("/admin/kelola-prosedur-kerja");
            }, 1500);

        } catch (error) {
            console.error("Gagal kirim:", error);
        }
    };

    // 🧩 Handle Upload File
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                dokumen: file,
                dokumen_url: "",
            }));

            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // 🧩 Ambil data jika Edit
    useEffect(() => {
        if (id) {
            setTitle("Edit Prosedur Kerja");
            setSubmitUrl(`/admin/prosedur-kerja/${id}`);

            axios
                .get(`/admin/prosedur-kerja/${id}`)
                .then((res) => {
                    const data = res.data;

                    setFormData({
                        judul: data.judul || "",
                        dokumen: null,
                        dokumen_url: data.dokumen_url || "",
                    });

                    setPreviewUrl(data.dokumen_url || null);
                })
                .catch((err) => console.error("Gagal ambil data:", err));
        }
    }, [id]);

    // 🧩 List Field
    const fields = [
        {
            label: "Judul",
            name: "judul",
            type: "text",
            placeholder: "Masukkan judul yang sesuai",
        },
        {
            label: "File Dokumen",
            name: "dokumen",
            type: "file",
            accept: ".pdf,.doc,.docx",
            onChange: handleFileChange,
        },
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
