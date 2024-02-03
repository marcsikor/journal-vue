<template>
    <form>
        <label for="email">E-mail</label>
        <input id="email" type="email" v-model="email" required><br>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required>
        <button @click="submit">Sign in</button>
    </form>
    <!-- <p> {{ email }} {{ password }}</p> -->
</template>
    
<script setup>
    import { ref } from "vue";
    const email = ref("");
    const password = ref("");
    
    function submit(e){
        e.preventDefault();
        console.log(email.value + " " + password.value)
    }
</script>