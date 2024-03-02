<template>
  <v-card class="mx-auto mb-6" flat>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in paginatedCards" :key="card.place_id" cols="3">
          <v-card>
            <v-img
              @click="centerLocation(card)"
              :src="
                card.photos
                  ? card.photos[0].getUrl()
                  : 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
              "
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <div class="d-flex flex-row-reverse">
                <v-btn
                  class="text-none mr-2 mt-2"
                  @click.stop="handleLike(card)"
                  color="white"
                  variant="text"
                  icon="mdi-heart"
                ></v-btn>
              </div>
              <div class="top">
                <v-card-title class="text-white mt-4" v-text="card.name"></v-card-title>
              </div>
            </v-img>

            <v-card-actions>
              Rating: <v-badge :content="card.rating ? card.rating : '?'" inline></v-badge>
              <v-spacer></v-spacer>

              <v-btn
                size="small"
                color="surface-variant"
                variant="text"
                icon="mdi-share-variant"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-pagination v-model="currentPage" :length="totalPages" rounded="circle"></v-pagination>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, type PropType, defineEmits } from 'vue'
import axios from 'axios';

const emit = defineEmits(['centerLocation'])

const props = defineProps({
  cards: {
    type: Array as PropType<google.maps.places.PlaceResult[]>,
    required: true,
    default: () => []
  }
})

const currentPage = ref(1)
const itemsPerPage = 4
const totalPages = computed(() => Math.ceil(props.cards.length / itemsPerPage))
const paginatedCards = computed(() => {
  const firstIndex = (currentPage.value - 1) * 4
  const lastIndex = firstIndex + itemsPerPage
  return props.cards.slice(firstIndex, lastIndex)
})

async function handleLike(card){
  try {
  const response = await axios.get(
  "http://localhost:3000/"
  )

  console.log(response.data)

  } catch (err) {

  }
  // console.log(card.place_id);
  // const userString = window.localStorage.getItem('user')

  // const user = JSON.parse(userString)

  // user.liked.push(card.place_id)

  // window.localStorage.setItem('user', JSON.stringify(user))


}

function centerLocation(placeResult) {
    emit('centerLocation', placeResult)
}
</script>

<style scoped>
.top {
  margin-top: 35%;
}
</style>
