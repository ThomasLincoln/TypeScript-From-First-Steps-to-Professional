
const events: EventType[] = [
    {
        id: 1,
        title: "Thanksgiving Potluck",
        date: "2026-11-29",
        image_url: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=500",
        host_id: 1,
        rsvps: [{ user_id: 1 }, { user_id: 5 }, { user_id: 3 }]
    },
    {
        id: 2,
        title: "EventExpo 2026",
        date: "2026-04-01",
        description: "Discover the future of event planning at EventExpo 2026. Network with industry leaders, explore cutting-edge technologies, and attend inspiring workshops.",
        host_id: 3
    }
];

type UserIdType =
    {
        user_id: number;
    };

type EventType = {
    id: number;
    title: string;
    date: string;
    image_url?: string;
    description?: string;
    host_id: number;
    rsvps?: UserIdType[];
}

// Should return an event object, or null if not found
function getEventById(id: number): EventType | null {
    if (events.filter(e => e.id === id)) {
        return events.filter(e => e.id === id)[0];
    } else {
        return null
    }
}

// Should return an object with dateString & isPast 
function getEventDate(event: EventType) {
    const eventDate: Date = new Date(event.date);
    const dateString: string = eventDate.toDateString();
    const isPast: boolean = eventDate < new Date();
    return { dateString, isPast };
}

// Should return a string like '5 going' or '0 went'
const getEventRsvpCount = (event: EventType) : string => {
    const { dateString, isPast } = getEventDate(event);
    // console.log(isPast);
    const text = isPast ? 'went' : 'going';
    if (typeof (event.rsvps) != "undefined") {
        const count: number = event.rsvps.length;
        return [count, text].join(' ');
    } else {
        return [0, text].join(' ');
    }
}

// Should return a string with the event's title, date, and rsvps
// (if the event exists), or the string 'Event not found' (if not)
const getEventDetails = (eventId: number) : string => {
    const event: EventType | null = getEventById(eventId);
    if (event) {
        const { dateString } = getEventDate(event);
        const eventRsvps = getEventRsvpCount(event);
        return `${event.title} on ${dateString}: ${eventRsvps}`;
    } else {
        return ('Event not found');
    }
}

function test() {
    const results = [{
        actual: getEventDetails(1),
        expected: `${events[0].title} on ${new Date(events[0].date).toDateString()}: 3 going`,
    },
    {
        actual: getEventDetails(2),
        expected: `${events[1].title} on ${new Date(events[1].date).toDateString()}: 0 going`,
    },
    {
        actual: getEventDetails(404),
        expected: 'Event not found',
    }];

    for (let result of results) {
        const label = result.expected === result.actual ? '✅' : '❌'
        console.log(label, result.actual);
    }
}

test();


export { getEventDetails }