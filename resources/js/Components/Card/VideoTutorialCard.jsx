export default function VideoTutorialCard({ judul_video, thumbnail, onClick }) {
    const finalThumbnail = thumbnail
        ? (thumbnail.startsWith('http') ? thumbnail : `/storage/${thumbnail}`)
        : '/default-image.png';

    return (
        <div
            onClick={onClick}
            className="w-full sm:w-[250px] h-[320px] rounded-2xl border border-gray-200 bg-white p-5 md:p-6 cursor-pointer hover:shadow-sm transition flex flex-col"
        >
            {/* FIX ukuran kotak gambar */}
            <div className="w-full h-[160p] rounded-xl flex items-center justify-center overflow-hidden">
                <img
                    src={finalThumbnail}
                    alt={judul_video}
                    className="max-w-full max-h-full object-contain"
                />
            </div>

            {/* Judul */}
            <div className="mt-auto text-center">
                <h4 className="font-bold text-gray-800 text-title-sm">
                    {judul_video}
                </h4>
                <span className="text-sm text-gray-500">Klik untuk Lihat</span>
            </div>
        </div>
    );
}
