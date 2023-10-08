// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    forms: [],
    activeField: null,
    activeTabForFields: 'elements',
  },
  mutations: {
    addForm(state, formObj) {
      state.forms.push(formObj);
    },
    deleteForm(state, formIndex) {
      state.forms.splice(formIndex, 1);
    },
    setActiveTabForFields(state, value) {
      state.activeTabForFields = value;
    },
    // other mutations...
  },
  actions: {
    // your actions...
  },
  getters: {
    // your getters...
  },
});
