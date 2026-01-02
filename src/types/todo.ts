export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    expirationDate?: string; // ISO Date string
    priority?: Priority;
    createdAt: number;
}

export interface TodoState {
    items: Todo[];
    filter: {
        text: string;
        priority?: Priority;
        status: 'all' | 'active' | 'completed';
    };
    sort: {
        by: 'date' | 'priority' | 'createdAt';
        direction: 'asc' | 'desc';
    };
}
