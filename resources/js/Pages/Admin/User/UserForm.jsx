import FormLayout from "@/Components/Layout/FormLayout";
import SuccessModal from "@/Components/Modal/SuccessModal";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from '@inertiajs/react';
import axios from "axios";
import { useEffect, useState } from "react";

export default function FormUser() {

    const { props } = usePage();
    const id = props.id;
    const [title, setTitle] = useState("Tambah User");
    const [submitUrl, setSubmitUrl] = useState("/admin/users");
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        name:"",
        nip:"",
        email:"",
        satker:"",
        no_telp:"",
        role:"",
        // password:"",
    });

    const fields = ([
        { label: "Nama", name: "name", type: "text", placeholder: "Masukkan nama" },
        { label: "NIP", name: "nip", type: "text", placeholder: "Masukkan NIP" },
        { label: "Email", name: "email", type: "email", placeholder: "Masukkan email" },
        { label: "Satuan Kerja", name: "satker", type: "autocomplete", placeholder: "Masukkan satuan kerja" },
        { label: "No Telp", name: "no_telp", type: "text", placeholder: "Masukkan nomor telepon" },
        { label: "Role", name: "role", type: "text", placeholder: "Masukkan role" },
        // { label: "Password", name: "password", type: "password", placeholder: "Masukkan password" },
    ]);

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
                        res = await axios.post(`/admin/users/${id}`, data, {
                            headers: { "X-HTTP-Method-Override": "PUT" },
                        });
                    } else {
                        // Tambah
                        res = await axios.post("/admin/users", data);
                    }

                    // tampilkan success modal
                    setSuccessMessage(res.data.message);
                    setShowSuccess(true);

                    // timer modal + callback untuk refresh table / close form
                    setTimeout(() => {
                        setShowSuccess(false);
                        Inertia.visit("/admin/kelola-user"); // tetap redirect ke table setelah modal
                    }, 1500);

                } catch (error) {
                    console.error("Gagal kirim:", error);
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
