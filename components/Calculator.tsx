"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";

const FormSchema = z.object({
  shift: z.string({ required_error: "Please select a shift." }),
  time: z.string({ required_error: "Please select a time " }),
});
const CalculatorBox = () => {
  const [overTimeTo6, setOverTimeTo6] = useState("00 hr 00 min 00 sec");
  const [overTimeTo610, setOverTimeTo610] = useState("00 hr 00 min 00 sec");
  const [dueTimeTo6, setDueTimeTo6] = useState("00 hr 00 min 00 sec");
  const [dueTimeTo610, setDueTimeTo610] = useState("00 hr 00 min 00 sec");
  const [workEndTime, setWorkEndTime] = useState("00:00:00");
  const [isOverTime6, setIsOverTime6] = useState(false);
  const [isOverTime610, setIsOverTime610] = useState(false);
  const [isDueTime6, setIsDueTime6] = useState(false);
  const [isDueTime610, setIsDueTime610] = useState(false);


  console.log(isOverTime610);
  
  const [showShift, setShowShift] = useState(3);

  const shifts = [
    { value: 0, label: "08:00 AM - 05:00 PM" },
    { value: 1, label: "08:30 AM - 05:30 PM" },
    { value: 2, label: "09:00 AM - 06:00 PM" },
  ];
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });


  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { time: remainingTime, shift } = data;

    if (remainingTime) {
      const [remainingHours, remainingMinutes, remainingSeconds] = remainingTime
        .split(":")
        .map(Number);

      if ([remainingHours, remainingMinutes, remainingSeconds].some(isNaN)) {
        toast({
          title: "Invalid input format",
          variant: "destructive",
        });
        return;
      }
      const currentTime = new Date();
      const remainingTimeInSeconds = parseTimeString(remainingTime);
      const endTime = new Date(currentTime.getTime() + remainingTimeInSeconds * 1000);
      setWorkEndTime(endTime.toLocaleTimeString('en-US', { hour12: true }));

      calculateShiftTimeFromRemaining(
        remainingHours,
        remainingMinutes,
        remainingSeconds,
        Number(shift)
      );
    }
  }

  function calculateShiftTimeFromRemaining(
    remainingHours: number,
    remainingMinutes: number,
    remainingSeconds: number,
    shift: number
  ) {
    const currentTime = new Date();
    const shiftEndTime = new Date(currentTime);

    shiftEndTime.setHours(currentTime.getHours() + remainingHours);
    shiftEndTime.setMinutes(currentTime.getMinutes() + remainingMinutes);
    shiftEndTime.setSeconds(currentTime.getSeconds() + remainingSeconds);

    const workMaxTimeLimits = [
      {
        end: new Date(currentTime.setHours(17, 10, 0)),
        start: new Date(currentTime.setHours(17, 0, 0)),
      },
       {
        end: new Date(currentTime.setHours(17, 40, 0)),
        start: new Date(currentTime.setHours(17, 30, 0)),
      },
      {
        end: new Date(currentTime.setHours(18, 10, 0)),
        start: new Date(currentTime.setHours(18, 0, 0)),
      },
    ];

    const { start: overTimeStart, end: overTimeEnd } = workMaxTimeLimits[shift] || workMaxTimeLimits[2];
  
    const OverTimeTo6 = (overTimeStart.getTime() - shiftEndTime.getTime()) / 1000;
    const OverTimeTo610 = (overTimeEnd.getTime() - shiftEndTime.getTime()) / 1000;

    OverTimeTo6 > 0 ? setIsOverTime6(true) : setIsOverTime6(false);
    OverTimeTo610 > 0 ? setIsOverTime610(true) : setIsOverTime610(false);

    isOverTime6 &&  setOverTimeTo6(formatTime(OverTimeTo6));
    isOverTime610 &&  setOverTimeTo610(formatTime(OverTimeTo610));


    const { start: dueTimeStart, end: dueTimeEnd } = workMaxTimeLimits[shift] || workMaxTimeLimits[2];
  
    const dueTimeTo6 = ( shiftEndTime.getTime() - dueTimeStart.getTime() ) / 1000;
    const dueTimeTo610 = ( shiftEndTime.getTime() -dueTimeEnd.getTime() ) / 1000;

    dueTimeTo6 > 0 ? setIsDueTime6(true) : setIsDueTime6(false);
    dueTimeTo610 > 0 ? setIsDueTime610(true) : setIsDueTime610(false);

    isDueTime6 &&  setDueTimeTo6(formatTime(dueTimeTo6));
    isDueTime610 &&  setDueTimeTo610(formatTime(dueTimeTo610));
  }

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    const hoursString = hours > 0 ? `${hours.toString().padStart(2, "0")} hr ` : '00 hr ';
    const minutesString = minutes > 0 ? `${minutes.toString().padStart(2, "0")} min ` : '00 min ';
    const secondsString = seconds > 0 ? `${seconds.toString().padStart(2, "0")} sec` : '00 sec ';
    return `${hoursString}${minutesString}${secondsString}`.trim();
  };

  const parseTimeString = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds; // convert to seconds
  }

  return (
    <div className="mt-9 w-[80%] mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Enter Due time </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" space-y-6"
            >
              <FormField
                control={form.control}
                name="shift"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-[350px]">
                    <FormLabel>Shift time</FormLabel>
                    <Select
                      {...field}
                       onValueChange={(value) => {
                        field.onChange(value);  
                        setShowShift(Number(value));
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your shift" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {shifts.map((field) => (
                          <SelectItem value={String(field.value)}>
                            {field.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg: 05:14:22"
                        className="w-full sm:w-[350px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p>{`Work End Time: ${workEndTime}`}</p>
              <p>

                    {(isOverTime6 && showShift === 2)  && `The over time to 6:00 PM: ${overTimeTo6}` }
                    {/* <br /> */}
                    {(isOverTime610 && showShift === 2) &&`The over time to 6:10 PM: ${overTimeTo610}`}
                
                    {(isOverTime6 && showShift === 1) && `The over time to 5:30 PM: ${overTimeTo6}`}
                    {/* <br /> */}
                    {(isOverTime610 && showShift === 1) &&`The over time to 5:40 PM: ${overTimeTo610}`}

                    {(isOverTime6 && showShift === 0) && `The over time to 5:00 PM: ${overTimeTo6}`}
                    {/* <br /> */}
                    {(isOverTime610 && showShift === 0) &&`The over time to 5:10 PM: ${overTimeTo610}`}

                    {(isDueTime6 && showShift === 2)  && `The due time to 6:00 PM: ${dueTimeTo6}`}
                    {/* <br /> */}
                    {(isDueTime610 && showShift === 2) &&`The due time to 6:10 PM: ${dueTimeTo610}`}
                
                    {(isDueTime6 && showShift === 1) && `The due time to 5:30 PM: ${dueTimeTo6}`}
                    {/* <br /> */}
                    {(isDueTime610 && showShift === 1) &&`The due time to 5:40 PM: ${dueTimeTo610}`}

                    {(isDueTime6 && showShift === 0) && `The due time to 5:00 PM: ${dueTimeTo6}`}
                    {/* <br /> */}
                    {(isDueTime610 && showShift === 0) &&`The due time to 5:10 PM: ${dueTimeTo610}`}

              </p>

              <Button type="submit">Calculate</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorBox;
