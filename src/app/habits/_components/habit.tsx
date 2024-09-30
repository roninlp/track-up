import { Button } from "@/components/ui/button";
import { type HabitType } from "@/server/db/schema";

interface HabitProps {
  habit: HabitType;
}
export default function Habit({ habit }: HabitProps) {
  return (
    <div className="flex gap-4">
      <h2 className="text-xl font-bold">{habit.name}</h2>
      <p className="text-sm">{habit.description}</p>
      <Button>done</Button>
    </div>
  );
}
