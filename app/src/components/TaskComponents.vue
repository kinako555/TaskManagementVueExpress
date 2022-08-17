<template>
  <div class="taskComponents">
    <button type="button" class="btn btn-primary" @click="openCreateTaskModal()">
      add task
    </button>
    <TaskList :tasks="tasks" :getTaskStatusName="getTaskStatusName"/>
    <TaskCreateModal :taskStatus="taskStatus" @addTask="addTask" ref="taskCreateModal"/>
  </div>
</template>


<script setup lang="ts">
import TaskList from '@/components/TaskList.vue';
import TaskCreateModal from './TaskCreateModal.vue';
import { ref } from "vue";
import type { Ref } from "vue";
import { axiosIncludedIdToken as axios } from '../services/axiosIncludedIdToken';

let taskCreateModal =ref({modalId: null, openModal: ()=>{return}});

let tasks: Ref<any>      = ref({});
let taskStatus: Ref<any> = ref(null);
axios.get('/tasks')
  .then((res) => {
    tasks.value       = res.data.tasks;
    taskStatus.value  = res.data.taskStatus;
    console.log('get tasks');
  }).catch((error) =>{
    console.error(error.code + ": " + error.message);
  });

function getTaskStatusName(taskStatusId: string): string {
  return taskStatus.value[taskStatusId].name;
}

function openCreateTaskModal(): void {
  taskCreateModal.value.openModal();
}

function addTask(task: any){
  tasks.value[task.id] = task;
  return;
}

</script>
