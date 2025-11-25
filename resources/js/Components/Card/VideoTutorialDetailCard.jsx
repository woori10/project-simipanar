
export default function VideoTutorialDetailCard({ judul_video, thumbnail, onClick }) {
  return (
        <div
            onClick={onClick}
            className="rounded-2xl border border-gray-200 bg-white p-5 min-w-max md:p-6 cursor-pointer hover:shadow-sm transition"
        >
            <div className="mx-auto flex items-center justify-center w-full h-40 bg-gray-100 rounded-xl dark:bg-gray-800">
                <img
                    src={thumbnail || '/default-image.png'}
                    alt={judul_video}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="text-center mt-5">
                <div>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {judul_video}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                    Klik untuk Lihat
                    </span>
                </div>
            </div>
        </div>


  );
}
