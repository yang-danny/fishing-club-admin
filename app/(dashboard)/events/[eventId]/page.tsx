"use client";
import Loader from "@/components/custom ui/Loader";
import React, { useEffect, useState } from "react";
import EventForm from "@/components/events/EventForm";
const EventDetails = ({ params }: { params: { eventId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState<EventType | null>(null);
  const getEventDetails = async () => {
    try {
      const res = await fetch(`/api/events/${params.eventId}`, {
        method: "GET",
      });
      const data = await res.json();
      setEventDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[productId_GET]", err);
    }
  };

  useEffect(() => {
    getEventDetails();
  }, []);
  return loading ? <Loader /> : <EventForm initialData={eventDetails} />;
};

export default EventDetails;
