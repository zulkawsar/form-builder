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
    deleteFormElement(state, { form, index }) {
      form.splice(index, 1);
    },
    setActiveTabForFields(state, value) {
      state.activeTabForFields = value;
    },
    setactiveField(state, value) {
      state.activeField = value;
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
