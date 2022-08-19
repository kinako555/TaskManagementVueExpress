<template>
<a class="signoutButton dropdown-item" @click="signout">Signout</a>
</template>

<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'
import type {Auth} from 'firebase/auth'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'
import { useStore } from '@/store';

const router: Router = useRouter();
const auth: Auth = getAuth();
const store = useStore();

const signout = () => {
  signOut(auth).then(() => {
    console.log('signout');
    store.dispatch('signout');
    router.push('/signin');
  }).catch((error) => {
    console.error(error.code + ': ' + error.message);
  });
}
</script>