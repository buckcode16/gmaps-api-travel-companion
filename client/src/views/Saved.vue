<template>
  <h2>FAVOURITES<v-icon icon="mdi-flare"></v-icon></h2>
  <v-card v-for="place in savedPlaceIds" class="mx-auto my-3" max-width="400">
    <v-img
      class="align-end text-white"
      height="200"
      :src="place.photos ? place.photos[0] : 'https://cdn.vuetifyjs.com/images/cards/road.jpg'"
      cover
    >
      <v-card-title>{{ place.name }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pt-4">
      {{ place.plus_code.compound_code.split(',')[1] }}
    </v-card-subtitle>

    <v-card-text>
      <div>{{ place.vicinity }}</div>
    </v-card-text>
    <v-list density="compact">
      <v-list-subheader>TYPES</v-list-subheader>

      <v-list-item v-for="(type, i) in place.types" :key="i" :value="type" color="primary">
        <v-row
          ><v-col><v-icon :icon="getIconAndLabel(type).icon" :cols="2"></v-icon></v-col
          ><v-col :cols="10"
            ><v-list-item-title>{{ getIconAndLabel(type).label }}</v-list-item-title></v-col
          ></v-row
        >
      </v-list-item>
    </v-list>

    <v-card-actions>
      <v-btn color="red" @click="removePlaceId(place)">
        Unlike
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

const typeToIconAndName = ref({
  store: { icon: 'mdi-store', label: 'Store' },
  lodging: { icon: 'mdi-bed', label: 'Stay' },
  point_of_interest: { icon: 'mdi-map-marker', label: 'Points of Interest' },
  establishment: { icon: 'mdi-domain', label: 'Establishment' },
  restaurant: { icon: 'mdi-food-fork-drink', label: 'Restaurant' },
  food: { icon: 'mdi-heart', label: 'Food' },
  tourist_attraction: { icon: 'mdi-ferris-wheel', label: 'Attraction' },
  park: { icon: 'mdi-tree', label: 'Park' }
})

const getIconAndLabel = computed(() => {
  return (type) => {
    return typeToIconAndName.value[type] || { icon: 'mdi-help-box', label: type }
  }
})

const savedPlaceIds = ref([])

const placeIds = ref([])
const getPlaceIds = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/place')
    localStorage.setItem('place_ids', JSON.stringify(response.data))
    savedPlaceIds.value = response.data
    console.log('Place IDs:', response.data)
  } catch (error) {
    console.error('Error retrieving place IDs:', error.response.data)
  }
}

const removePlaceId = async (card) => {
  try {
    await axios.delete('http://localhost:3000/api/place/remove', {
      data: { placeId: card.place_id },
      withCredentials: true
    })
    console.log('Place removed:', card.place_id)
    savedPlaceIds.value = savedPlaceIds.value.filter((item) => item.place_id !== card.place_id)
  } catch (error) {
    console.error('Error removing place:', error.response?.data || error)
  }
}

const getDetails = () => {
  var request = {
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
  }

  service = new google.maps.places.PlacesService(map)
  service.getDetails(request, callback)
}

onMounted(() => {
  getPlaceIds()
})
</script>

<style scoped></style>
