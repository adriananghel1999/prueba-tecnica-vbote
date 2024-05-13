<template>
  <UContainer class="container mx-auto">
    <h1 class="text-3xl mb-2">Welcome to the task list manager</h1>

    <TaskForm @onSendTask="onSendTask" />
    <TaskLists :taskLists="taskLists" @onDeleteTask="onDeleteTask" />
  </UContainer>
</template>

import { reactive } from "vue";

<script setup lang="ts">
import { reactive, defineEmits } from "vue";
import type { List } from "../interfaces/List";
import type { Task } from "../interfaces/Task";

let taskLists: List[] = reactive([
  {
    name: "All tasks",
    tasks: [
      {
        title: "Test 1",
        description: "Description of test 1",
        completed: false,
        priority: 0,
      },
      {
        title: "Test 2",
        description: "Description of test 2",
        completed: false,
        priority: 0,
      },
    ],
    filteringOptions: {
      completed: {
        value: "none",
      }
    },
  },
]);

function onSendTask(task: Task) {
  taskLists[0].tasks.push({...task});
}

function onDeleteTask({ list, taskIndex }: { list: List; taskIndex: number }) {
  list.tasks.splice(taskIndex, 1);
}
</script>
