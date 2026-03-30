import { useState } from "react";
import useTodo from "../hooks/useTodo";
import Badge from "./Badge";
import { MdNotes } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Modal from "./Modal";

export default function Todo({ todoData, onChanged }) {
  const formattedDate = new Date(todoData.created_at).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "2-digit"
  });

  const [data, setData] = useState(todoData);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { updateTodo, deleteTodo } = useTodo();

  const handleDelete = async () => {
    const isDeleted = await deleteTodo(todoData.id);
    if (isDeleted && onChanged) {
      onChanged();
    }
  };

  const handleUpdate = async () => {
    const updatedTodo = await updateTodo(todoData.id, { ...data });
    if (updatedTodo && onChanged) {
      onChanged();
    }
  };

  const handleToggleStatus = async () => {
    const updatedTodo = await updateTodo(todoData.id, {
      ...todoData,
      is_completed: !todoData.is_completed,
    });

    if (updatedTodo && onChanged) {
      onChanged();
    }
  };

  return (
    <div className="p-4 bg-white max-w-87.5 w-100 ">
      <div className="flex flex-row gap-5 items-center">
        {
          !optionsOpen && (
             <div onClick={() => setOptionsOpen(true)} className="p-3 rounded-2xl bg-gray-100">
        <MdNotes className="text-3xl text-gray-400" />
      </div>
          )
        }
     
      {
        optionsOpen && (
          <div className=" flex flex-col">
            <RxCross1 onClick={() => setOptionsOpen(false)} className="text-2xl text-gray-400 self-end cursor-pointer" />
          <button
            onClick={handleDelete}
            className="text-red-500 bg-gray-50 rounded-md px-2 py-1 hover:text-red-700  mt-2"
          >
            Delete
          </button>
          <button
          onClick={() => setModalOpen(true)}
            className="text-blue-500 bg-gray-50 rounded-md hover:text-blue-700 px-2 py-1  mt-2"
          >
            Edit
          </button>
        </div>
        )
      }
      {
        modalOpen && (
          <Modal>
            <div className="bg-white p-5 rounded-md max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full mb-3 px-3 py-2 border-b focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Title"
              />
              <textarea
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                className="w-full mb-3 px-3 py-2 border-b focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
                rows={4}
              />
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleUpdate();
                    setModalOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
                        </Modal>
        )
      }
      <div>
        <div className="text-sm">
          {formattedDate}
        </div>
      <div className="font-semibold text-xl max-w-50 truncate text-black/70 mb-1">{todoData.title}</div>
      <div className="text-gray-600 max-w-50 line-clamp-3 leading-relaxed">{todoData.description}</div>
      <div className="mt-4">
      {
        todoData.is_completed ? (
          <Badge type="completed" onClick={handleToggleStatus}>
            Completed
          </Badge>
        ) : (
          <Badge type="pending" onClick={handleToggleStatus}>
            Pending
          </Badge>
        )
      }
      </div>
      </div>
      </div>
    </div>
  );
}
