<template>
    <form @submit.prevent="submit">
        <div class="form-group">
            <label for="email">E-mail</label>
            <input id="email" type="email" name="email" v-model="email" required class="form-control" aria-describedby="emailHelp" placeholder="Enter email"><br>
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" required class="form-control" placeholder="Password">
            <button type="submit" class="btn btn-primary">Sign in</button>
        </div>
    </form>
    <!-- <p> {{ email }} {{ password }}</p> -->
</template>
    
<script setup>
    import { ref } from "vue";
    import router from "../router";
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { appFirebase } from "../firebase/config"

    const email = ref("");
    const password = ref("");
    
    const auth = getAuth(appFirebase)
    
    function submit(){
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            console.log('login successful');
            router.push('/');
        })
        .catch((error) => {
            console.log(error.code, error.message);
        });
    }
</script>