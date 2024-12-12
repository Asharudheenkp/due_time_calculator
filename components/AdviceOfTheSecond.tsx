"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdviceOfTheSecond = () => {
  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error("Failed to fetch advice");
      }
      const data = await response.json();
      const now = Date.now();
      localStorage.setItem("advice", JSON.stringify({ timestamp: now, data }));

      setAdvice(data.slip.advice);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const checkAndUpdateAdvice = () => {
      const cacheKey = "advice";
      const cacheDuration = 8 * 3600 * 1000;
      const now = Date.now();

      try {
        const cached = localStorage.getItem(cacheKey);
        const cachedData = cached ? JSON.parse(cached) : null;

        if (cachedData && now - cachedData.timestamp < cacheDuration) {
          setAdvice(cachedData.data.slip.advice);
        } else {
          fetchAdvice();
        }
      } catch (error) {
        console.error("Error checking cache:", error);
        fetchAdvice(); 
      }
    };

    checkAndUpdateAdvice();

    const intervalId = setInterval(() => {
      fetchAdvice();
    }, 8 * 3600 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return (
      <Card className="md:h-[385px] overflow-scroll">
        <CardHeader>
          <CardTitle className="font-mono">😔 Oops!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl mt-10 max-md:mb-10 font-thin font-mono leading-9 italic">
            It seems the "Advice of the Day" has taken a coffee break and is not available at the moment.
            Don’t worry, we’ll tell it to get back to work—eventually. Please try again later, or just listen to your cat. Cats always know what to do. 😸
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!advice) {
    return (
      <Card className="md:h-[385px] overflow-scroll">
        <CardHeader>
          <CardTitle className="font-mono">😇 Hold tight!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl mt-10 max-md:mb-10 font-thin font-mono leading-9 italic">
            It’s going through a deep, introspective journey, contemplating life, the universe, and everything in between.
            Please be patient. It will emerge with wisdom in... just a second. 🧘‍♂️🌌
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="md:h-[385px] overflow-scroll">
      <CardHeader>
        <CardTitle className="font-mono">😇 Today's Advice for you</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl mt-10 max-md:mb-10 font-thin font-mono leading-9 italic">
          "{advice}"
        </p>
      </CardContent>
    </Card>
  );
};

export default AdviceOfTheSecond;