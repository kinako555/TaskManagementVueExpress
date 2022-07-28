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
import axios from 'axios';

const router: Router               = useRouter()
const auth: Auth                   = getAuth()
const provider: GoogleAuthProvider = new GoogleAuthProvider()

type SigninParam = {
  idToken?: string;
  providerId?: string;
};

const googleAuth = () => {
  signInWithPopup(auth, provider)
  .then(async(result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const idToken = await result.user.getIdToken();
    const signinParam: SigninParam = { idToken:    idToken, 
                                       providerId: credential?.providerId };
    axios.post("/auth/oauthSignin",signinParam,{})
      .then((res) => {
        console.log('signin');
        router.push('afterSignin');
      }).catch((err)=> {
        console.error(err.code + ": " + err.message)
      });
  }).catch((error) => {
    // Handle Errors here.
    // The AuthCredential type that was used.
    //const credential = GoogleAuthProvider.credentialFromError(error)
    console.error(error.code + ": " + error.message)
    // ...
  })
}
</script>