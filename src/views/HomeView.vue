<template>
  <h1>Welcome to a simple journaling app</h1>
  <div v-if="loggedIn === false">
    Please create an account or log in to use the application:
    <router-link class="btn btn-outline-success" to="/signin">Navbar2</router-link>
    <router-link class="btn btn-outline-success" to="/signup">Navbar3</router-link>
  </div>
  <div v-if="loggedIn">
    Create or view journal entries:
    <router-link class="btn btn-outline-success" to="/new">Navbar2</router-link>
    <router-link class="btn btn-outline-success" to="/list">Navbar3</router-link>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { appFirebase } from "../firebase/config"

  const auth = getAuth(appFirebase)
  const loggedIn = ref(null)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      loggedIn.value = true;
    } else {
      loggedIn.value = false;
    }
  });

</script>