<script setup lang="ts">
import TaskComponents from '@/components/TaskComponents.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStore } from '@/store'

const auth = getAuth();
const user = auth.currentUser;
const store = useStore();

store.dispatch('setUid', user?.uid);
</script>

<template>
  <div class="afterSignin">
    <div class="mt-5">
      <TaskComponents/>
    </div>
  </div>
</template>


