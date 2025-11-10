import VideoTutorialCard from "@/Components/Card/VideoTutorialCard";
import AppLayout from "@/Components/Layout/UserLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function VideoTutorial() {
  const { videos: initialVideos } = usePage().props;
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Kalau belum pilih video → tampilkan grid card
  if (!selectedVideo) {
    return (
      <AppLayout>
        <h1 className="text-xl font-bold mb-6">Video Tutorial</h1>

        {initialVideos.length === 0 ? (
          <p className="text-gray-500">Belum ada video untuk alat ini.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {initialVideos.map((video) => (
                <VideoTutorialCard
                key={video.id}
                judul_video={video.judul_video}
                thumbnail={video.foto}
                onClick={() => setSelectedVideo(video)}
                />
            ))}
        </div>
        )}
      </AppLayout>
    );
  }

  // Kalau video diklik → tampilkan preview
  return (
    <AppLayout>
      <div className="flex items-center mb-4">
        <button
          onClick={() => setSelectedVideo(null)}
          className="flex items-center text-gray-600 hover:text-gray-800 transition"
        >
          ← <span className="ml-2 font-bold">{selectedVideo.judul_video}</span>
        </button>
      </div>

      <div className="border rounded-lg shadow-sm overflow-hidden">
        <video
          src={selectedVideo.video}
          controls
          autoPlay
          className="w-full max-h-[500px] object-contain"
        />
      </div>
    </AppLayout>
  );
}
