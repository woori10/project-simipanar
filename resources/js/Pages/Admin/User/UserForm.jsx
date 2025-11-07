import FormLayout from "@/Components/Layout/FormLayout";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from '@inertiajs/react';
import axios from "axios";
import { useEffect, useState } from "react";

export default function FormUser() {

    const { props } = usePage();
    const id = props.id;
    const [formData, setFormData] = useState({
        name:"",
        nip:"",
        email:"",
        satker:"",
        no_telp:"",
        role:"",
        password:"",
    });
    const [title, setTitle] = useState("Tambah User");
    const [submitUrl, setSubmitUrl] = useState("/admin/users");

    const fields = ([
        { label: "Nama", name: "name", type: "text", placeholder: "Masukkan nama" },
        { label: "NIP", name: "nip", type: "text", placeholder: "Masukkan NIP" },
        { label: "Email", name: "email", type: "email", placeholder: "Masukkan email" },
        { label: "Satuan Kerja", name: "satker", type: "text", placeholder: "Masukkan satuan kerja" },
        { label: "No Telp", name: "no_telp", type: "text", placeholder: "Masukkan nomor telepon" },
        { label: "Role", name: "role", type: "text", placeholder: "Masukkan role" },
        { label: "Password", name: "password", type: "password", placeholder: "Masukkan password" },
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                // edit data
                await axios.put(`/admin/users/${id}`, formData);
                alert("User berhasil diperbarui!");
            } else {
                // tambah data
                await axios.post("/admin/users", formData);
                alert("User berhasil ditambahkan!");
            }

            Inertia.visit("/admin/kelola-user"); // redirect balik ke halaman list user
            } catch (error) {
            console.error("Gagal menyimpan data:", error);
            }
        };

    useEffect(() => {
        if (id) {
            setTitle("Edit User");
            setSubmitUrl(`/admin/users/${id}`);

            axios.get(`/admin/users/${id}`)
            .then((res) => {
                const user = res.data.user;
                if (user) {
                    setFormData({
                    name: user.name,
                    nip: user.nip,
                    email: user.email,
                    satker: user.satker,
                    no_telp: user.no_telp,
                    role: user.role,
                    password: user.password,
                    });
                }
            })
        } else {
            // Tambah mode
            setFormData({
            name: "",
            nip: "",
            email: "",
            satker: "",
            no_telp: "",
            role: "",
            password: "",
            });
        }
    }, [id]);

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
