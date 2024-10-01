"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createHabit } from "./actions";
import { useTransition } from "react";
import { newHabitSchema } from "./schemas";

export default function NewHabit() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof newHabitSchema>>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(newHabitSchema),
  });

  function onSubmit(values: z.infer<typeof newHabitSchema>) {
    console.log(values);
  }

  return (
    <Card className="w-full max-w-md shadow">
      <CardHeader>
        <CardTitle>Add New Habit</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const values = form.getValues();
              await createHabit(values);
            }}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="flex-1" disabled={isPending}>
              Create
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
