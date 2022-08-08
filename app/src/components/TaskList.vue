<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Ref } from "vue";
// import { axiosIncludedIdToken as axios } from '../services/axiosIncludedIdToken';

defineProps(['tasks', 'getTaskStatusName']);
// const getTaskStatusName = defineEmits(['getTaskStatusName']);

</script>

<template>
  <div class="taskList">
     <button type="button" class="btn btn-success">create task</button>
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
          <td>{{ task.title }}</td>
          <td>Contentボタンの予定</td>
          <td>{{ task.startDate }}</td>
          <td>{{ task.endDate }}</td>
          <td>{{getTaskStatusName(task.taskStatusId)}}</td>
          <td>ボタンの予定</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>