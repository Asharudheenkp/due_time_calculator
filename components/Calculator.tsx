"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const shifts = [
  { value: 0, label: "08:00 AM - 05:00 PM" },
  { value: 1, label: "08:30 AM - 05:30 PM" },
  { value: 2, label: "09:00 AM - 06:00 PM" },
];

const Calculator = () => {
  const [workEndTime, setWorkEndTime] = useState("00:00:00");
  const [isOverTime, setIsOverTime] = useState(false);
  const [isOverTime2, setIsOverTime2] = useState(false);
  const [isDueTime, setIsDueTime] = useState(false);
  const [isDueTime2, setIsDueTime2] = useState(false);
  const [timeInfo, setTimeInfo] = useState({
    overTimeToMin: "00 hr 00 min 00 sec",
    overTimeToMax: "00 hr 00 min 00 sec",
    dueTimeToMin: "00 hr 00 min 00 sec",
    dueTimeToMax: "00 hr 00 min 00 sec",
  });
  const [showShift, setShowShift] = useState(3);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
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
      const endTime = new Date(
        currentTime.getTime() + remainingTimeInSeconds * 1000
      );
      setWorkEndTime(endTime.toLocaleTimeString("en-US", { hour12: true }));

      calculateShiftTimes(
        remainingHours,
        remainingMinutes,
        remainingSeconds,
        Number(shift)
      );
    }
  };

  const calculateShiftTimes = (
    remainingHours : any,
    remainingMinutes : any,
    remainingSeconds : any,
    shift: number
  ) => {
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

    const { start: overTimeStart, end: overTimeEnd } =
      workMaxTimeLimits[shift] || workMaxTimeLimits[2];

    const overTimeToMin =
      (overTimeStart.getTime() - shiftEndTime.getTime()) / 1000;
    const overTimeToMax =
      (overTimeEnd.getTime() - shiftEndTime.getTime()) / 1000;

    const dueTimeToMin =
      (shiftEndTime.getTime() - workMaxTimeLimits[shift].start.getTime()) /
      1000;
    const dueTimeToMax =
      (shiftEndTime.getTime() - workMaxTimeLimits[shift].end.getTime()) / 1000;

    overTimeToMin > 0 ? setIsOverTime(true) :  setIsOverTime(false)
    overTimeToMax > 0 ? setIsOverTime2(true) :  setIsOverTime2(false)
    dueTimeToMin > 0 ?  setIsDueTime(true) :  setIsDueTime(false)
    dueTimeToMax > 0 ?  setIsDueTime2(true) :  setIsDueTime2(false)

    setTimeInfo({
      overTimeToMin: overTimeToMin > 0 ? formatTime(overTimeToMin) : "00 hr 00 min 00 sec",
      overTimeToMax: overTimeToMax > 0 ? formatTime(overTimeToMax) : "00 hr 00 min 00 sec",
      dueTimeToMin: dueTimeToMin > 0 ? formatTime(dueTimeToMin) : "00 hr 00 min 00 sec",
      dueTimeToMax: dueTimeToMax > 0 ? formatTime(dueTimeToMax) : "00 hr 00 min 00 sec",
    });
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${hours.toString().padStart(2, "0")} hr ${minutes
      .toString()
      .padStart(2, "0")} min ${seconds.toString().padStart(2, "0")} sec`.trim();
  };

  const parseTimeString = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds; // convert to seconds
  };

  return (
    <div className="mt-9 w-[80%] mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Enter Due time </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        {shifts.map((shift) => (
                          <SelectItem
                            key={shift.value}
                            value={String(shift.value)}
                          >
                            {shift.label}
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
                {showShift === 2 && (
                  <>
                    {isOverTime && (
                      <>
                        {`The over time to 6:00 PM: ${timeInfo.overTimeToMin} `}
                        <br />
                      </>
                    )}
                    {isOverTime2 && (
                      <>
                        {`The over time to 6:10 PM: ${timeInfo.overTimeToMax} `}
                        <br />
                      </>
                    )}
                    {isDueTime && (
                      <>
                       <span className="text-red-500 font-bold">{`The due time to 6:00 PM: ${timeInfo.dueTimeToMin} `}</span>
                        <br />
                      </>
                    )}
                    {isDueTime2 && (
                      <>
                         <span className="text-red-500 font-bold">{`The due time to 6:10 PM: ${timeInfo.dueTimeToMax} `}</span>
                        <br />
                      </>
                    )}
                  </>
                )}
                {showShift === 1 && (
                  <>
                    {isOverTime && (
                      <>
                        {`The over time to 5:30 PM: ${timeInfo.overTimeToMin} `}
                        <br />
                      </>
                    )}
                    {isOverTime2 && (
                      <>
                        {`The over time to 5:40 PM: ${timeInfo.overTimeToMax} `}
                        <br />
                      </>
                    )}
                    {isDueTime && (
                      <>
                        <span className="text-red-500 font-bold">{`The due time to 5:30 PM: ${timeInfo.dueTimeToMin} `}</span>
                        <br />
                      </>
                    )}
                    {isDueTime2 && (
                      <>
                         <span className="text-red-500 font-bold">{`The due time to 5:40 PM: ${timeInfo.dueTimeToMax} `}</span>
                        <br />
                      </>
                    )}
                  </>
                )}
                {showShift === 0 && (
                  <>
                    {isOverTime && (
                      <>
                        {`The over time to 5:00 PM: ${timeInfo.overTimeToMin} `}
                        <br />
                      </>
                    )}
                    {isOverTime2 && (
                      <>
                        {`The over time to 5:10 PM: ${timeInfo.overTimeToMax} `}
                        <br />
                      </>
                    )}
                    {isDueTime && (
                      <>
                        <span className="text-red-500 font-bold">{`The due time to 5:00 PM: ${timeInfo.dueTimeToMin} `}</span>
                        <br />
                      </>
                    )}
                    {isDueTime2 && (
                      <>
                        <span className="text-red-500 font-bold">{`The due time to 5:10 PM: ${timeInfo.dueTimeToMax} `}</span>
                        <br />
                      </>
                    )}
                  </>
                )}
              </p>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
