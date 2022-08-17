<template>
  <div class="afterSignin">
    <h1>Task Management Site</h1>
    <SignoutButton/>
    <DeleteUserButton/>
    <TaskComponents/>
  </div>
</template>


<script setup lang="ts">
import SignoutButton from '@/components/auth/SignoutButton.vue'
import DeleteUserButton from '@/components/DeleteUserButton.vue'
import TaskComponents from '@/components/TaskComponents.vue'

</script>
