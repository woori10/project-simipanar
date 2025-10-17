import FormLayout from "@/Components/Layout/FormLayout";
import { usePage } from '@inertiajs/react';
import axios from "axios";
import { useEffect, useState } from "react";

export default function FormUser() {
    const { props } = usePage();
    const id = props.id;

    const [formData, setFormData] = useState({});
    const [title, setTitle] = useState("Tambah User");
    const [submitUrl, setSubmitUrl] = useState("/admin/users");

    const [fields, setFields] = useState([
        { label: "Nama", name: "name", type: "text", placeholder: "Masukkan nama" },
        { label: "NIP", name: "nip", type: "text", placeholder: "Masukkan NIP" },
        { label: "Email", name: "email", type: "email", placeholder: "Masukkan email" },
        { label: "Satuan Kerja", name: "satker", type: "text", placeholder: "Masukkan satuan kerja" },
        { label: "No Telp", name: "no_telp", type: "text", placeholder: "Masukkan nomor telepon" },
        { label: "Role", name: "role", type: "text", placeholder: "Masukkan role" },
        { label: "Password", name: "password", type: "password", placeholder: "Masukkan password" },
    ]);

    useEffect(() => {
        if (id) {
            setTitle("Edit User");
            setSubmitUrl(`/admin/users/${id}`);

            axios.get(`/admin/users/${id}`)
                .then((res) => {
                    const user = res.data.user;
                    setFormData(user);
                    setFields(prev =>
                        prev.map(f => ({ ...f, value: user[f.name] || "" }))
                    );
                })
                .catch((err) => console.error("Error ambil data user:", err));
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
