import FormLayout from "@/Components/Layout/FormLayout";

export default function FormProsedurKerja() {
  const fields = [
    { label: "Judul", name: "judul", type: "text", placeholder: "Masukkan judul yang sesuai" },
    { label: "PDF File", name: "dokumen", type: "file", accept: ".pdf,.doc,.docx" },
  ];

  return (
    <FormLayout
      title="Tambah Prosedur Kerja"
      fields={fields}
      submitUrl="/admin/kelola-prosedur-kerja"
    />
  );
}
