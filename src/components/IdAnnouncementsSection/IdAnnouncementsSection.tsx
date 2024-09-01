import { IAnnouncementDocument } from "@/models/announcements";
import React from "react";
export default function IdAnnouncementsSection({ data }: { data: IAnnouncementDocument | null }) {
    return (
        <section className="py-10 px-4 bg-sky-blue">
            <div className="container mx-auto text-center">
                {JSON.stringify(data)}
            </div>
        </section>
    );
}
