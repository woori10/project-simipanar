import ProsedurKerjaCard from '@/Components/Card/ProsedurKerjaCard';
import AppLayout from '@/Components/Layout/AppLayout';


export default function Dashboard() {
  return (
    <AppLayout>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className= "py-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <h1 className="text-xl font-bold">Informasi</h1>
                <p className="py-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente repellat autem deserunt, natus earum sequi necessitatibus aut magni repellendus quo! Quo similique repudiandae vero maiores ullam, natus nesciunt? Laborum, odit!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente repellat autem deserunt, natus earum sequi necessitatibus aut magni repellendus quo! Quo similique repudiandae vero maiores ullam, natus nesciunt? Laborum, odit!
                </p>
            </div>
        </div>
        <h1 className="text-lg font-medium">Baru saja dikunjungi</h1>
        <div className= "py-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            <ProsedurKerjaCard />
            <ProsedurKerjaCard />
            <ProsedurKerjaCard />
            <ProsedurKerjaCard />
        </div>



    </AppLayout>

  );
}
