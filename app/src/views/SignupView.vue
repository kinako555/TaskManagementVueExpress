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
import { Form, Field, ErrorMessage } from 'vee-validate';
import { getErrorMessage }  from '@/services/authErrorMessageService';

const mailaddress:          Ref<string> = ref('');
const password:             Ref<string> = ref('');
const passwordConfirmation: Ref<string> = ref('');
const authErrorMessage: Ref<string> = ref('');
const router: Router = useRouter();
const auth: Auth = getAuth();

const submit = () => {
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
    const message = getErrorMessage(error.code);
    if (message) authErrorMessage.value = message;
    console.error(error.code + ': ' + error.message);
  });
}
</script>

<template>
  <div class="signup">
    <div class="container mt-5">
      <div class="offset-4 col-4">
        <div class="col-12">
          <h1>Signup</h1>
        </div>
        <Form @submit="submit">
          <div class="col-12 text-start">
            <label class="">Email</label>
          </div>
          <div class="col-12">
            <Field name="email" type="email" v-model="mailaddress" rules="required|email" class="w-100"/>
          </div>
          <div class="col-12 text-start text-danger">
            <ErrorMessage name="email" />
          </div>
          <div class="col-12 text-start">
            <label>Password</label>
          </div>
          <div class="col-12">
            <Field name="password" rules="required" type="password" v-model="password" class="w-100"/>
          </div>
          <div class="col-12 text-start text-danger">
            <ErrorMessage name="password" />
          </div>
          <div class="col-12 text-start">
            <label>Password Confirmation</label>
          </div>
          <div class="col-12">
            <Field name="passwordConfirmation" rules="required|confirmed:@password" type="password" v-model="passwordConfirmation" class="w-100"/>
          </div>
          <div class="col-12 text-start text-danger">
            <ErrorMessage name="passwordConfirmation"/>
          </div>
          <div class="col-12 mt-3">
            <button type="submit" class="w-100">Signup</button>
          </div>
          <div class="col-12 text-start" v-if="authErrorMessage">
            <span class="text-danger">{{authErrorMessage}}</span>
          </div>
        </Form>
        <div class="col-12 mt-3">
          <router-link to="/signin">Go To Signin Page</router-link>
        </div>
        <span class="col-12"><OAuthButtons /></span>
      </div>
      <div class="col-4">
      </div>
    </div>
  </div>
</template>