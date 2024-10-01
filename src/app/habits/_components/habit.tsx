import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { HabitRecordType, HabitType } from "@/server/db/schema";
import { api } from "@/trpc/react";

interface HabitWithRecords extends HabitType {
  habitRecords: HabitRecordType[];
}

interface HabitProps {
  habit: HabitWithRecords;
}

export default function Habit({ habit }: HabitProps) {
  const { mutate } = api.habit.delete.useMutation();
  return (
    <Card className="rounded-lg p-6 shadow">
      <div className="flex gap-4">
        <h2 className="text-xl font-bold">{habit.name}</h2>
        <p className="text-sm">{habit.description}</p>
        <Button onClick={() => mutate({ id: habit.id })}>x</Button>
      </div>
    </Card>
  );
}
