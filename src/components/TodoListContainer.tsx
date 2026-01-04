import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TodoList } from './TodoList';
import type { RootState } from '../store/store';
import { deleteTodo, toggleTodo } from '../store/todoSlice';
import type { Todo } from '../types/todo';

interface TodoListContainerProps {
    onEdit: (todo: Todo) => void;
}

export const TodoListContainer: React.FC<TodoListContainerProps> = ({ onEdit }) => {
    const dispatch = useDispatch();
    const { items, filter, sort } = useSelector((state: RootState) => state.todos);

    const filteredItems = items.filter(todo => {
        const matchesText = todo.text.toLowerCase().includes(filter.text.toLowerCase());
        const matchesStatus =
            filter.status === 'all' ? true :
                filter.status === 'active' ? !todo.completed :
                    todo.completed;
        const matchesPriority = filter.priority ? todo.priority === filter.priority : true;

        return matchesText && matchesStatus && matchesPriority;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
        let comparison = 0;
        if (sort.by === 'date') {
            const dateA = a.expirationDate || '9999-99-99';
            const dateB = b.expirationDate || '9999-99-99';
            comparison = dateA.localeCompare(dateB);
        } else if (sort.by === 'priority') {
            const pMap = { high: 3, medium: 2, low: 1, undefined: 0 };
            const pA = pMap[a.priority || 'medium'];
            const pB = pMap[b.priority || 'medium'];
            comparison = pA - pB;
        } else {
            comparison = a.createdAt - b.createdAt;
        }
        return sort.direction === 'asc' ? comparison : -comparison;
    });

    const handleToggle = (id: string) => {
        dispatch(toggleTodo(id));
    };

    const handleDelete = (id: string) => {
        dispatch(deleteTodo(id));
    };

    return (
        <TodoList
            todos={sortedItems}
            onEdit={onEdit}
            onToggle={handleToggle}
            onDelete={handleDelete}
        />
    );
};
