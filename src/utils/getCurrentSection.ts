import create from "zustand/vanilla";

interface State {
  activeSection: string;
}

const store = create<State>((set) => ({
  activeSection: "",
}));

const { getState, setState, subscribe } = store;

export { getState, setState, subscribe };
