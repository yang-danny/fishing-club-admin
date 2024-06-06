"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { columns } from "@/components/events/EventColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";
import { Plus } from "lucide-react";

const Event = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    try {
      const res = await fetch("/api/events", {
        method: "GET",
      });
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    } catch (err) {
      console.log("[events_GET]", err);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Fishing Events</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/events/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Fishing Events
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={events} searchKey="title" />
    </div>
  );
};

export default Event;
