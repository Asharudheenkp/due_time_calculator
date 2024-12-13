import AdviceOfTheSecond from "@/components/AdviceOfTheSecond";
import Calculator from "@/components/Calculator";
import MouseCheck from "@/components/MouseCheck";
import dynamic from 'next/dynamic';

const Interactive3d = dynamic(() => import('../components/Interactive3d'), { 
  ssr: false 
});
export default function Home() {
  return (
    <div className="mt-9 w-[80%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Calculator/>
        <Interactive3d />
        <AdviceOfTheSecond/>
        {/* <MouseCheck/> */}
      </div>
    </div>
  );
}
