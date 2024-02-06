<template>
    <h4 class="text-center login-header">Please provide your email and password to create an account.</h4>
    <h5 class="text-center">Please note, that your password has to have at least 6 characters in lenght</h5>
    <form @submit.prevent="submit">
        <div class="form-group login-form">
            <label for="email">E-mail</label>
            <input id="email" type="email" name="email" v-model="email" required class="form-control" aria-describedby="emailHelp" placeholder="Enter email"><br>
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" required class="form-control" placeholder="Password">
            <div class="text-center">    
                <button type="submit" class="btn btn-outline-success login-button">Sign up</button>
            </div>
            <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>
    </form>
    <!-- <p> {{ email }} {{ password }}</p> -->
</template>
    
<script setup>
    import { ref } from "vue";
    import router from "../router";
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { appFirebase } from "../firebase-config/config"

    const email = ref("");
    const password = ref("");
    const errorMessage = ref(null);

    const auth = getAuth(appFirebase)
    
    function submit(){
        createUserWithEmailAndPassword (auth, email.value, password.value)
            .then(() => {
                // Signed in 
                errorMessage.value = null;
                console.log('signup successful');
                router.push('/');
            })
            .catch((error) => {
                errorMessage.value = "Signing up failed. This email might already be registered or your password is less than 6 characters long."
                console.log(error.code, error.message)
            });
    }
</script>
<style scoped>
.login-header{
    margin-top: 2em;
}
.login-error{
    color: red;
    margin-top: 1em;
}
.login-button{
    margin-top: 1em;
    padding: 1em !important;
}
.login-form{
    margin-left: 15em;
    margin-right: 15em;
}
</style>