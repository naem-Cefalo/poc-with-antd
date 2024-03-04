import { create } from 'zustand';

type State = {
  count: number;
  tableData: any;
};

type Action = {
  next: () => void;
  pre: () => void;
  setTableData: (values: object) => any;
};

export const useCandidateStore = create<State & Action>((set) => ({
  count: 0,
  tableData: [],
  next: () => set((state) => ({ count: state.count + 1 })),
  pre: () => set((state) => ({ count: state.count - 1 })),
  setTableData: (values) =>
    set((state) => ({ tableData: [...state.tableData, values] })),
}));
