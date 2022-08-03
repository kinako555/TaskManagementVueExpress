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

      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { axiosIncludedIdToken as axios } from '../services/axiosIncludedIdToken';

let tasks;
let taskStatus;
// axios.post('/tasks');

</script>