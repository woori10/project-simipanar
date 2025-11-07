import FormLayout from "@/Components/Layout/FormLayout";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FormVideoTutorial() {

  const { props } = usePage();
  const id = props.id;
  const [alatOptions, setAlatOptions] = useState([]);
  const [formData, setFormData] = useState({
    daftar_alat_id: "",
    judul_video: "",
    video: null,
  });
  const [title, setTitle] = useState("Tambah Video Tutorial");
  const [submitUrl, setSubmitUrl] = useState("/admin/video-tutorial");

  // Ambil daftar alat
  useEffect(() => {
    axios
      .get("/admin/daftar-alat")
      .then((res) => setAlatOptions(res.data.alats || []))
      .catch((err) => console.error("Gagal ambil data alat:", err));
  }, []);

  // Kalau ada id → ambil data video untuk diedit
  useEffect(() => {
    if (id) {
      setTitle("Edit Video Tutorial");
      setSubmitUrl(`/admin/video-tutorial/${id}`);

      axios
        .get(`/admin/video-tutorial/${id}`)
        .then((res) => {
          const video = res.data;
          if (video) {
            setFormData({
              daftar_alat_id: video.daftar_alat_id ?? "",
              judul_video: video.judul_video ?? "",
              video: null, // biar user bisa upload baru kalau mau
              video_url: video.video ?? null, // bisa kamu tampilkan preview-nya di FormLayout nanti
            });
          }
        })
        .catch((err) => console.error("Gagal ambil data video:", err));
    } else {
      // reset form kalau mode tambah
      setFormData({
        daftar_alat_id: "",
        judul_video: "",
        video: null,
        video_url: null,
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
                      await axios.post(`/admin/video-tutorial/${id}`, data, {
                          headers: { "X-HTTP-Method-Override": "PUT" },
                      });
                      alert("Video Tutorial berhasil diperbarui!");
                  } else {
                      await axios.post("/admin/video-tutorial", data);
                      alert("Video Tutorial berhasil ditambahkan!");
                  }

                  Inertia.visit("/admin/kelola-video-tutorial");
                  } catch (error) {
                      console.error("Gagal kirim:", error);
              }
          };

  const fields = [
    { label: "Judul Video", name: "judul_video", type: "text", placeholder: "Masukkan judul video" },
    {
      label: "Nama Alat",
      name: "daftar_alat_id",
      type: "select",
      options: alatOptions.map((alat) => ({
        label: alat.nama_alat,
        value: alat.id,
      })),
    },
    { label: "Video", name: "video", type: "file", accept: "video/*" },
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
