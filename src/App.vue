<template>
  <div id="app">
    <todo-header />
    <todo-input v-on:addTodoItem="addTodoItem" />
    <todo-list
      v-bind:todoItems="todoItems"
      v-on:removeTodoItem="removeTodoItem"
      v-on:toggleComplete="toggleComplete"
    />
    <todo-footer v-on:clearAllItem="clearAllItem" />
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  data() {
    return {
      todoItems: [],
    };
  },
  methods: {
    addTodoItem(todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeTodoItem(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleComplete(todoItem, index) {
      /* anti pattern, 인자를 직접 수정하지 말자! (현재 상황: props로 내린 데이터를 하위 컴포넌트가 emit 인자로 전달해서 직접 수정하는 경우)  */
      // todoItem.completed = !todoItem.completed;
      this.todoItems[index].completed = !this.todoItems[index].completed;
      localStorage.setItem(
        todoItem.item,
        JSON.stringify(this.todoItems[index])
      );
    },
    clearAllItem() {
      localStorage.clear();
      this.todoItems = [];
    },
  },
  created() {
    /* 인스턴스가 생성된 후 호출 */
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        this.todoItems.push(
          JSON.parse(localStorage.getItem(localStorage.key(i)))
        );
      }
    }
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  },
};
</script>

<style>
/* 전역 스타일 정의 */
body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
