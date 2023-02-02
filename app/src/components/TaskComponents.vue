<script setup lang="ts">
import TaskList from '@/components/TaskList.vue';
import TaskSearchTextBox from '@/components/TaskSearchTextBox.vue';
import TaskCreateModal from './TaskCreateModal.vue';
import TaskEditModal from './TaskEditModal.vue';
import ShowTaskContentModal from './ShowTaskContentModal.vue';
import { ref } from "vue";
import type { Ref } from "vue";
import { axiosIncludedIdToken as axios } from '../services/axiosIncludedIdToken';
import { Task } from '@/models/task';
import { TaskStatus } from '@/models/taskStatus';

const taskCreateModal      = ref({openModal: ()=>{return}});
const taskEditModal        = ref({openModal: (task: Task)=>{return}});
const showTaskContentModal = ref({openModal: (task: Task)=>{return}});

let tasks     : Ref<Map<number, Task>>       = ref(new Map<number, Task>());
let taskStatus: Ref<Map<number, TaskStatus>> = ref(new Map<number, TaskStatus>());
axios.get('/tasks')
  .then((res) => {
    const _tasks: Map<number, Task> = new Map<number, Task>();
    //ObjectからMap<number, Task>への変換
    Object.keys(res.data.tasks).forEach((id: string) => { _tasks.set(Number(id), new Task(res.data.tasks[id])) });
    tasks.value       = _tasks;
    const _taskStatus: Map<number, TaskStatus> = new Map<number, TaskStatus>();
    //ObjectからMap<number, Task>への変換
    Object.keys(res.data.taskStatus).forEach((id: string) => { _taskStatus.set(Number(id), new TaskStatus(res.data.taskStatus[id])) });
    taskStatus.value  = _taskStatus;
    console.log('get tasks');
  }).catch((error) =>{
    console.error(error.code + ": " + error.message);
  });

function setTasks(_tasks: any): void {
  tasks.value = _tasks;
}

function getTaskStatusName(taskStatusId: number): string {
  const taskStatusName: string|undefined = taskStatus.value.get(taskStatusId)?.name;
  return  taskStatusName ? taskStatusName : "";

}

function openCreateTaskModal(): void {
  taskCreateModal.value.openModal();
}

function showTaskContent(taskId: number): void {
  const task = tasks.value.get(taskId)
  if(task) showTaskContentModal.value.openModal(task);
}

function editTask(taskId: number): void {
  const task = tasks.value.get(taskId)
  if(task) taskEditModal.value.openModal(task);
}

function addTask(task: Task): void{
  tasks.value.set(task.id, task);
}

function updateTask(task: any): void {
  tasks.value.set(task.id, task);
}

function deleteTask(taskId: number): void {
  tasks.value.delete(taskId);
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
