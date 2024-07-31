class Store<S> {
  private store: { [key: string]: any };
  private reducers: {
    [key: string]: { [action: string]: (state: any, action?: any) => any };
  };
  private initialState: { [key: string]: any };
  private subscribers: { [key: string]: Array<() => void> };
  private length: number;

  constructor() {
    this.store = {};
    this.initialState = {};
    this.subscribers = {};
    this.length = 0;
    this.reducers = {};
  }

  public storeList() {
    return this.store as S;
  }

  protected reducersList() {
    return this.reducers;
  }

  public createStore<T>({
    name,
    initialValue,
    reducers,
  }: {
    name: string;
    initialValue: T;
    reducers: { [key: string]: (state: T, action?: any) => T };
  }) {
    this.store[name] = initialValue;
    this.initialState[name] = initialValue;
    this.reducers[name] = reducers;
    this.subscribers[name] = [];
    this.length++;
  }

  public dispatch(action: { type: string; payload?: any; storeName: string }) {
    const { type, payload, storeName } = action;
    const reducer = this.reducers[storeName][type];
    if (reducer) {
      try {
        this.store[storeName] = reducer(this.store[storeName], payload);
        this.subscribers[storeName].forEach((callback) => callback());
      } catch (error) {
        console.error(`Error in reducer ${type}:`, error);
      }
    }
  }

  public subscribe(storeName: string, callback: () => void) {
    if (!this.subscribers[storeName]) {
      this.subscribers[storeName] = [];
    }
    this.subscribers[storeName].push(callback);
    return () => {
      this.subscribers[storeName] = this.subscribers[storeName].filter(
        (cb) => cb !== callback
      );
    };
  }

  public reset(storeName: string) {
    this.store[storeName] = this.initialState[storeName];
  }

  public createAction(type: string, storeName: string) {
    return (payload?: any) => this.dispatch({ type, payload, storeName });
  }

  public applyMiddleware(
    middleware: (
      store: Store<S>
    ) => (next: (action: any) => void) => (action: any) => void
  ) {
    const oldDispatch = this.dispatch;
    this.dispatch = (action) => {
      const next = oldDispatch.bind(this);
      return middleware(this)(next)(action);
    };
  }
}

type StoreInitial = {
  settings: {
    theme: string;
    type: string;
    isOnline: boolean;
  };
  counter: number;
};

const initialApp: StoreInitial = {
  settings: {
    theme: "dark",
    type: "outline",
    isOnline: false,
  },
  counter: 5,
};

const loggerMiddleware =
  (store: Store<StoreInitial>) =>
  (next: (action: any) => void) =>
  (action: any) => {
    console.log("dispatching", action);
    let result = next(action);
    console.log("next state", store.storeList());
    return result;
  };

const store = new Store<StoreInitial>();
//store.applyMiddleware(loggerMiddleware);

store.createStore({
  name: "settings",
  initialValue: initialApp.settings,
  reducers: {
    changeTheme: (state) => {
      if (state.theme === "dark") {
        state.theme = "light";
      } else if (state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "system";
      }
      return { ...state, theme: state.theme };
    },
    changeType: (state, action) => ({ ...state, type: action }),
    onlineStatus: (state) => ({ ...state, isOnline: !state.isOnline }),
  },
});

store.createStore({
  name: "counter",
  initialValue: initialApp.counter,
  reducers: {
    increase: (state) => state + 1,
    decrease: (state) => state - 1,
  },
});

store.dispatch({
  type: "changeType",
  storeName: "settings",
  payload: "bordered",
});

const up = store.createAction("increase", "counter");
const down = store.createAction("decrease", "counter");

const unsubscribe = store.subscribe("counter", () => {
  console.log("Counter state changed:", store.storeList()["counter"]);
});

console.log(store.storeList());

unsubscribe();
