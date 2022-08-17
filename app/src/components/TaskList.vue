<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { axiosIncludedIdToken as axios } from '../services/axiosIncludedIdToken';

defineProps(['tasks', 'getTaskStatusName']);
const emit = defineEmits(['deleteTask', 'editTask', 'showTaskContent']);

function deleteTask(taskId: string): void {
  axios.delete('/tasks/'+taskId).then((res) => {
    console.log('delete task');
    emit('deleteTask', taskId);
  }).catch((error) => {
    console.error(error);
    alert('登録に失敗しました プラウザをリロードしてください');
  });
}

function editTask(taskId: string): void {
  emit('editTask', taskId);
}

function showTaskContent(taskId: string): void {
  emit('showTaskContent', taskId);
}

</script>

<template>
  <div class="taskList">
    <h1>Task List</h1>
    <table class="w-100">
      <thead>
        <td>No</td>
        <td>Title</td>
        <td>Content</td>
        <td>Start_date</td>
        <td>End_date</td>
        <td>Status</td>
        <td>-</td>
      </thead>
      <tbody>
        <tr v-for="(task, key, i) in tasks" :key="task.id">
          <td>{{ Number(i)+1 }}</td>
          <td>{{ task.title }}</td>
          <td><button @click="showTaskContent(task.id)">content</button></td>
          <td>{{ task.startDate }}</td>
          <td>{{ task.endDate }}</td>
          <td>{{getTaskStatusName(task.taskStatusId)}}</td>
          <td><button @click="editTask(task.id)">edit</button><button @click="deleteTask(task.id)">delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>