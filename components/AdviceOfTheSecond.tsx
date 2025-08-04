"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdviceOfTheSecond = () => {
  const CACHE_KEY = "advice";
  const CACHE_DURATION = (1000 * 60) * 5;

  const [advice, setAdvice] = useState(null);
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    try {
      const response = await fetch("/api/advice");
      if (!response.ok) {
        throw new Error("Failed to fetch advice");
      }
      const data = await response.json();      
      const now = Date.now();
      localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: now, advice: data.quote, author: data.author }));

      setAdvice(data.quote);
      setAuthor(data.author);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const checkAndUpdateAdvice = () => {
    const now = Date.now();
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const cachedData = cached ? JSON.parse(cached) : null;

      if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
        setAdvice(cachedData.advice);
        setAuthor(cachedData.author);
      } else {
        fetchAdvice();
      }
    } catch (error) {
      console.error("Error checking cache:", error);
      fetchAdvice();
    }
  };

  useEffect(() => {
    checkAndUpdateAdvice();
    const intervalId = setInterval(fetchAdvice, CACHE_DURATION);
    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return (
      <Card >
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
      <Card >
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
    <Card >
      <CardHeader>
        <CardTitle className="font-mono">😇 Today's Advice for you</CardTitle>
      </CardHeader>
      <CardContent >
        <p className="text-3xl mt-8 max-md:mb-6 font-light font-serif leading-relaxed italic text-gray-800 dark:text-white">
          “{advice}”
        </p>
        <p className="text-right text-xl font-medium text-gray-600 mt-6 dark:text-white">
          — {author}
        </p>
      </CardContent>

    </Card>
  );
};

export default AdviceOfTheSecond;