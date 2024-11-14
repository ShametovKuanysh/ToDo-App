export interface Task {
    id: string;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    completed: boolean;
    completed_at: Date | null;
}