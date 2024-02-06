<template>
    <h3 class="text-center my-5">Edit entry "{{ title }}"</h3>
    <div class="row">
      <div class="col-md">
          <form>
              <div class="form-group">
                  <label for="textarea">Entry text</label>
                  <textarea class="form-control textarea-custom input-background" id="textarea" v-model="content" />
              </div>
          </form>
      </div>
      <div class="col-md">
          <div class="form-group">
              <label id="hacktest" for="textoutput">Output</label>
              <div id="textoutput" class="form-control output-height">
                  <small v-if="output || title">Created on {{ createdDate }}</small>
                  <h1 class="title" v-if="title"> {{ title }}</h1>
                  <hr>
                  <div v-dompurify-html="marked.parse(content)"></div>
              </div>
          </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 text-center button-cont">
        <router-link class="btn btn-outline-success button-pad" :to="{ name: 'view', params: { id: $route.params.id } }">Go back</router-link>
      </div>
      <div class="col-md-6 text-center button-cont">
        <button class="btn btn-outline-success button-pad" @click.prevent="updateEntry">Save entry</button>
      </div>
    </div>
  </template>
  
  <script setup>
      import { ref, onMounted } from "vue";
      import { useRoute } from "vue-router";
      import { doc, getDoc, updateDoc } from "firebase/firestore"; 
      import { db } from "../firebase-config/config"
      import { marked } from 'marked';
      import router from "../router";

      const content = ref("");
      const title = ref("");
      const createdDate = ref("");
      const docRef = ref("");
      const docId = ref("");

      onMounted(() =>{
        initData();
    });

    async function initData(){
        docId.value = useRoute().params.id
        docRef.value = doc(db, "journalEntries", docId.value);
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

    async function updateEntry(){

          // console.log(content.value)
          // console.log(docRef.value)

          await updateDoc(docRef.value, {
            content: content.value,
            updatedDate: new Date().toLocaleDateString()
        });
        router.push({ name: 'view', params: { id: docId.value } })
        
    }

  </script>
  
  <style scoped>
  
  #textoutput{
    white-space: normal !important;
  }
  .textarea-custom{
      height: 500px;
  }
  .input-background{
      background-color: #0000006c;
  }
  .output-height{
      height: 500px;
      overflow: auto;
  }
  .button-cont{
      margin-top: 2em;
      margin-bottom: 1em;
  }
  .button-pad{
      padding: 1em;
  }
  p{
      margin: 0 !important;
  }
  .row-margin{
      margin-top: 1em;
  }
  .title{
    margin-top: 5px;
  }  
  </style>
  