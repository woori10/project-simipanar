import FormLayout from "@/Components/Layout/FormLayout";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FormModulDiklat() {

  const { props } = usePage();
  const id = props.id;
  const [alatOptions, setAlatOptions] = useState([]);
  const [formData, setFormData] = useState({
    daftar_alat_id: "",
    dokumen: null,
  });
  const [title, setTitle] = useState("Tambah Modul Diklat");
  const [submitUrl, setSubmitUrl] = useState("/admin/modul-diklat");

  useEffect(() => {
    axios
      .get("/admin/daftar-alat")
      .then((res) => setAlatOptions(res.data.alats || []))
      .catch((err) => console.error("Gagal ambil data alat:", err));
  }, []);

  useEffect(() => {
    if (id) {
      setTitle("Edit Modul Diklat");
      setSubmitUrl(`/admin/modul-diklat/${id}`);

      axios
        .get(`/admin/modul-diklat/${id}`)
        .then((res) => {
          const modul = res.data;
          if (modul) {
            setFormData({
              daftar_alat_id: modul.daftar_alat_id ?? "",
              dokumen: null, // file lama tetap ditampilkan
              dokumen_url: modul.dokumen ?? null,
            });
          }
        })
        .catch((err) => console.error("Gagal ambil data modul:", err));
    } else {
      setFormData({
        daftar_alat_id: "",
        dokumen: null,
        dokumen_url : null ,
      });
    }
  }, [id]);


    const handleSubmit = async (e, formData) => {
        e.preventDefault();
            const data = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    if (value !== null) data.append(key, value);
                });

            try {
                if (id) {
                    await axios.post(`/admin/modul-diklat/${id}`, data, {
                        headers: { "X-HTTP-Method-Override": "PUT" },
                    });
                    alert("Modul Diklat berhasil diperbarui!");
                } else {
                    await axios.post("/admin/modul-diklat", data);
                    alert("Modul Diklat berhasil ditambahkan!");
                }

                Inertia.visit("/admin/kelola-modul-diklat");
                } catch (error) {
                    console.error("Gagal kirim:", error);
            }
        };

  const fields = [
    {
      label: "Nama Alat",
      name: "daftar_alat_id",
      type: "select",
      options: alatOptions.map((alat) => ({
        label: alat.nama_alat,
        value: alat.id,
      })),
    },
    {
      label: "Dokumen (PDF)",
      name: "dokumen",
      type: "file",
      accept: ".pdf",
    },
  ];

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
