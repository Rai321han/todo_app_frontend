import { useState } from "react";
import useTodo from "../hooks/useTodo";
import Badge from "./Badge";
import { MdNotes } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

export default function Todo({ todoData }) {
  const formattedDate = new Date(todoData.created_at).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "2-digit"
  });

  const [optionsOpen, setOptionsOpen] = useState(false);

  const { updateTodo, deleteTodo } = useTodo();

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
            onClick={() => deleteTodo(todoData.id)}
            className="text-red-500 bg-gray-50 rounded-md px-2 py-1 hover:text-red-700  mt-2"
          >
            Delete
          </button>
          <button
            className="text-blue-500 bg-gray-50 rounded-md hover:text-blue-700 px-2 py-1  mt-2"
          >
            Update
          </button>
        </div>
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
          <Badge type="completed" onClick={() => updateTodo(todoData.id, {...todoData, is_completed: false })}>
            Completed
          </Badge>
        ) : (
          <Badge type="pending" onClick={() => updateTodo(todoData.id, {...todoData, is_completed: true })}>
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
