import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { setFilterText, setFilterStatus, setFilterPriority, setSort } from '../store/todoSlice';
import type { Priority } from '../types/todo';

export const Controls: React.FC = () => {
    const dispatch = useDispatch();
    const { filter, sort } = useSelector((state: RootState) => state.todos);

    return (
        <div className="mb-6 space-y-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-900/5 sm:flex sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex flex-1 items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={filter.text}
                    onChange={(e) => dispatch(setFilterText(e.target.value))}
                    className="block w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <select
                    value={filter.status}
                    onChange={(e) => dispatch(setFilterStatus(e.target.value as any))}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
                <select
                    value={filter.priority || ''}
                    onChange={(e) => dispatch(setFilterPriority(e.target.value ? e.target.value as Priority : undefined))}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                    value={sort.by}
                    onChange={(e) => dispatch(setSort({ ...sort, by: e.target.value as any }))}
                    className="rounded-lg border-none bg-transparent text-sm font-medium text-gray-700 focus:ring-0"
                >
                    <option value="createdAt">Created</option>
                    <option value="priority">Priority</option>
                    <option value="date">Due Date</option>
                </select>
                <button
                    onClick={() => dispatch(setSort({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' }))}
                    className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"
                    title="Toggle sort direction"
                >
                    {sort.direction === 'asc' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};
