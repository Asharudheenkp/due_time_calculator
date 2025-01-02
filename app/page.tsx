import AdviceOfTheSecond from "@/components/AdviceOfTheSecond";
import Calculator from "@/components/Calculator";
import Interactive3d from "@/components/Interactive3d";
import MouseCheck from "@/components/MouseCheck";
import NewYearPopup from "@/components/NewYearPopup";
import { Robot2 } from "@/components/Robot2";
export default function Home() {
  const isNewYear = () => {
    const today = new Date();
    return today.getMonth() === 0 && today.getDate() === 1;
  };

  return (
    <div className="mt-9 w-[80%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* {isNewYear() && <NewYearPopup />}  */}
        <Calculator/>
        <Interactive3d model={<Robot2/>}/>
        <AdviceOfTheSecond/>
        {/* <MouseCheck/> */}
      </div>
    </div>
  );
}
