import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import s from "./taskList.module.scss";
import { useEffect, useState } from "react";
import { deleteDataTask, setChangeTask, setTaskStatus } from "@/store/dataReducer/dataSlice";
import { ArchiveBoxXMarkIcon, PaperClipIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";


interface Task {
  title: string;
  description: string;
  file: string | null;
  status: boolean;
}

type TaskArray = Task[];
  
  export default function Tasklist() {
    const navigate = useNavigate();
    const selector = useAppSelector;
    const dispatch = useAppDispatch();
    const [data, setDataTasks] = useState<TaskArray>([])
    const {dataTasks} = selector((state)=> state.dataSlice);

    const changeStatus = (index: number) => {
      dispatch(setTaskStatus(index))
    }
    const changeTask = (index: number) => {
      dispatch(setChangeTask(index))
      navigate("/form");
    }
    
    const deleteTask = (index: number) => {
      dispatch(deleteDataTask(index))
    }

    useEffect(() => {
      setDataTasks(dataTasks)
    }, [dataTasks]) 


    return (
      <ul role="list" className={`divide-y divide-gray-100`}>
        {data.map((data, index) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{data.title}</p>
                <p className="mt-3 text-xs leading-5 text-gray-500">{data.description}</p>
              </div>
            </div>
                {data.file && (
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <PaperClipIcon aria-hidden="true" className="mx-auto h-6 w-6 text-gray-300" />
                    <p className="mt-3 truncate text-xs leading-5 text-gray-500">{data.file}</p>
                  </div>
                </div>
                )}
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <div className={`${s.box_icon}`}>
                <PencilSquareIcon onClick={() => changeTask(index)} aria-hidden="true" className="mx-auto h-6 w-6 text-gray-300" />
                <ArchiveBoxXMarkIcon onClick={() => deleteTask(index)} aria-hidden="true" className="mx-auto h-6 w-6 text-gray-300" />
              </div>
              {data.status ? (
                <div className="mt-1 flex items-center gap-x-1.5" onClick={() => changeStatus(index)}>
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Выполнено</p>
              </div>
              ) : (
                <div className="mt-3 flex items-center gap-x-1.5" onClick={() => changeStatus(index)}>
                  <div className="flex-none rounded-full bg-red-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Не выполнено</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    )
  }
  