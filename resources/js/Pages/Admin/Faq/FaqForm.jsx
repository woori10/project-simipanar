import FormLayout from "@/Components/Layout/FormLayout";
import SuccessModal from "@/Components/Modal/SuccessModal";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from '@inertiajs/react';
import axios from "axios";
import { useEffect, useState } from "react";


export default function FormFaq() {

    const { props } = usePage();
    const id = props.id;
    const [title, setTitle] = useState("Tambah Faq");
    const [submitUrl, setSubmitUrl] = useState("/admin/faqs");
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        pertanyaan: "",
        jawaban: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null) data.append(key, value);
            });

            try {
                let res;
                if (id) {
                    // Edit
                    res = await axios.post(`/admin/faqs/${id}`, data, {
                        headers: { "X-HTTP-Method-Override": "PUT" },
                    });
                } else {
                    // Tambah
                    res = await axios.post("/admin/faqs", data);
                }

                // tampilkan success modal
                setSuccessMessage(res.data.message);
                setShowSuccess(true);

                // timer modal + callback untuk refresh table / close form
                setTimeout(() => {
                    setShowSuccess(false);
                    Inertia.visit("/admin/kelola-faq"); // tetap redirect ke table setelah modal
                }, 1500);

            } catch (error) {
                console.error("Gagal kirim:", error);
            }
    };



    useEffect(() => {
        if (id) {
            setTitle("Edit Faq");
            setSubmitUrl(`/admin/faqs/${id}`); // 🟢 URL edit

            axios.get(`/admin/faqs/${id}`)
            .then((res) => {
                 const faq = res.data.faqs;
                if (faq) {
                setFormData({
                    pertanyaan: faq.pertanyaan,
                    jawaban: faq.jawaban,
                });
                }
            })
            .catch((err) => console.error("Gagal ambil data FAQ:", err));
        } else {
            setTitle("Tambah Faq");
            setSubmitUrl("/admin/faqs"); // 🟢 URL tambah
            setFormData({
            pertanyaan: "",
            jawaban: "",
            });
        }
    }, [id]);

    const fields = ([
        { label: "Pertanyaan", name: "pertanyaan", type: "text", placeholder: "Masukkan pertanyaan" },
        { label: "Jawaban", name: "jawaban", type: "text", placeholder: "Masukkan jawaban" },
    ]);

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
        </>



    );
}
