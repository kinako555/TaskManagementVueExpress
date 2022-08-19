<template>
  <div class="oAuthButtons">
    <button @click="googleAuth">Google</button>
  </div>
</template>

<script setup lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import type {Auth} from 'firebase/auth';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { axiosIncludedIdToken as axios } from '@/services/axiosIncludedIdToken';
import { useStore } from '@/store';

const router: Router               = useRouter()
const auth: Auth                   = getAuth()
const provider: GoogleAuthProvider = new GoogleAuthProvider()
const store = useStore();

type SigninParam = {
  idToken?: string;
  providerId?: string;
};

const googleAuth = () => {
  signInWithPopup(auth, provider)
  .then(async(result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const signinParam: SigninParam = { providerId: credential?.providerId };
    axios.post("/auth/oauthSignin",signinParam,{})
      .then((res) => {
        successSignin(res.data);
      }).catch((err)=> {
        console.error(err.code + ": " + err.message);
      });
  }).catch((error) => {
    console.error(error.code + ": " + error.message);
  });
}

function successSignin(resposeData: any) :void{
  console.log('signin');
  router.push('afterSignin');
}
</script>