import axios from "axios";
import { useState } from "react";

export default function AutoCompleteInput({ field, formData, setFormData }) {
    
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = async (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field.name]: value }));

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(`/admin/satuan-kerja/search?query=${value}`);
      setSuggestions(res.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Gagal ambil data satker:", error);
    }
  };

  const handleSelect = (nama) => {
    setFormData((prev) => ({ ...prev, [field.name]: nama }));
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        name={field.name}
        value={formData?.[field.name] ?? ""}
        onChange={handleChange}
        placeholder={field.placeholder || ""}
        autoComplete="off"
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto shadow-md">
            {suggestions.map((item) => (
                <li
                key={item.id}
                onClick={() => handleSelect(item.satker)}
                className="px-3 py-2 text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-150 cursor-pointer"
                >
                {item.satker}
                </li>
            ))}
        </ul>
      )}
    </div>
  );
}
