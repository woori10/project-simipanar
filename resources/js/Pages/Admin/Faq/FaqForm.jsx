import FormLayout from "@/Components/Layout/FormLayout";

export default function FormFaq({onPageLoaded}) {

    useEffect(() => {
    if (onPageLoaded) onPageLoaded(); // ✅ hanya dipanggil, tidak diteruskan
  }, []);
  const fields = [
    { label: "Pertanyaan", name: "pertanyaan", type: "text", placeholder: "Masukkan pertanyaan" },
    { label: "Jawaban", name: "jawaban", type: "text", placeholder: "Masukkan jawaban" },
  ];

  return (
    <FormLayout
      title="Tambah Faq"
      fields={fields}
      submitUrl="/admin/kelola-faq"
    />
  );
}
