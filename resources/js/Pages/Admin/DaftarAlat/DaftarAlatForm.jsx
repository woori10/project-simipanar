import FormLayout from "@/Components/Layout/FormLayout";
import { usePage } from '@inertiajs/react';
import axios from "axios";
import { useEffect, useState } from "react";

export default function FormFaq() {

    const { props } = usePage();
    const id = props.id;
    const [formData, setFormData] = useState({});
    const [title, setTitle] = useState("Tambah Alat");
    const [submitUrl, setSubmitUrl] = useState("/admin/daftar_alat");
    const [fields, setFields] = useState([
        { label: "Nama Alat", name: "namaAlat", type: "text", placeholder: "Masukkan nama alat" },
        { label: "Gambar", name: "gambarAlat",  type: "file", accept: "image/*" },
    ]);

    useEffect(() => {
        if (id) {
            setTitle("Edit Alat");
            setSubmitUrl(`/admin/daftar_alat/${id}`); // ← tambahin slash juga di sini!

            axios.get(`/admin/daftar_alat/${id}`)
            .then((res) => {
                const alat = res.data;
                if (alat) { // ← pastikan datanya ada
                setFormData(alat);
                setFields(prev =>
                    prev.map(f => ({ ...f, value: alat[f.name] || "" }))
                );
                }
            })
            .catch((err) => console.error("Error ambil data alat:", err));
        }
    }, [id]);

  return (
    <FormLayout
        title={title}
        fields={fields}
        submitUrl={submitUrl}
        initialValues={formData}
    />
  );
}
