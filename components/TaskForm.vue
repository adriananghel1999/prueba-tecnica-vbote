<template>
  <div class="mb-2">
    <h1>Add a task</h1>
    <UForm
      :validate="validate"
      :state="newTask"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup label="Title" name="title">
        <UInput v-model="newTask.title" />
      </UFormGroup>

      <UFormGroup label="Description" name="description">
        <UTextarea v-model="newTask.description" />
      </UFormGroup>

      <UButton type="submit"> Create task </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { reactive, defineEmits } from "vue";
import type { Task } from "../interfaces/Task";

const newTask: Task = reactive({
  title: "",
  description: "",
  completed: false,
  priority: 0,
});

const validate = (state: Task): FormError[] => {
  const errors = [];
  if (!state.title) errors.push({ path: "title", message: "Required" });
  if (!state.description)
    errors.push({ path: "description", message: "Required" });
  return errors;
};

const emit = defineEmits(['onSendTask']);

async function onSubmit(event: FormSubmitEvent<any>) {
  emit("onSendTask", event.data);
}
</script>