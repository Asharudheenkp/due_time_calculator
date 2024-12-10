import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdviceOfTheSecond = async () => {
  const res = await fetch("https://api.adviceslip.com/advice",{ cache: 'no-store' });
  const second = await res.json();
  return (
    <Card className="md:h-[385px] overflow-scroll">
      <CardHeader>
        <CardTitle className="font-mono">😇 Advices of the day </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl mt-10 max-md:mb-10 font-thin font-mono leading-9 italic">
          "{second.slip.advice}"
        </p>
      </CardContent>
    </Card>
  );
};

export default AdviceOfTheSecond;
