interface Task {
  title: string;
  owner: string; // Assuming owner is represented by a user ID (string)
  dueDate?: Date;
  completed?: boolean;
  recurring?: boolean;
  recurringInfo?: {
    daysOfWeek?: string[];
    daysOfMonth?: number[];
  };
  // Additional task properties can be added here
}

export default Task;
