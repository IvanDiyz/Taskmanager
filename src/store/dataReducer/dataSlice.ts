import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  title: string;
  description: string;
  file: string | null;
  status: boolean;
  index?: number;
}

interface DataState {
  dataTasks: Task[];
  dataChangeTask: Task[];
}

const initialState: DataState = {
  dataTasks: [
    {
      title: 'Выполнить задачу',
      description: 'Сходить за одуванчиками',
      file: null,
      status: false,
    },
  ],
  dataChangeTask: [],
};

export const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    // Добавление новой задачи
    setDataTask: (state, action: PayloadAction<Task>) => {
      let {title, description, file, status, index} = action.payload;
      if(index !== undefined) {
        state.dataTasks[index] = {title, description, file, status};
      } else {
        state.dataTasks.push(action.payload);
      }
    },
    // Удаление новой задачи
    deleteDataTask: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.dataTasks.splice(index, 1)
    },
    // Изменение задачи по индексу
    setChangeTask: (state, action: PayloadAction<number | null>) => {
      const index = action.payload;
      if (index !== null && index >= 0 && index < state.dataTasks.length) {
        const task = state.dataTasks[index];
        task.index = index;
        state.dataChangeTask = [task];
      } else {
        state.dataChangeTask = [];
      }
    },
    // Изменение статуса задачи по индексу
    setTaskStatus: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const task = state.dataTasks[index];
      if (task) {
        // Переключаем статус
        state.dataTasks[index].status = !task.status;
      }
    },
  },
  extraReducers: (builder) => {}
});


// Экспортируем правильно названные действия
export const { setDataTask, setTaskStatus, setChangeTask, deleteDataTask } = dataSlice.actions;
export default dataSlice.reducer;
