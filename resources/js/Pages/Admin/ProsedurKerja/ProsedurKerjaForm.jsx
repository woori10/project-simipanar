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
    dokumen_url: "",
  });

  const [title, setTitle] = useState("Tambah Prosedur Kerja");
  const [submitUrl, setSubmitUrl] = useState("/admin/prosedur-kerja");
  const [previewUrl, setPreviewUrl] = useState(null); // ✅ untuk preview PDF

  // 🧩 Handle submit form
  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      if (id) {
        await axios.post(`/admin/prosedur-kerja/${id}`, data, {
          headers: { "X-HTTP-Method-Override": "PUT" },
        });
        alert("Prosedur Kerja berhasil diperbarui!");
      } else {
        await axios.post("/admin/prosedur-kerja", data);
        alert("Prosedur Kerja berhasil ditambahkan!");
      }
      Inertia.visit("/admin/kelola-prosedur-kerja");
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

      {/* === PREVIEW PDF ===
      {previewUrl && (
        <div className="mt-6 border rounded-lg p-4 bg-gray-50 shadow-sm">
          <h3 className="font-semibold mb-2 text-main-blue">
            Preview Dokumen:
          </h3>
          <iframe
            src={previewUrl}
            title="Preview PDF"
            className="w-full h-[600px] border rounded-md"
          />
        </div>
      )} */}
    </>
  );
}
