<template>
  <div class="afterSignin">
    <h1>Success!!</h1>
    <SignoutButton/>
    <DeleteUserButton/>
    <TaskList/>
  </div>
</template>


<script setup lang="ts">
import SignoutButton from '@/components/auth/SignoutButton.vue'
import DeleteUserButton from '@/components/DeleteUserButton.vue'
import TaskList from '@/components/TaskList.vue';

</script>
