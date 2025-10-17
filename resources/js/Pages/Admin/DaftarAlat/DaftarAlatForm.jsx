import FormLayout from "@/Components/Layout/FormLayout";

export default function FormFaq() {
  const fields = [
    { label: "Nama Alat", name: "pertanyaan", type: "text", placeholder: "Masukkan pertanyaan" },
    { label: "Gambar", name: "gambarAlat",  type: "file", accept: "image/*" },
  ];

  return (
    <FormLayout
      title="Tambah Faq"
      fields={fields}
      submitUrl="/admin/kelola-faq"
    />
  );
}
