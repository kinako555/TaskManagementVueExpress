<script setup lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import type {Auth} from 'firebase/auth';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { axiosIncludedIdToken as axios } from '@/services/axiosIncludedIdToken';

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
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const signinParam: SigninParam = { providerId: credential?.providerId };
    axios.post("/auth/oauthSignin",signinParam,{})
      .then((res) => {
        successSignin();
      }).catch((err)=> {
        console.error(err.code + ": " + err.message);
      });
  }).catch((error) => {
    console.error(error.code + ": " + error.message);
  });
}

function successSignin() :void{
  console.log('signin');
  router.push('afterSignin');
}
</script>

<template>
  <div class="oAuthButtons">
    <img src="@/assets/oauthButtons/btn_google_signin_dark_focus_web@2x.png" alt="GoogleOauthButton" class="mt-3" @click="googleAuth"/>
  </div>
</template>