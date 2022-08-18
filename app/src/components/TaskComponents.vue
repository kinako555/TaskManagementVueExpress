<script setup lang="ts">
import TaskList from '@/components/TaskList.vue';
import TaskSearchTextBox from '@/components/TaskSearchTextBox.vue';
import TaskCreateModal from './TaskCreateModal.vue';
import TaskEditModal from './TaskEditModal.vue';
import ShowTaskContentModal from './ShowTaskContentModal.vue';
import { ref } from "vue";
import type { Ref } from "vue";
import { axiosIncludedIdToken as axios } from '../services/axiosIncludedIdToken';

const taskCreateModal      = ref({openModal: ()=>{return}});
const taskEditModal        = ref({openModal: (task: any)=>{return}});
const showTaskContentModal = ref({openModal: (task: any)=>{return}});

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

function setTasks(_tasks: any): void {
  tasks.value = _tasks;
}

function getTaskStatusName(taskStatusId: string): string {
  return taskStatus.value[taskStatusId].name;
}

function openCreateTaskModal(): void {
  taskCreateModal.value.openModal();
}

function showTaskContent(taskId: string): void {
  showTaskContentModal.value.openModal(tasks.value[taskId]);
}

function editTask(taskId: string): void {
  taskEditModal.value.openModal(tasks.value[taskId]);
}

function addTask(task: any): void{
  tasks.value[task.id] = task;
}

function updateTask(task: any): void {
  tasks.value[task.id] = task;
}

function deleteTask(taskId: string): void {
  delete tasks.value[taskId];
}

</script>

<template>
<div class="taskComponents container">
  <div class="row">
    <span class="col-12"><h1>Task List</h1></span>
  </div>
  <div class="row">
    <span class="col-2">
      <i class="fa-light fa-plus fa-2xl" @click="openCreateTaskModal()"></i>
    </span>
    <span class="col-8">
      <TaskSearchTextBox @setTasks="setTasks"/>
    </span>
    <span class="col-2">

    </span>
  </div>
  <TaskList :tasks="tasks" :getTaskStatusName="getTaskStatusName" 
            @deleteTask="deleteTask" @editTask="editTask" @showTaskContent="showTaskContent" />
  <TaskCreateModal :taskStatus="taskStatus" @addTask="addTask" ref="taskCreateModal"/>
  <TaskEditModal :taskStatus="taskStatus" @updateTask="updateTask" ref="taskEditModal"/>
  <ShowTaskContentModal ref="showTaskContentModal"/>
</div>
</template>
