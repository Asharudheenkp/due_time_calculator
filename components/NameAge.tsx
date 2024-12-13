"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
const FormSchema = z.object({
  name: z.string({ required_error: "Please enter your name" }),
});
const NameAge = () => {
  const [nameAge, setNameAge] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const getAgeYourNameAge = async (data: z.infer<typeof FormSchema>) => {
    let { name } = data;
    const res = await fetch(`https://api.agify.io?name=${name}`);
    const { age } = await res.json();
    setNameAge(age ? "Your name age is " + age : "Your name is very new");
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Name age calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(getAgeYourNameAge)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="w-full "
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // Pass the value to the form
                          setNameAge(""); // Reset the state
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    {nameAge && <p className="mt-5">{nameAge}</p>}
                  </FormItem>
                )}
              />
              <Button type="submit">Check</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NameAge;
