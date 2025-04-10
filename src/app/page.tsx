import Link from "next/link";


import { api, HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";

export default async function Home() {
 
  return (
   <Button>Click me</Button>
  );
}
