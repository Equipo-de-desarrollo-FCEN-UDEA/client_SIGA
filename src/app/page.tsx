import { Bar } from "@/components/organisms/bar";
import MyApplications from "@/modules/applications/MyApplications";

const Home = () => (
  <div className="w-full flex flex-col items-center">
    <Bar/>
    <div className="flex flex-col mt-5 w-full max-w-5xl px-4">
      <MyApplications />
    </div>
  </div>
);

export default Home;
