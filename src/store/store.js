import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
    return arr;
  },
};

export const store = new Vuex.Store({
  state: {
    todoItems: storage.fetch(),
  },
  mutations: {
    addTodoItem(state, todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      state.todoItems.push(obj);
    },
    removeTodoItem(state, { todoItem, index }) {
      localStorage.removeItem(todoItem.item);
      state.todoItems.splice(index, 1);
    },
    toggleComplete(state, { todoItem, index }) {
      /* anti pattern, 인자를 직접 수정하지 말자! (현재 상황: props로 내린 데이터를 하위 컴포넌트가 emit 인자로 전달해서 직접 수정하는 경우)  */
      // todoItem.completed = !todoItem.completed;
      state.todoItems[index].completed = !state.todoItems[index].completed;
      localStorage.setItem(
        todoItem.item,
        JSON.stringify(state.todoItems[index])
      );
    },
    clearAllItem(state) {
      localStorage.clear();
      state.todoItems = [];
    },
  },
});
