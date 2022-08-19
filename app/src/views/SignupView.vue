
<template>
  <div class="signup">
    <h1>Signup</h1>
    <input type="email" v-model="mailaddress" placeholder="email"/><br/>
    <input type="password" v-model="password" placeholder="password"/><br/>
    <button @click="signup">Signup</button><br/>
    <router-link to="/signin">Go to Signin Page</router-link>
    <OAuthButtons />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import type {Auth} from 'firebase/auth'
import OAuthButtons from '@/components/auth/OAuthButtons.vue'
import { axiosIncludedIdToken as axios } from '@/services/axiosIncludedIdToken';
import type { UserCredential } from 'firebase/auth';
import { useStore } from '@/store';

let mailaddress: Ref<string> = ref('')
let password:    Ref<string> = ref('')
const router: Router = useRouter()
const auth: Auth = getAuth();
const store = useStore();

const signup = () => {
  createUserWithEmailAndPassword (auth, mailaddress.value, password.value)
  .then(async (userCredential: UserCredential) => {
    axios.post("/auth/signin")
      .then((res) => {
        console.log('signin');
        router.push('afterSignin');
      }).catch((res)=> {
        console.error(res);
      });
  })
  .catch((error) => {
    console.error(error.code + ': ' + error.message);
  });
}
</script>