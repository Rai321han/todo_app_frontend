import { memo, useMemo, useState } from "react";
import useTodo from "../hooks/useTodo";
import Badge from "./Badge";
import { MdNotes } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Modal from "./Modal";
import { formatDate } from "../utils/formatedDate";
import TodoForm from "./TodoForm";

function Todo({ todoData, onChanged }) {
  const { id, title, description, is_completed, created_at } = todoData;
  const [editData, setEditData] = useState({
    title,
    description,
  });

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { updateTodo, deleteTodo } = useTodo();
  const formattedDate = useMemo(() => formatDate(created_at), [created_at]);

  const handleDelete = async () => {
    const isDeleted = await deleteTodo(id);

    if (isDeleted && onChanged) {
      onChanged();
    }
  };

  const handleUpdate = async () => {
    const updatedTodo = await updateTodo(id, {
      ...todoData,
      title: editData.title,
      description: editData.description,
    });

    if (updatedTodo && onChanged) {
      setModalOpen(false);
      onChanged();
    }
  };

  const handleToggleStatus = async () => {
    const updatedTodo = await updateTodo(id, {
      ...todoData,
      is_completed: !is_completed,
    });

    if (updatedTodo && onChanged) {
      onChanged();
    }
  };

  const openEditModal = () => {
    setEditData({
      title,
      description,
    });
    setModalOpen(true);
  };

  const handleEditChange = (name, value) => {
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 bg-white max-w-87.5 w-100 ">
      <div className="flex flex-row gap-5 items-center">
        {!optionsOpen && (
          <div
            onClick={() => setOptionsOpen(true)}
            className="p-3 rounded-2xl bg-gray-100"
          >
            <MdNotes className="text-3xl text-gray-400" />
          </div>
        )}

        {optionsOpen && (
          <div className=" flex flex-col">
            <RxCross1
              onClick={() => setOptionsOpen(false)}
              className="text-2xl text-gray-400 self-end cursor-pointer"
            />
            <button
              onClick={handleDelete}
              className="text-red-500 bg-gray-50 rounded-md px-2 py-1 hover:text-red-700  mt-2"
            >
              Delete
            </button>
            <button
              onClick={openEditModal}
              className="text-blue-500 bg-gray-50 rounded-md hover:text-blue-700 px-2 py-1  mt-2"
            >
              Edit
            </button>
          </div>
        )}

        {modalOpen && (
          <Modal>
            <TodoForm
              title="Edit Todo"
              label="Make changes to your todo and save them."
              editData={editData}
              handleEditChange={handleEditChange}
              handleUpdate={handleUpdate}
              setModalOpen={setModalOpen}
            />
          </Modal>
        )}
        <div>
          <div className="text-sm">{formattedDate}</div>
          <div className="font-semibold text-xl max-w-50 truncate text-black/70 mb-1">
            {title}
          </div>
          <div className="text-gray-600 max-w-50 line-clamp-3 leading-relaxed">
            {description}
          </div>
          <div className="mt-4">
            {is_completed ? (
              <Badge type="completed" onClick={handleToggleStatus}>
                Completed
              </Badge>
            ) : (
              <Badge type="pending" onClick={handleToggleStatus}>
                Pending
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Todo);
