import Link from "next/link";

import { HydrateClient } from "@/trpc/server";
import { getSession } from "@/server/auth/lucia";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

export default async function Home() {
  const { user } = await getSession();
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>First Steps</CardTitle>
                <CardDescription>
                  Just the basics - Everything you need to know to set up your
                  database and authentication.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-lg">
                  Just the basics - Everything you need to know to set up your
                  database and authentication.
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-lg">
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </div>
                <Calendar mode="single" className="rounded-md border" />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col items-center gap-2">
            hello {user?.email}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
