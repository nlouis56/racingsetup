export interface User {
  id: number;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  racingNumber: number | null;
  isAdmin: boolean;
}