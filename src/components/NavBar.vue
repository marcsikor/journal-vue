<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border border-success rounded">
    <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Navbar</router-link>
        <router-link class="navbar-brand" to="/new">Navbar2</router-link>
        <router-link class="navbar-brand" to="/signin" v-if="loggedIn === false">Sign in</router-link>
        <a class="navbar-brand" @click="signUserOutFirebase" v-if="loggedIn">Sign out</a>
    </div>
    </nav>
</template>

<script setup>
    import { ref } from 'vue';
    import { getAuth, onAuthStateChanged, signOut  } from "firebase/auth";
    import { appFirebase } from "../firebase/config"
    
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
        }).catch((error) => {
            // An error happened.
            console.error("sign out failed! " + error)
        });
    }
</script>