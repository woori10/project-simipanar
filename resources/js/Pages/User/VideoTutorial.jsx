import VideoTutorialCard from "@/Components/Card/VideoTutorialCard";
import VideoTutorialDetailCard from "@/Components/Card/VideoTutorialDetailCard";
import AppLayout from "@/Components/Layout/UserLayout";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function VideoTutorial() {
    const { alats = [], videos = [], selectedAlatId } = usePage().props;
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        window.onVideoTutorialMain = () => {
            router.visit("/user/video-tutorial");
        };

        return () => {
            window.onVideoTutorialMain = null;
        };
    }, []);


    // MODE 1 → daftar alat (default)
    if (!selectedAlatId) {
        return (
            <AppLayout>
                <div className="flex flex-col flex-1">
                    <h1 className="text-xl font-bold mb-6">Video Tutorial</h1>

                {alats.length === 0 ? (
                    <p className="text-gray-500">Belum ada alat tersedia.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {alats.map((alat) => (
                            <VideoTutorialCard
                                key={alat.id}
                                judul_video={alat.nama_alat}
                                thumbnail={alat.foto}
                                onClick={() =>
                                    router.visit(`/user/video-tutorial/${alat.id}`)
                                }
                            />
                        ))}
                    </div>
                )}
                </div>

            </AppLayout>
        );
    }

    // MODE 2 → daftar video dari alat tertentu
    if (!selectedVideo) {
        return (
            <AppLayout>
                <div className="flex flex-col flex-1">
                    <div className="flex items-center mb-6">
                    <button
                        onClick={() => router.visit("/user/video-tutorial")}
                        className="flex items-center gap-2 py-2 rounded-lg text-gray-700"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                        <span className="font-bold">Kembali</span>
                    </button>
                </div>

                <h1 className="text-xl font-bold mb-6">
                    {alats.find((a) => a.id === selectedAlatId)?.nama_alat}
                </h1>

                {videos.length === 0 ? (
                    <p className="text-gray-500">Belum ada video untuk alat ini.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {videos.map((video) => (
                            <VideoTutorialDetailCard
                                key={video.id}
                                judul_video={video.judul_video}
                                thumbnail={video.foto}
                                onClick={() => setSelectedVideo(video)}
                            />
                        ))}
                    </div>
                )}
                </div>

            </AppLayout>
        );
    }

    // MODE 3 → menampilkan player video
    return (
        <AppLayout>
            <div className="flex flex-col flex-1">
                <div className="flex items-center mb-6">
                <button
                    onClick={() => setSelectedVideo(null)}
                    className="flex items-center gap-2 py-2 rounded-lg text-gray-700"
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                    <span className="font-bold">Kembali</span>
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
            </div>

        </AppLayout>
    );
}
