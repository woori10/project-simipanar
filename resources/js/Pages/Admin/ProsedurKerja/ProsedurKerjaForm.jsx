import FormLayout from "@/Components/Layout/FormLayout";
import SuccessModal from "@/Components/Modal/SuccessModal";
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
        dokumen_url: "",
    });

    const [title, setTitle] = useState("Tambah Prosedur Kerja");
    const [submitUrl, setSubmitUrl] = useState("/admin/prosedur-kerja");
    const [previewUrl, setPreviewUrl] = useState(null); // ✅ untuk preview PDF

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

  // 🧩 Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

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

        // timer modal + callback untuk refresh table / close form
        setTimeout(() => {
            setShowSuccess(false);
                Inertia.visit("/admin/kelola-prosedur-kerja"); // tetap redirect ke table setelah modal
        }, 1500);

        } catch (error) {
        console.error("Gagal kirim:", error);
        }
  };

  // 🧩 Handle ganti file PDF
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        dokumen: file,
        dokumen_url: "",
      }));
      setPreviewUrl(URL.createObjectURL(file)); // ✅ tampilkan preview file baru
    }
  };

  // 🧩 Ambil data untuk mode edit
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

          // ✅ tampilkan PDF lama kalau ada
          setPreviewUrl(data.dokumen_url || null);
        })
        .catch((err) => console.error("Gagal ambil data:", err));
    }
  }, [id]);

  // 🧩 Field form
  const fields = [
    {
      label: "Judul",
      name: "judul",
      type: "text",
      placeholder: "Masukkan judul yang sesuai",
    },
    {
      label: "PDF File",
      name: "dokumen",
      type: "file",
      accept: ".pdf,.doc,.docx",
      onChange: handleFileChange, // ✅ supaya preview langsung muncul
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

    </>
  );
}
