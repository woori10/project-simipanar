import AppLayout from "@/Components/Layout/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function FormModulDiklat({ title }) {
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

    Inertia.post("/admin/kelola-video-tutorial", data);
  };

  return (
    <AppLayout>
      <Head title={title} />
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-lg font-bold">{title}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Judul */}
          <div>
            <label className="block mb-2 font-medium">Judul</label>
            <input
              type="text"
              name="judul"
              value={form.judul}
              onChange={handleInputChange}
              placeholder="Masukkan judul yang sesuai"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gambar Sampul */}
          <div>
            <label className="block mb-2 font-medium">Gambar Sampul</label>
            <label className="block w-full p-6 border border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500">
              <div className="space-y-2">
                <p>Drag and Drop Your File Here!</p>
                <p className="text-sm text-gray-400">
                  Please upload JPG, JPEG, PNG or SVG files. Max 5 MB
                </p>
                <input
                  type="file"
                  name="gambarSampul"
                  accept=".jpg,.jpeg,.png,.svg"
                  onChange={handleChange}
                  className="hidden"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={() => document.querySelector('input[name="gambarSampul"]').click()}
                >
                  Upload File
                </button>
              </div>
            </label>
          </div>

          {/* PDF File */}
          <div>
            <label className="block mb-2 font-medium">Pdf File</label>
            <label className="block w-full p-6 border border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500">
              <div className="space-y-2">
                <p>Drag and Drop Your File Here!</p>
                <p className="text-sm text-gray-400">
                  Please upload PDF, DOCX, DOC or XLSX files. Max 5 MB
                </p>
                <input
                  type="file"
                  name="pdfFile"
                  accept=".pdf,.docx,.doc,.xlsx"
                  onChange={handleChange}
                  className="hidden"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={() => document.querySelector('input[name="pdfFile"]').click()}
                >
                  Upload File
                </button>
              </div>
            </label>
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
