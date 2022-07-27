
<template>
  <div class="signin">
    <h1>Signin</h1>
    <input type="email" v-model="mailaddress" placeholder="email"/><br/>
    <input type="password" v-model="password" placeholder="password"/><br/>
    <button @click="signUp">Signin</button><br/>
    <router-link to="/signup">Go to Signup Page</router-link>
    <OAuthButtons />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { getAuth, signInWithEmailAndPassword  } from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';
import type {Auth} from 'firebase/auth';
import OAuthButtons from '@/components/auth/OAuthButtons.vue';
import axios from 'axios';

let mailaddress: Ref<string> = ref('');
let password:    Ref<string> = ref('');
const router: Router = useRouter();
const auth: Auth = getAuth();
const signUp = () => {
  signInWithEmailAndPassword (auth, mailaddress.value, password.value)
  .then(async(userCredential: UserCredential) => {
    const idToken = await userCredential.user.getIdToken();
    axios.post("/auth/signin",{idToken: idToken},{})
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
};
</script>