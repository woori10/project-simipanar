import FormLayout from "@/Components/Layout/FormLayout";
import { usePage } from '@inertiajs/react';
import axios from "axios";
import { useEffect, useState } from "react";

export default function FormFaq() {

    const { props } = usePage();
        const id = props.id;
        const [formData, setFormData] = useState({});
        const [title, setTitle] = useState("Tambah Faq");
        const [submitUrl, setSubmitUrl] = useState("/admin/faqs");

    const [fields, setFields] = useState ([
        { label: "Pertanyaan", name: "pertanyaan", type: "text", placeholder: "Masukkan pertanyaan" },
        { label: "Jawaban", name: "jawaban", type: "text", placeholder: "Masukkan jawaban" },
    ]);

  useEffect(() => {
          if (id) {
              setTitle("Edit Faq");
              setSubmitUrl(`/admin/faqs/${id}`);

              axios.get(`/admin/faqs/${id}`)
                  .then((res) => {
                      const faqs = res.data.faqs;
                      setFormData(faqs);
                      setFields(prev =>
                          prev.map(f => ({ ...f, value: faqs[f.name] || "" }))
                      );
                  })
                  .catch((err) => console.error("Error ambil data faq:", err));
          }
      }, [id]);

  return (
    <FormLayout
        title={title}
        fields={fields}
        submitUrl={submitUrl}
        initialValues={formData}
    />
  );
}
