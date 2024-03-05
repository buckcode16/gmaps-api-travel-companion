<template>
  <v-card class="mx-auto mb-6" flat color="yellow-lighten-4">
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
                  @click.stop="isSaved(card.place_id) ? removePlaceId(card) : addPlaceId(card)"
                  :color="isSaved(card.place_id) ? 'pink' : 'white'"
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
import { ref, computed, defineProps, type PropType, defineEmits, onMounted } from 'vue'
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

const savedPlaceIds = ref([]);

const isSaved = (place_id) => {
  return savedPlaceIds.value.some(card => card.place_id === place_id);
};

const getPlaceIds = async () => {
  if(!window.localStorage.getItem('user')) return
  try {
    const response = await axios.get('http://localhost:3000/api/place', { withCredentials: true });
    savedPlaceIds.value = response.data;
    console.log('Place IDs:', response.data);
  } catch (error) {
    console.error('Error retrieving place IDs:', error.response?.data || error);
  }
};

const addPlaceId = async (card) => {
  if(!window.localStorage.getItem('user')) return
  try {
    let modifiedCard = { ...card };

    if (Array.isArray(card.photos) && card.photos.length > 0) {
      modifiedCard.photos = card.photos.map(photo =>
        photo.getUrl({maxWidth: 400})
      );
    }

    await axios.post('http://localhost:3000/api/place/add', modifiedCard, { withCredentials: true });
    console.log('Place added:', modifiedCard);

    savedPlaceIds.value.push(modifiedCard);
  } catch (error) {
    console.error('Error adding place:', error.response?.data || error);
  }
};


const removePlaceId = async (card) => {
  try {
    await axios.delete('http://localhost:3000/api/place/remove', {
      data: { placeId: card.place_id },
      withCredentials: true,
    });
    console.log('Place removed:', card.place_id);
    savedPlaceIds.value = savedPlaceIds.value.filter(item => item.place_id !== card.place_id);
  } catch (error) {
    console.error('Error removing place:', error.response?.data || error);
  }
};


function centerLocation(placeResult) {
    emit('centerLocation', placeResult)
}

onMounted(() => {
  getPlaceIds()
})
</script>

<style scoped>
.top {
  margin-top: 35%;
}
</style>
