/*type Initial<T = unknown> = {
  name: string;
  initialValue: T;
  reducers: { [key: string]: (state: T, action: any) => T };
};

const store: { [key: string]: any } = {};

const createStore = <T>(properties: Initial<T>) => {
  store[properties.name] = properties.initialValue;

  for (const actionName in properties.reducers) {
    if (properties.reducers.hasOwnProperty(actionName)) {
      const reducer = properties.reducers[actionName];
      store[properties.name] = reducer(store[properties.name], {});
    }
  }
  return store;
};

type InitialTypes = {
  row: number;
  theme: string;
  fill: any[];
};
const initialSetting: InitialTypes = {
  row: 1,
  theme: "dark",
  fill: [
    {
      isOK: true,
      isFull: true,
    },
  ],
};

const createDispatch = () => {
  return (storeName: string) => {
    return (actionFn: () => any) => {
      const storeValue = store[storeName];
      if (storeValue !== undefined) {
        const updatedState = actionFn(storeValue);
        store[storeName] = updatedState;
      } else {
        console.error(
          `Store içinde '${storeName}' isimli bir değer bulunamadı.`
        );
      }
    };
  };
};
const dispatch = createDispatch();



const SettingStore = createStore({
  name: "settings",
  initialValue: initialSetting,
  reducers: {
    up: (state) => {
      return { ...state, row: state.row + 1 };
    },
    down: (state) => {
      return { ...state, row: state.row - 1 };
    },
  },
});

const docs = document.getElementById("upper") as HTMLButtonElement;
docs.onclick = () => {
  dispatch("settings")((SettingStore) => SettingStore.up());
};
console.log(SettingStore);
*/
