import Link from "next/link";
import MyApplications from "@/modules/applications/MyApplications";

const Home = () => (
  <div className="flex flex-col items-center w-full">
    <div className="flex w-full">
      <Link href="/solicitudes/acdd81d5-5031-4d80-86e2-1461188f0bca">
        <p className="flex-1 p-4 bg-gray-200 text-center">Extension</p>
      </Link>
      <Link href="/solicitudes/adb1ea44-189f-47a7-b763-e0aae6e7c07e">
        <p className="flex-1 p-4 bg-gray-200 text-center">Decanatura</p>
      </Link>
      <Link href="/solicitudes/auxiliar/ver">
        <p className="flex-1 p-4 bg-gray-200 text-center">Vista-auxiliar</p>
      </Link>
    </div>
    <div className="flex flex-col mt-5">
      <h1 className="text-xl font-bold">Mis Solicitudes</h1>
      <MyApplications />
    </div>
    
  </div>
)

export default Home;