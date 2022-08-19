<script setup lang="ts">
import SignoutButton from '@/components/auth/SignoutButton.vue';
import DeleteUserButton from '@/components/DeleteUserButton.vue';
import { useStore } from '@/store';

const store = useStore();

</script>

<template>
<nav class="commonHeader navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <span class="navbar-text offset-2 col-8">
      Task Management Site
    </span>
    <div class="nav-item dropdown col-2" v-if="store.getters.isSignin">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa-solid fa-user"></i>
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li>
          <SignoutButton/>
        </li>
        <li>
          <DeleteUserButton/>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>