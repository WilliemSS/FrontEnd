<template>
  <div class="container">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-6 col-sm-8 card">
        <div class="card-header">
          <h1>Login</h1>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="username">Username</label>
              <input v-model="username" type="text" id="username" name="username" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input v-model="password" type="password" id="password" name="password" class="form-control" required>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
            <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const router=useRouter();

const handleSubmit = () => {
  if (username.value === "admin" && password.value === "admin") {
    //Navigate to MatkulList route upon successfull login
    router.push({name:'matkulList'});
    errorMessage.value = "";
  } else {
    errorMessage.value = "Invalid username or password";
  }
};
</script>