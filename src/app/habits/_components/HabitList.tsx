"use client";

import { api } from "@/trpc/react";
import Habit from "./habit";

export default function HabitList({ day: today }: { day: Date }) {
  const [habits, allHabitsQuery] = api.habit.getAll.useSuspenseQuery({ date: today });


  return (
    <div className="space-y-6">
      {habits.length === 0 ? (
        <div>No habits found</div>
      ) : (
        habits.map((habit) => <Habit key={habit.id} habit={habit} />)
      )}
    </div>
  );
}
