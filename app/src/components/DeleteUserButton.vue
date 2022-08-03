<template>
  <div class="deleteUserButton">
    <button @click="deleteUser">delete user</button>
  </div>
</template>

<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth';
import type {Auth} from 'firebase/auth';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { axiosIncludedIdToken as axios } from '@/services/axiosIncludedIdToken';

const router: Router = useRouter()
const auth: Auth = getAuth();

const deleteUser = async() => {
  if (!window.confirm('ユーザーを削除します。よろしいでしょうか。')) return;
  try {
    let res = await axios.patch('/users/delete');
    console.log(res.data.message);
    alert('ユーザーを削除しました。');
  } catch (error) {
    console.log(error);
  }
  signOut(auth).then(() => {
    console.log('signout');
    router.push('/signin');
  }).catch((error) => {
    console.error(error.code + ': ' + error.message);
    alert('プラウザを更新してください。');
  });
  
}
</script>