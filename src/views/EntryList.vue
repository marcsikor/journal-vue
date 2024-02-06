<template>
  <h3 class="text-center mt-5">Journal entries list</h3>
    <div v-if="currentlySignedUser" class="row mt-5">
      <div v-for="entry in entriesList" class="col-md-4">
        <router-link :to="{ name: 'view', params: { id: entry.id } }" class="card card-custom border-success mb-4">
            <div class="card-header card-header-custom">Entry from {{ entry.data().createdDate }}</div>
            <!-- <small>Updated {{ entry.data().updatedDate }}</small> -->
          <div class="card-body">
            <h5 class="card-title"> {{ entry.data().title }}</h5>
            <p v-if="entry.data().content.length <= 40" class="card-text">{{ entry.data().content }}</p>
            <p v-if="entry.data().content.length > 40" class="card-text">{{ entry.data().content.substring(0,45) + '...' }}</p>
            <p>Last update: {{ entry.data().updatedDate }}</p>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { getUser, db } from "../firebase-config/config"
  import { collection, query, where, getDocs } from "firebase/firestore";

  const currentlySignedUser = ref(null);
  const entriesList = ref([]);

  onMounted(()=>{
    initList()
  });

  async function initList(){
    // console.log(currentlySignedUser.value)
    try{
      currentlySignedUser.value = await getUser();
    }
    catch{
      currentlySignedUser.value = "";
      console.error("no user")
    }
    
    const q = query(collection(db, "journalEntries"), where("createdBy", "==", currentlySignedUser.value));
    const entries = await getDocs(q);
    entries.forEach((doc) => {
      entriesList.value.push(doc)
    });

  }

</script>

<style scoped>
  .card-custom{
  background: #00000086 !important;
  color: white !important;
  text-decoration: none;
}

.card-custom:hover{
  background-color:  rgb(27, 167, 101) !important;
  transition: 0.4s !important;
}

.card-header-custom{
  background-color: #dfdfdf1e !important;
}
p{
  margin-bottom: 0 !important;
  margin-top: 1em !important;
}
.delete-icon{
  text-align: right;
  float: right;
}
.delete-icon-hover:hover{
  color: red;
}
</style>