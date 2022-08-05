<script setup lang="ts">
import { ref } from "vue";
import { axiosIncludedIdToken as axios } from '../services/axiosIncludedIdToken';

let tasks: any = ref(null);
let taskStatus: any = ref(null);
axios.get('/tasks')
  .then((res) => {
    tasks.value       = res.data.tasks;
    taskStatus.value  = res.data.taskStatus;
    console.log('get tasks');
  }).catch((error) =>{
    console.error(error.code + ": " + error.message);
  });

</script>

<template>
  <div class="taskList">
    <table>
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
        <tr v-for="(task, i) in tasks" :key="task.id">
          <td>{{ i+1 }}</td>
          <td>{{ task['title'] }}</td>
          <td>Contentボタンの予定</td>
          <td>{{ task['startDate'] }}</td>
          <td>{{ task['endDate'] }}</td>
          <td>Status</td>
          <td>ボタンの予定</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>