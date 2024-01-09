export interface Task {
  recurringInfo?: {
    daysOfWeek: string[];
    daysOfMonth: number[];
  };
  _id: string;
  title: string;
  owner: string;
  dueDate: Date;
  completed: boolean;
  recurring: boolean;
  // __v: number;
}
