import { ContentList } from "@/app/components/content_list";
import { Card, type CardProps } from "@/app/components/card";

import { getContentBySlug } from "@/app/data/loaders";
import { EventProps } from "@/app/types";
import { notFound } from "next/navigation";
import { EventSignupForm } from "../components/EventSignupForm";
import SingleEventRoute from "./[slug]/page";

async function loader(slug: string) {
  const { data } = await getContentBySlug(slug, "/api/events");
  // console.log("event data response" + JSON.stringify(data));

  const event = data[0];
  if (!event) throw notFound();
  return { event: event as EventProps, blocks: event?.blocks };
}

interface ParamsProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; query?: string }>;
}

const EventCard = (props: Readonly<CardProps>) => (
  <Card {...props} basePath="events" />
);

export default async function AllEventsRoute({
  params,
  searchParams,
}: ParamsProps) {
  const slug = (await params).slug;
  const { query, page } = await searchParams;
  const { event, blocks } = await loader(slug);
  // console.log("this is the seign up blocks" + JSON.stringify(blocks));

  return (
    <div className="container">
      {/* <SingleEventRoute /> */}
      <div className="event-page">
        <EventSignupForm blocks={blocks} eventId={event.documentId} />
      </div>
      <ContentList
        headline="All Events"
        path="/api/events"
        query={query}
        page={page}
        showSearch
        showPagination
        component={EventCard}
      />
    </div>
  );
}
