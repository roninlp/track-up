import { api } from "@/trpc/server";
import Habit from "./_components/habit";
import NewHabit from "./_components/new-habit";

export default async function HabitsPage() {
  const habits = await api.habit.getAll();

  return (
    <div>
      <h1>Habits</h1>
      <NewHabit />
      {habits.length === 0 ? (
        <div>No habits found</div>
      ) : (
        <ul>
          {habits.map((habit) => (
            <li key={habit.id}>
              <Habit habit={habit} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
