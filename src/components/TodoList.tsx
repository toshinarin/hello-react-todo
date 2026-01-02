import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { deleteTodo, toggleTodo } from '../store/todoSlice';
import type { Todo } from '../types/todo';

interface TodoListProps {
    onEdit: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ onEdit }) => {
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
            const pMap = { high: 3, medium: 2, low: 1, undefined: 0 }; // undefined priority = lowest?
            const pA = pMap[a.priority || 'medium']; // Default to medium if not set? Or handle undefined
            const pB = pMap[b.priority || 'medium'];
            comparison = pA - pB;
        } else {
            comparison = a.createdAt - b.createdAt;
        }
        return sort.direction === 'asc' ? comparison : -comparison;
    });

    if (sortedItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center shadow-sm">
                <div className="rounded-full bg-gray-50 p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No tasks found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
            </div>
        );
    }

    const getPriorityColor = (p?: string) => {
        switch (p) {
            case 'high': return 'bg-red-50 text-red-700 ring-red-600/20';
            case 'medium': return 'bg-yellow-50 text-yellow-800 ring-yellow-600/20';
            case 'low': return 'bg-green-50 text-green-700 ring-green-600/20';
            default: return 'bg-gray-50 text-gray-600 ring-gray-500/10';
        }
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ring-1 ring-gray-900/5">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Status</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Task</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Priority</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Due Date</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {sortedItems.map((todo) => (
                        <tr key={todo.id} className="group hover:bg-gray-50">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => dispatch(toggleTodo(todo.id))}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                <span className={todo.completed ? 'text-gray-400 line-through' : ''}>{todo.text}</span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getPriorityColor(todo.priority)}`}>
                                    {todo.priority || 'None'}
                                </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {todo.expirationDate ? new Date(todo.expirationDate).toLocaleDateString() : '-'}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button
                                    onClick={() => onEdit(todo)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => dispatch(deleteTodo(todo.id))}
                                    className="text-red-600 hover:text-red-900 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
