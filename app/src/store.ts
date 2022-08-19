import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'


// ストアのステートに対して型を定義します
export interface State {
  uid: string,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    uid: '',
  },
  mutations: {
    setUid(state: State, uid: string): void {
      state.uid = uid;
    },
    clearUid(state: State): void {
      state.uid = '';
    },
  },
  actions: {
    setUid({ commit }, uid: string): void{
      commit('setUid', uid);
    },
    signout({ commit }): void {
      commit('clearUid');
    },
  },
  getters: {
    isSignin(state: State): boolean {
      return state.uid !== '';
    }
  },
  strict: process.env.NODE_ENV !== 'production',
});

/* useStore関数の上書き */
export function useStore (): Store<State> {
  return baseUseStore(key);
}