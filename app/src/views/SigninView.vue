
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
  .then((userCredential: UserCredential) => {
    // TODO: APIにアクセストークン送信
    axios.post("http://localhost:8080/auth/signup",{access_token: userCredential.user.getIdToken},{})
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