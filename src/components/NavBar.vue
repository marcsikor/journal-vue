<template>
    <nav class="navbar navbar-expand-lg navbar-dark border border-success rounded custom-nav-style">
    <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Home</router-link>
        <router-link class="navbar-brand" to="/new">New entry</router-link>
        <router-link class="navbar-brand" to="/list">Entry list</router-link>
        <router-link class="navbar-brand" to="/signin" v-if="loggedIn === false">Sign in</router-link>
        <a class="navbar-brand" @click="signUserOutFirebase" v-if="loggedIn">Sign out</a>
    </div>
    </nav>
</template>

<script setup>
    import { ref } from 'vue';
    import { getAuth, onAuthStateChanged, signOut  } from "firebase/auth";
    import { appFirebase } from "../firebase-config/config"
    import router from "../router";
    
    const auth = getAuth(appFirebase)
    const loggedIn = ref(null) 

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        loggedIn.value = true;
        // console.log(loggedIn.value);
      } else {
        loggedIn.value = false;
      }
    });

    function signUserOutFirebase(){
      signOut(auth).then(() => {
        loggedIn.value = false;
        router.push('/');
        router.go(0);
      }).catch((error) => {
        // An error happened.
        console.error("sign out failed! " + error)
      });
    }
</script>
<style>
  .custom-nav-style{
    margin-top: 0.5em;
    margin-bottom: 0.5em !important;
    background: #00000086;
    padding: 0px !important;
  }
  .navbar-brand{
    height: 100% !important;
    padding: 0.75em !important;
    margin-left: 1em !important;
    margin-right: 1em !important;
  }
</style>