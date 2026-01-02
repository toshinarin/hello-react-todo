import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo, Priority, TodoState } from '../types/todo';

const loadFromLocalStorage = (): Todo[] => {
    try {
        const serializedState = localStorage.getItem('todos');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load todos", err);
        return [];
    }
};

const initialState: TodoState = {
    items: loadFromLocalStorage(),
    filter: {
        text: '',
        status: 'all',
    },
    sort: {
        by: 'createdAt',
        direction: 'desc',
    },
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Omit<Todo, 'id' | 'createdAt'>>) => {
            const newTodo: Todo = {
                id: crypto.randomUUID(),
                createdAt: Date.now(),
                ...action.payload,
            };
            state.items.push(newTodo);
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(todo => todo.id !== action.payload);
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.items.find(t => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                localStorage.setItem('todos', JSON.stringify(state.items));
            }
        },
        updateTodo: (state, action: PayloadAction<Todo>) => {
            const index = state.items.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
                localStorage.setItem('todos', JSON.stringify(state.items));
            }
        },
        setFilterText: (state, action: PayloadAction<string>) => {
            state.filter.text = action.payload;
        },
        setFilterStatus: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
            state.filter.status = action.payload;
        },
        setFilterPriority: (state, action: PayloadAction<Priority | undefined>) => {
            state.filter.priority = action.payload;
        },
        setSort: (state, action: PayloadAction<{ by: 'date' | 'priority' | 'createdAt'; direction: 'asc' | 'desc' }>) => {
            state.sort = action.payload;
        },
    },
});

export const {
    addTodo, deleteTodo, toggleTodo, updateTodo,
    setFilterText, setFilterStatus, setFilterPriority, setSort
} = todoSlice.actions;

export default todoSlice.reducer;
