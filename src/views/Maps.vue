<template>
  <div class="pac-card" id="pac-card">
    <div>
      <div id="title">Autocomplete search</div>
    </div>
    <div id="pac-container">
      <input id="pac-input" type="text" placeholder="Enter a location" />
    </div>
  </div>
  <v-row
    ><v-col cols="8"><div id="map"></div></v-col>
    <v-col cols="4"
      ><v-sheet v-if="selected" class="text-body-2 mx-auto" max-width="550">
        <v-container fluid>
          <v-row>
            <v-col cols="12" class="mb-2">
              <v-img
                :src="
                  selected.photos
                    ? selected.photos[0].getUrl()
                    : 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
                "
                height="200"
                cover
              ></v-img>
            </v-col>

            <v-col cols="12">
              <h2 class="text-h5 font-weight-black text-orange mb-4">
                {{ selected.name }}
              </h2>
              <v-divider class="mx-4 mb-4"></v-divider>
              <p class="mb-4">
                {{ selected.vicinity }}
              </p>
              <v-row align="center" class="mx-0">
                <v-rating
                  :model-value="selected.rating"
                  color="amber"
                  density="compact"
                  half-increments
                  readonly
                ></v-rating>

                <div class="text-grey ms-4">{{ selected.rating }}</div>
              </v-row>
              <!-- <div class="px-4">
                <v-chip-group>
                  <v-chip>5:30PM</v-chip>

                  <v-chip>7:30PM</v-chip>

                  <v-chip>8:00PM</v-chip>

                  <v-chip>9:00PM</v-chip>
                </v-chip-group>
              </div> -->
            </v-col>
          </v-row>
        </v-container>
      </v-sheet></v-col
    ></v-row
  >
  <div id="details" v-show="false"></div>
  <div id="infowindow-content">
    <span id="place-name" class="title"></span><br />
    <span id="place-address"></span>
  </div>
  <div id="sidebar">
    <!-- <h2>Results</h2> -->
    <ul v-show="false" id="places"></ul>
    <!-- <v-btn @click="loadResults" v-if="getNextPage">Load more results</v-btn> -->
  </div>

  <div class="mt-2">
    <div class="d-flex align-center">
      <h2>Lodging</h2>
      <v-icon class="text-black ml-4">mdi-bed</v-icon>
    </div>
    <PlaceCards :cards="lodging" @center-location="centerLocation" />
    <div class="d-flex align-center">
      <h2>Restaurant</h2>
      <v-icon class="text-black ml-4">mdi-silverware-fork-knife</v-icon>
    </div>
    <PlaceCards :cards="restaurant" @center-location="centerLocation" />
    <div class="d-flex align-center">
      <h2>Attractions</h2>
      <v-icon class="text-black ml-4">mdi-ferris-wheel</v-icon>
    </div>
    <PlaceCards :cards="attraction" @center-location="centerLocation" />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, onMounted, computed } from 'vue'
import PlaceCards from '../components/PlaceCards.vue'
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

const location = ref({ lat: 34.672374698079416, lng: 135.49908361513027 })
const markers: Ref<google.maps.Marker[]> = ref([])
const lodging: Ref<google.maps.places.PlaceResult[]> = ref([])
const restaurant: Ref<google.maps.places.PlaceResult[]> = ref([])
const attraction: Ref<google.maps.places.PlaceResult[]> = ref([])
const getNextPage: Ref<google.maps.places.PlaceSearchPagination> = ref()
const selected: Ref<google.maps.places.PlaceResult> = ref(null)
const map = ref(null)

async function initMap(): void {
  map.value = await new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: location.value,
    zoom: 13
  })

  const card = document.getElementById('pac-card') as HTMLElement
  const input = document.getElementById('pac-input') as HTMLInputElement
  const options = {
    fields: ['formatted_address', 'geometry', 'name'],
    strictBounds: false
  }

  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(card)

  const autocomplete = new google.maps.places.Autocomplete(input, options)

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo('bounds', map.value)

  const infowindow = new google.maps.InfoWindow()
  const infowindowContent = document.getElementById('infowindow-content') as HTMLElement

  infowindow.setContent(infowindowContent)

  const marker = new google.maps.Marker({
    map: map.value,
    anchorPoint: new google.maps.Point(0, -29),
    position: location.value
  })

  autocomplete.addListener('place_changed', () => {
    infowindow.close()
    marker.setVisible(false)
    lodging.value = []
    restaurant.value = []
    attraction.value = []

    const place = autocomplete.getPlace()

    clearMarkers()
    nearbySearch(map, place.geometry.location, ['lodging'], lodging)
    nearbySearch(map, place.geometry.location, ['restaurant'], restaurant)
    nearbySearch(map, place.geometry.location, ['tourist_attraction'], attraction)
    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'")
      return
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.value.setCenter(place.geometry.location)
      map.value.setZoom(17)
    } else {
      map.value.setCenter(place.geometry.location)
      map.value.setZoom(17)
    }

    marker.setPosition(place.geometry.location)
    marker.setVisible(true)

    // Info marker after input is confirmed
    infowindowContent.children['place-name'].textContent = place.name
    infowindowContent.children['place-address'].textContent = place.formatted_address
    infowindow.open(map.value, marker)
  })
}

function centerLocation(placeResult) {
  map.value.setCenter(placeResult.geometry.location)
  selected.value = placeResult
}

function nearbySearch(
  map: google.maps.Map,
  location: google.maps.places.PlaceResult,
  types: string[],
  resultContainer: Ref<google.maps.places.PlaceResult[]>
) {
  const service = new google.maps.places.PlacesService(map.value)

  // Perform a nearby search.
  service.nearbySearch(
    { location: location, radius: 400, types: types },
    (
      results: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus,
      pagination: google.maps.places.PlaceSearchPagination | null
    ) => {
      if (status !== 'OK' || !results) return

      addPlaces(results, map)
      resultContainer.value = results

      if (pagination && pagination.hasNextPage) {
        getNextPage.value = () => {
          // Note: nextPage will call the same handler function as the initial call
          pagination.nextPage()
        }
      }
    }
  )
}

function loadResults() {
  if (getNextPage.value) {
    getNextPage.value()
  }
}

function clearMarkers() {
  // Clear existing markers from the map
  markers.value.forEach((marker) => {
    marker.setVisible(false)
    marker.setMap(null)
  })
  // Clear the markers array
  markers.value = []
}

function addPlaces(places: google.maps.places.PlaceResult[], map: google.maps.Map) {
  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      const image = {
        url: place.icon!,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }

      // Create a marker for each place
      const marker = new google.maps.Marker({
        map: map.value,
        icon: image,
        title: place.name!,
        position: place.geometry.location
      })

      marker.addListener('click', () => {
        const contentString = `${place}`
        const infowindow = new google.maps.InfoWindow({
          content: contentString
        })
        selected.value = place
        let details = document.getElementById('details') as HTMLElement
        details.innerHTML = contentString
      })

      // Store the marker in the markers array
      markers.value.push(marker)

      const li = document.createElement('li')
      li.textContent = place.name!

      // Add photos to the list items if available
      if (place.photos && place.photos.length > 0) {
        const img = document.createElement('img')
        const photoUrl = place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })
        img.src = photoUrl
        img.alt = `Photo of ${place.name}`
        img.style.maxWidth = '100px'
        img.style.height = 'auto'
        li.appendChild(img)
      }

      li.addEventListener('click', () => {
        map.setCenter(place.geometry!.location!)
        const contentString = `${place}`
        const infowindow = new google.maps.InfoWindow({
          content: contentString
        })
        selected.value = place
        console.log(place)
        let details = document.getElementById('details') as HTMLElement
        details.innerHTML = contentString

        // infowindow.open(map, marker)
      })
    }
  }
}

declare global {
  interface Window {
    initMap: () => void
  }
}

onMounted(async () => {
  await initMap()
})
</script>

<style scoped>
/* 
 * Always set the map height explicitly to define the size of the div element
 * that contains the map. 
 */
#map {
  height: 400px;
  width: 100%;
}

/* 
 * Optional: Makes the sample page fill the window. 
 */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#description {
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
}

#infowindow-content .title {
  font-weight: bold;
}

#infowindow-content {
  display: none;
}

#map #infowindow-content {
  display: inline;
}

.pac-card {
  /* visibility: hidden; */
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
  margin: 10px;
  padding: 0 0.5em;
  font: 400 18px Roboto, Arial, sans-serif;
  overflow: hidden;
  font-family: Roboto;
  padding: 0;
}

#pac-container {
  padding-bottom: 12px;
  margin-right: 12px;
}

#pac-input {
  background-color: #fff;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  margin-left: 12px;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  width: 400px;
}

#pac-input:focus {
  border-color: #4d90fe;
}

#title {
  color: #fff;
  background-color: #4d90fe;
  font-size: 25px;
  font-weight: 500;
  padding: 6px 12px;
}
</style>
