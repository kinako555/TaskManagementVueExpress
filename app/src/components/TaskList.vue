<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { axiosIncludedIdToken as axios } from '../services/axiosIncludedIdToken';

defineProps(['tasks', 'getTaskStatusName']);
const emit = defineEmits(['deleteTask', 'editTask', 'showTaskContent']);

function deleteTask(taskId: number): void {
  axios.delete('/tasks/'+taskId).then((res) => {
    console.log('delete task');
    emit('deleteTask', taskId);
  }).catch((error) => {
    console.error(error);
    alert('登録に失敗しました プラウザをリロードしてください');
  });
}

function editTask(taskId: number): void {
  emit('editTask', taskId);
}

function showTaskContent(taskId: number): void {
  emit('showTaskContent', taskId);
}

</script>

<template>
  <div class="taskList ms-5 me-5 w-100">
    <table class="table w-100">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Content</th>
          <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
          <th scope="col">Status</th>
          <th scope="col">-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[key, task] in tasks" :key="key">
          <td>{{ task.title }}</td>
          <td><i class="fa-solid fa-crop-simple" @click="showTaskContent(task.id)"></i></td>
          <td>{{ task.startDate }}</td>
          <td>{{ task.endDate }}</td>
          <td>{{getTaskStatusName(task.taskStatusId)}}</td>
          <td><i class="fa-solid fa-pen me-5" @click="editTask(task.id)"></i><i class="fa-solid fa-xmark" @click="deleteTask(task.id)"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>