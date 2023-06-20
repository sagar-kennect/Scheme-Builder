import { defineStore } from "pinia";

let initialState = {
  // all these properties will have their type inferred automatically
  authLoadType: "normal",

};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore("auth", {
  state: () => {
    return initialState;
  },

  getters: {
    // use getters like computed properties
  },


});
