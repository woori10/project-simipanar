import AppLayout from "@/Components/Layout/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";

export default function FormLayout({ title, fields, submitUrl, initialValues = {} }) {

    const [form, setForm] = useState(() => {
        const defaultValues = {};
        fields.forEach((f) => {
            defaultValues[f.name] = initialValues[f.name] || (f.type === "file" ? null : "");
        });
        return defaultValues;
    });

    useEffect(() => {
        const updatedValues = {};
        fields.forEach((f) => {
            updatedValues[f.name] = initialValues[f.name] || "";
        });
        setForm(updatedValues);
    }, [initialValues, fields]);

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        setForm({
            ...form,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.keys(form).forEach((key) => {
            if (form[key] !== null) data.append(key, form[key]);
        });

        Inertia.post(submitUrl, data);
    };

    return (
        <AppLayout>
            <Head title={title} />
            <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="block mb-2 font-medium text-main-blue">{field.label}</label>

                            {field.type === "textarea" ? (
                                <textarea
                                    name={field.name}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder || ""}
                                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                />
                            ) : field.type === "file" ? (
                                <label className="block w-full p-6 border border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500">
                                    <div className="space-y-2">
                                        <p className="text-gray-400">Drag and Drop Your File Here!</p>
                                        <p className="text-sm text-gray-400">
                                            {field.accept?.includes("image")
                                                ? "Please upload JPG, PNG, SVG (max 5 MB)"
                                                : field.accept?.includes("video")
                                                ? "Upload MP4, AVI, or MOV (max 50 MB)"
                                                : "Upload file sesuai format yang diizinkan"}
                                        </p>
                                        <input
                                            type="file"
                                            name={field.name}
                                            accept={field.accept}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <PrimaryButton
                                            type="button"
                                            className="px-4 py-2 bg-blue-600 text-white rounded"
                                            onClick={() =>
                                                document.querySelector(`input[name="${field.name}"]`).click()
                                            }
                                        >
                                            Upload File
                                        </PrimaryButton>
                                        {form[field.name] && (
                                            <p className="text-sm text-green-600">
                                                File: {form[field.name].name}
                                            </p>
                                        )}
                                    </div>
                                </label>
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder || ""}
                                    className="w-full placeholder:text-gray-500 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        </div>
                    ))}

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <SecondaryButton
                            type="button"
                            className="px-4 py-2 uppercase border rounded text-gray-700 hover:bg-gray-100"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Simpan
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
