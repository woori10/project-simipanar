import VideoTutorialCard from '@/Components/Card/VideoTutorialCard';
import AppLayout from '@/Components/Layout/AppLayout';

export default function Hamzat() {
  return (
    <AppLayout>
        <h1 className="text-xl font-bold">Video Penggunaan Hamzat ID</h1>
         <div className= "py-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            <VideoTutorialCard />
            <VideoTutorialCard />
            <VideoTutorialCard />
            <VideoTutorialCard />
         </div>

    </AppLayout>

  );
}
