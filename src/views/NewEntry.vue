<template>
    <h3 class="text-center my-5">Create new entry</h3>
    <form>
        <div class="form-group text-center row-margin">
            <label for="textarea">Journal entry title</label>
            <input class="form-control input-background" type="text" v-model="title" placeholder="Enter title of your entry here"/>
        </div>
    </form>
  <div class="row row-margin">
    <div class="col-md">
        <form>
            <div class="form-group">
                <label for="textarea">Journal entry</label>
                <textarea class="form-control textarea-custom input-background" id="textarea" v-model="output" placeholder="Enter content of your entry here"/>
            </div>
        </form>
    </div>
    <div class="col-md">
        <div class="form-group">
            <label id="hacktest" for="textoutput">Output</label>
            <div id="textoutput" class="form-control output-height">
                <small v-if="output || title">Created on {{ currentDateTime }}</small>
                <h1 class="title" v-if="title"> {{ title }}</h1>
                <hr>
                <div v-dompurify-html="marked.parse(output)"></div>
            </div>
        </div>
    </div>
  </div>
  <div class="text-center button-cont">
      <button class="btn btn-outline-success button-pad" @click.prevent="saveEntry">Save entry</button>
  </div>
</template>

<script setup>
    import { ref } from "vue";
    import { doc, setDoc } from "firebase/firestore"; 
    import { db, getUser } from "../firebase/config"
    import { uuid } from 'vue-uuid';
    import { marked } from 'marked';
    import router from "../router";

    const output = ref("");
    const title = ref("");
    const currentDateTime = ref(new Date().toLocaleDateString());
    const currentlySignedUser = ref("")

    async function saveEntry(){
        try{
            currentlySignedUser.value = await getUser();
        } 
        catch{
            currentlySignedUser.value = "";
        }
        // console.log(currentlySignedUser.value)
        const docData = {
            content: output.value,
            title: title.value,
            createdDate: currentDateTime.value,
            updatedDate: currentDateTime.value,
            createdBy: currentlySignedUser.value
        }
        // console.log(uuid.v4());
        setDoc(doc(db, "journalEntries", uuid.v4()), docData);
        router.push("/list");
    }

</script>

<style scoped>

#textoutput{
    white-space: pre-wrap;
}
.textarea-custom{
    height: 470px;
}
.input-background{
    background-color: #0000006c;
}
.output-height{
    height: 470px;
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
