<template>
  <div>
    <div v-for="(list, index) in taskLists" :key="index">
      <h1 class="mb-2 text-xl">{{ list.name }}</h1>
      <URadioGroup
        class="mb-2"
        v-model="list.filteringOptions.completed.value"
        legend="Filters"
        :options="filterOptions"
      />
      <draggable
        handle=".handle"
        :list="list.tasks"
        item-key="id"
        group="list"
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <template #item="{ element, index: taskIndex }">
          <div
            class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
           v-if="filterTask(element, list.filteringOptions)">
            <UIcon
              name="i-heroicons-arrows-pointing-out-20-solid"
              class="handle mb-2 cursor-move"
            />
            <UFormGroup label="Title" name="title" class="mb-2"
              ><UInput label="Title" type="text" v-model="element.title"
            /></UFormGroup>
            <UFormGroup label="Description" name="description" class="mb-2"
              ><UTextarea
                label="Description"
                type="text"
                v-model="element.description"
            /></UFormGroup>
            <UCheckbox
              label="Completed"
              type="checkbox"
              class="mb-2"
              v-model="element.completed"
            />

            <URadioGroup
              v-model="element.priority"
              legend="Priority"
              class="mb-2"
              :options="[
                { value: 0, label: 'Low' },
                { value: 1, label: 'Medium' },
                { value: 2, label: 'High' },
              ]"
            />
            <UButton @click="deleteTask(list, taskIndex)">Delete</UButton>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import type { List } from "../interfaces/List";
import { defineEmits, defineProps, ref } from "vue";
import type { Task } from "../interfaces/Task";

defineProps<{
  taskLists?: Array<List>;
}>();

const emit = defineEmits(["onDeleteTask"]);

const deleteTask = (list: List, taskIndex: number) => {
  emit("onDeleteTask", { list, taskIndex });
};

const filterOptions = [
  {
    value: "none",
    label: "All tasks",
  },
  {
    value: "completed",
    label: "Completed tasks",
  },
  {
    value: "incompleted",
    label: "Incompleted tasks",
  },
];

function filterTask(task: Task, filteringOptions: any) {
  let completedFilter = false;

  if (task.completed && filteringOptions.completed.value === "completed") {
    completedFilter = true;
  } else if (!task.completed && filteringOptions.completed.value === "incompleted") {
    completedFilter = true;
  } else if (filteringOptions.completed.value === "none") {
    completedFilter = true;
  }

  return completedFilter;
}
</script>
