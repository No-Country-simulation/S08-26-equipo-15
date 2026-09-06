import type { User } from "../../types/user";

export type MockUser = User & {
  password: string;
};

export const mockUsers: MockUser[] = [
  {
    id: "user-1",
    name: "Diego Maza",
    email: "diego@example.com",
    password: "MeetCore123!",
    role: "host",
  },
  {
    id: "user-2",
    name: "Ana Torres",
    email: "ana@example.com",
    password: "MeetCore123!",
    role: "participant",
  },
];
