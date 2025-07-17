import Calculator2 from "@/components/Calculator2";

export default function Home() {
  const isNewYear = () => {
    const today = new Date();
    return today.getMonth() === 0 && today.getDate() === 1;
  };

  return (
    <div className="mt-9 w-[80%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Calculator2/>
      </div>
    </div>
  );
}
