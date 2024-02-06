<template>
  <h1 class="text-center" id="customheader">Welcome to a simple journaling app</h1>
  <div v-if="loggedIn == null">
    <h2 class="text-center customsubheader">Please create an account or log in to use the application</h2>
    <div class="row">
      <div class="col-md-6 text-center">
        <router-link class="btn btn-outline-success homebutton" to="/signin">Sign in</router-link>
      </div>
      <div class="col-md-6 text-center">
        <router-link class="btn btn-outline-success homebutton" to="/signup">Sign up</router-link>
      </div>
    </div>
  </div>
  <div v-if="loggedIn != null">
    <h2 class="text-center customsubheader">Create or view journal entries</h2>
    <div class="row">
      <div class="col-md-6 text-center">
        <router-link class="btn btn-outline-success homebutton" to="/new">New entry</router-link>
      </div>
      <div class="col-md-6 text-center">
        <router-link class="btn btn-outline-success homebutton" to="/list">Entry list</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { getUser } from "../firebase/config";

  const loggedIn = ref(null)
  
  onMounted(()=>{
    initHome();
  });

  async function initHome(){
    try{
      loggedIn.value = await getUser();
    }
    catch{
      loggedIn.value = null;
       console.log("no user")
    }
  }
   

</script>

<style scoped>
  .homebutton{
    padding: 3em !important;
  }
  #customheader{
    margin-top: 1em !important;
  }
  .customsubheader{
    margin-top: 1em !important;
    margin-bottom: 3em !important;
  }
</style>