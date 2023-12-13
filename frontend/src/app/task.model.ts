export interface Task {
  recurringInfo?: {
    daysOfWeek: number[];
    daysOfMonth: number[];
  };
  _id: string;
  title: string;
  owner: string;
  dueDate: string;
  completed: boolean;
  recurring: boolean;
  __v: number;
}
