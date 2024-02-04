<template>
  <div class="row">
    <div class="col-md">
        <form>
            <div class="form-group">
                <label for="outputTitle">Entry title</label>
                <input type="text" class="form-control" id="outputTitle" v-model="outputTitle" />
            </div>
            <div class="form-group">
                <label for="textarea">Entry text</label>
                <textarea class="form-control textarea-heigth" id="textarea" v-model="output" />
            </div>
        </form>
    </div>
    <div class="col-md flex-grow-1">
        <div class="form-group">
            <label id="hacktest" for="textoutput">Output</label>
            <div id="textoutput" class="form-control output-height">
                <small v-if="outputTitle || output">Created on {{ currentDateTime }}</small>
                <h1>{{ outputTitle }}</h1>
                <div id="customFormattingForOutputText">{{ output }}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
    import { ref } from "vue";

    const outputTitle = ref("");
    const output = ref("");
    const currentDateTime = ref(new Date().toLocaleString());

</script>

<style scoped>

#textoutput{
    white-space: pre-wrap;
}
.textarea-heigth{
    height: 450px;
    display: flex;
    flex-direction: column; }
.output-height{
    height: 513px;
    overflow: auto;
}
#customFormattingForOutputText{
    margin-top: 10px;
}

</style>
