export interface Task {
  _id: string;
  title: string;
  owner: string;
  dueDate: Date;
  completed: boolean;
  recurring: boolean;
  // __v: number;
  recurringInfo?: {
    daysOfWeek: string[];
    daysOfMonth: number[];
  };
}
