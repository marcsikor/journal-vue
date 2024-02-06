<template>
    <h3 class="text-center my-5">View entry {{ title }}</h3>
    <div class="form-group">
        <div id="textoutput" class="form-control output-height mx-5">
            <small v-if="output || title">Created on {{ createdDate }}</small>
            <h1 class="title" v-if="title"> {{ title }}</h1>
            <hr>
            <div v-dompurify-html="marked.parse(content)"></div>
        </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-4 text-center">
        <router-link class="btn btn-outline-success p-3" to="/list">Back to entry list</router-link>
      </div>
      <div class="col-md-4 text-center">
        <router-link class="btn btn-outline-success p-3" :to="{ name: 'edit', params: { id: $route.params.id } }">Edit entry</router-link>
      </div>
      <div class="col-md-4 text-center">
        <button class="btn btn-outline-danger p-3 button-delete" @click="deleteEntry">Delete entry</button>
      </div>
    </div>
  </template>

<script setup>
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";
    import { deleteDoc, doc, getDoc } from "firebase/firestore";
    import { db } from "../firebase/config"
    import { marked } from 'marked';
    import router from "../router";

    const content = ref("");
    const title = ref("");
    const createdDate = ref("");
    const docRef = ref(null);
    // console.log('The id is: ' + useRoute().params.id);
    
    onMounted(() =>{
        initData();
    });

    async function initData(){
        docRef.value = doc(db, "journalEntries", useRoute().params.id);
        const docSnap = await getDoc(docRef.value);
        // console.log(docSnap)
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            content.value = docSnap.data().content;
            title.value = docSnap.data().title;
            createdDate.value = docSnap.data().createdDate;
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    async function deleteEntry(){
        await deleteDoc(docRef.value);
        router.push('/list');
    }

</script>

<style scoped>

#textoutput{
  white-space: pre-wrap;
  width: auto !important;
}
.textarea-heigth{
  height: 500px;
  display: flex;
  flex-direction: column; }
.output-height{
  height: 500px;
  overflow: auto;
}
.title{
  margin-top: 5px;
}

.button-delete:hover{
  background-color: red !important;
}

</style>
