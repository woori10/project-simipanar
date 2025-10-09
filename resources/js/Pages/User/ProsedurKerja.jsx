import ProsedurKerjaCard from '@/Components/Card/ProsedurKerjaCard';
import AppLayout from '@/Components/Layout/UserLayout';


export default function ProsedurKerja() {
  return (
    <AppLayout>
        <h1 className="text-xl font-bold">Prodesur Kerja</h1>
        {/* <div className= "py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
        <div className= "py-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            <ProsedurKerjaCard />
            <ProsedurKerjaCard />
            <ProsedurKerjaCard />
            <ProsedurKerjaCard />
        </div>


    </AppLayout>

  );
}
