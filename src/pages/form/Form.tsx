import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "./form.module.scss";
import { PaperClipIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setChangeTask, setDataTask } from "@/store/dataReducer/dataSlice";

interface TaskFormState {
  title: string;
  description: string;
  file: string | null;
  status: boolean;
  index?: number;
}

export default function Form() {
  const navigate = useNavigate();
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const {dataChangeTask} = selector((state)=> state.dataSlice);
  const [formState, setFormState] = useState<TaskFormState>(dataChangeTask[0] ? dataChangeTask[0] : {
    title: "",
    description: "",
    file: null,
    status: false,
  });
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormState((prevState) => ({
        ...prevState,
        file: file.name, // Сохраняем файл в исходном виде
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { title?: string } = {};

    if (!formState.title.trim()) {
      newErrors.title = "Заголовок задачи обязателен для заполнения.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      if(!formState.index) {
        dispatch(setDataTask(formState))
      } else {
        dispatch(setDataTask(formState))
      }
      console.log("Submitted data:", formState);

      // Сброс состояния формы
      setFormState({
        title: "",
        description: "",
        file: null,
        status: false,
      });

      // Перенаправление на главную страницу
      resetTask()
      navigate("/");
    }
  };

  const resetTask = () => {
    dispatch(setChangeTask(null))
    setFormState({
      title: "",
      description: "",
      file: null,
      status: false,
    });
  }


  return (
    <form className={s.customClass} onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Задача</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Заголовок задачи
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Заголовок"
                  autoComplete="off"
                  value={formState.title}
                  onChange={handleInputChange}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Описание
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formState.description}
                  onChange={handleInputChange}
                  className="resize-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Опишите свою задачу.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="file" className="block text-sm font-medium leading-6 text-gray-900">
                Добавить файл
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PaperClipIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Загрузить файл</span>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">или перетащите сюда</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">до 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to="/">
          <button onClick={resetTask} type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
        </Link>
        
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
      </div>
    </form>
  );
}
