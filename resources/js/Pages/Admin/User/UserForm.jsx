import AppLayout from "@/Components/Layout/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function FormUser({ title }) {
  const [form, setForm] = useState({
    judul: "",
    gambarSampul: null,
    pdfFile: null,
  });

  const handleChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("judul", form.judul);
    if (form.gambarSampul) data.append("gambarSampul", form.gambarSampul);
    if (form.pdfFile) data.append("pdfFile", form.pdfFile);

    Inertia.post("/admin/kelola-user", data);
  };

  return (
    <AppLayout>
      <Head title={title} />
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-lg font-bold">{title}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Pertanyaan */}
          <div>
            <label className="block mb-2 font-medium">Pertanyaan</label>
            <input
              type="text"
              name="judul"
              value={form.judul}
              onChange={handleInputChange}
              placeholder="Masukkan judul yang sesuai"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Jawaban */}
          <div>
            <label className="block mb-2 font-medium">Jawaban</label>
            <input
              type="text"
              name="judul"
              value={form.judul}
              onChange={handleInputChange}
              placeholder="Masukkan judul yang sesuai"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>



          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 border rounded text-gray-700"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">
              Upload
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
