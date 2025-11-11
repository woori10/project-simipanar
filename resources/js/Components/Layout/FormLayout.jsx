import AppLayout from "@/Components/Layout/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import AutoCompleteInput from "../Input/AutoCompleteInput";

export default function FormLayout({
  title,
  fields,
  submitUrl,
  initialValues = {},
  formData,
  setFormData,
  onSubmit,
}) {
  const { errors } = usePage().props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔹 Handle perubahan input umum
  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onSubmit) return onSubmit(e, formData);

    setIsSubmitting(true);
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });

    try {
      await Inertia.post(submitUrl, data, {
        forceFormData: true,
        preserveScroll: true,
        onFinish: () => setIsSubmitting(false),
      });
    } catch (error) {
      console.error("Gagal mengirim form:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <Head title={title} />
      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block mb-2 font-medium text-main-blue">
                {field.label}
              </label>

              {/* === TEXTAREA === */}
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData?.[field.name] ?? ""}
                  onChange={handleChange}
                  placeholder={field.placeholder || ""}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : field.type === "file" ? (
                /* === FILE INPUT === */
                <div className="space-y-2">
                  {formData?.[field.name] instanceof File ||
                  typeof formData?.[field.name] === "string" ||
                  formData?.[`${field.name}_url`] ? (
                    <>
                      {/* === TAMPIL NAMA FILE === */}
                      <div className="flex items-center justify-between border rounded-md p-3 bg-gray-50">
                        <span className="text-sm text-gray-700 truncate max-w-[80%]">
                          {formData[field.name]?.name
                            ? formData[field.name].name
                            : formData[`${field.name}_url`]
                            ? formData[`${field.name}_url`].split("/").pop()
                            : typeof formData[field.name] === "string"
                            ? formData[field.name].split("/").pop()
                            : ""}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              [field.name]: null,
                              [`${field.name}_url`]: null,
                            }))
                          }
                          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Ganti File
                        </button>
                      </div>

                      {/* === PREVIEW FILE === */}
                        {(formData[field.name] || formData[`${field.name}_url`]) &&
                        (field.accept?.includes("image") ||
                            field.accept?.includes("pdf") ||
                            field.accept?.includes("video")) && (
                            <div className="mt-3 flex flex-col items-center">
                            {field.accept?.includes("image") ? (
                                <img
                                src={
                                    formData[field.name]
                                    ? URL.createObjectURL(formData[field.name])
                                    : formData[`${field.name}_url`]
                                }
                                alt="Preview"
                                className="w-64 h-40 mt-8 mx-auto rounded-lg border"
                                />
                            ) : field.accept?.includes("pdf") ? (
                                <iframe
                                src={
                                    formData[field.name]
                                    ? URL.createObjectURL(formData[field.name])
                                    : formData[`${field.name}_url`]
                                }
                                title="Preview PDF"
                                className="w-full h-[500px] border rounded-md mt-4"
                                />
                            ) : (
                                <video
                                controls
                                className="w-80 h-56 rounded-lg border shadow-md mt-4"
                                src={
                                    formData[field.name]
                                    ? URL.createObjectURL(formData[field.name])
                                    : formData[`${field.name}_url`]
                                }
                                >
                                Browser kamu tidak mendukung video preview.
                                </video>
                            )}
                            </div>
                        )}

                    </>
                  ) : (
                    // === INPUT UPLOAD ===
                    <label className="block w-full p-6 border border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 transition">
                      <div className="space-y-2">
                        <p className="text-gray-400">
                          Drag and Drop Your File Here!
                        </p>
                        <p className="text-sm text-gray-400">
                          {field.accept?.includes("video")
                            ? "Upload MP4, AVI, MOV (max 50 MB)"
                            : field.accept?.includes("image")
                            ? "Upload JPG, PNG, SVG (max 5 MB)"
                            : "Upload PDF, DOCX, atau file lain (max 10 MB)"}
                        </p>
                        <input
                          type="file"
                          name={field.name}
                          accept={field.accept}
                          onChange={field.onChange || handleChange} // 🧠 bisa pakai custom handler dari luar
                          className="hidden"
                        />
                        <PrimaryButton
                          type="button"
                          className="px-4 py-2 bg-blue-600 text-white rounded"
                          onClick={() =>
                            document
                              .querySelector(`input[name="${field.name}"]`)
                              ?.click()
                          }
                        >
                          Upload File
                        </PrimaryButton>
                      </div>
                    </label>
                  )}
                </div>
              ) : field.type === "select" ? (
                /* === SELECT INPUT === */
                <select
                  name={field.name}
                  value={formData?.[field.name] ?? ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih alat</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "autocomplete" ? (
                <AutoCompleteInput
                    field={field}
                    formData={formData}
                    setFormData={setFormData}
                />
            ) : (
                /* === TEXT INPUT === */
                <input
                  type={field.type}
                  name={field.name}
                  value={formData?.[field.name] ?? ""}
                  onChange={handleChange}
                  placeholder={field.placeholder || ""}
                  className="w-full placeholder:text-gray-500 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              {/* === ERROR MESSAGE === */}
              {errors[field.name] && (
                <p className="text-sm text-red-600 mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          {/* === BUTTONS === */}
          <div className="flex justify-end gap-4 pt-4">
            <SecondaryButton
              type="button"
              className="px-4 py-2 uppercase border rounded text-gray-700 hover:bg-gray-100"
              onClick={() => window.history.back()}
              disabled={isSubmitting}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 text-white rounded ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
