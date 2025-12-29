interface HasId {
    id: Id;
}
interface User extends HasId {
}
interface Event extends HasId {
}
declare function createUser(username: string, name: string, email?: string): User;
declare function createEvent(host: User, eventDetails: EventDetailsWithoutIds): Event;
export { createEvent, createUser };
//# sourceMappingURL=compileMe.d.ts.map