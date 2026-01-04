import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controls } from './components/Controls';
import { TodoListContainer } from './components/TodoListContainer';
import { Modal } from './components/Modal';
import { TodoForm } from './components/TodoForm';
import { addTodo, updateTodo } from './store/todoSlice';
import type { Todo } from './types/todo';

function App() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);

  const handleAddStart = () => {
    setEditingTodo(undefined);
    setIsModalOpen(true);
  };

  const handleEditStart = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingTodo(undefined);
  };

  const handleSubmit = (data: Omit<Todo, 'id' | 'createdAt'>) => {
    if (editingTodo) {
      dispatch(updateTodo({ ...editingTodo, ...data }));
    } else {
      dispatch(addTodo(data));
    }
    handleClose();
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Hello React Todo</h1>
          <button
            onClick={handleAddStart}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            + Add Task
          </button>
        </header>

        <main>
          <Controls />
          <TodoListContainer onEdit={handleEditStart} />
        </main>

        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          title={editingTodo ? 'Edit Task' : 'New Task'}
        >
          <TodoForm
            initialValues={editingTodo}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </Modal>
      </div>
    </div>
  )
}

export default App
