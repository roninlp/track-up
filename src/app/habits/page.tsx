import { api, HydrateClient } from "@/trpc/server";
import NewHabit from "./_components/new-habit";
import { startOfToday } from "date-fns";
import HabitList from "./_components/HabitList";
import { Suspense } from "react";

export default async function HabitsPage() {
  const today = startOfToday();
  void api.habit.getAll.prefetch({ date: today });

  return (
    <HydrateClient>
      <div className="container mx-auto flex gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <NewHabit />
        <div className="w-full max-w-3xl">
          <h2 className="mb-8 text-3xl font-bold">Habit Tracker</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <HabitList day={today} />
          </Suspense>
        </div>
      </div>
    </HydrateClient>
  );
}
