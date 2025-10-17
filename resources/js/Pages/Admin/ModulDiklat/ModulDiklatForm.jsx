import FormLayout from "@/Components/Layout/FormLayout";

export default function FormModulDiklat() {
  const fields = [
    { label: "Nama", name: "judul", type: "text", placeholder: "Masukkan judul yang sesuai" },
    { label: "Gambar Sampul", name: "gambarSampul", type: "file", accept: "image/*" },
    { label: "PDF File", name: "pdfFile", type: "file", accept: ".pdf,.doc,.docx" },
  ];

  return (
    <FormLayout
      title="Tambah Modul Diklat"
      fields={fields}
      submitUrl="/admin/kelola-modul-diklat"
    />
  );
}
