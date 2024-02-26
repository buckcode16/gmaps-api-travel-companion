<template>
  <div class="pac-card" id="pac-card">
    <div>
      <div id="title">Autocomplete search</div>
      <div id="type-selector" class="pac-controls">
        <input type="radio" name="type" id="changetype-all" checked="checked" />
        <label for="changetype-all">All</label>

        <input type="radio" name="type" id="changetype-establishment" />
        <label for="changetype-establishment">establishment</label>

        <input type="radio" name="type" id="changetype-address" />
        <label for="changetype-address">address</label>

        <input type="radio" name="type" id="changetype-geocode" />
        <label for="changetype-geocode">geocode</label>

        <input type="radio" name="type" id="changetype-cities" />
        <label for="changetype-cities">(cities)</label>

        <input type="radio" name="type" id="changetype-regions" />
        <label for="changetype-regions">(regions)</label>
      </div>
      <br />
      <div id="strict-bounds-selector" class="pac-controls">
        <input type="checkbox" id="use-location-bias" value="" checked />
        <label for="use-location-bias">Bias to map viewport</label>

        <input type="checkbox" id="use-strict-bounds" value="" />
        <label for="use-strict-bounds">Strict bounds</label>
      </div>
    </div>
    <div id="pac-container">
      <input id="pac-input" type="text" placeholder="Enter a location" />
    </div>
  </div>
  <div id="map"></div>
  <div id="details"></div>
  <div id="infowindow-content">
    <span id="place-name" class="title"></span><br />
    <span id="place-address"></span>
  </div>
  <div id="sidebar">
    <h2>Results</h2>
    <ul id="places"></ul>
    <button id="more">Load more results</button>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

const location = ref({ lat: 34.672374698079416, lng: 135.49908361513027 })
const markers: Ref<google.maps.Marker[]> = ref([])

async function initMap(): void {
  const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: location.value,
    zoom: 13
  })

  const card = document.getElementById('pac-card') as HTMLElement
  const input = document.getElementById('pac-input') as HTMLInputElement
  const biasInputElement = document.getElementById('use-location-bias') as HTMLInputElement
  const strictBoundsInputElement = document.getElementById('use-strict-bounds') as HTMLInputElement
  const options = {
    fields: ['formatted_address', 'geometry', 'name'],
    strictBounds: false
  }

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(card)

  const autocomplete = new google.maps.places.Autocomplete(input, options)

  // Create the places service.
  const service = new google.maps.places.PlacesService(map)

  // Perform a nearby search.
  service.nearbySearch(
    { location: location.value, radius: 500, types: ['lodging', 'store'] },
    (
      results: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus,
      pagination: google.maps.places.PlaceSearchPagination | null
    ) => {
      if (status !== 'OK' || !results) return

      addPlaces(results, map)
      moreButton.disabled = !pagination || !pagination.hasNextPage

      if (pagination && pagination.hasNextPage) {
        getNextPage = () => {
          // Note: nextPage will call the same handler function as the initial call
          pagination.nextPage()
        }
      }
    }
  )

  let getNextPage: () => void | false
  const moreButton = document.getElementById('more') as HTMLButtonElement

  moreButton.onclick = function () {
    moreButton.disabled = true

    if (getNextPage) {
      getNextPage()
    }
  }

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo('bounds', map)

  const infowindow = new google.maps.InfoWindow()
  const infowindowContent = document.getElementById('infowindow-content') as HTMLElement

  infowindow.setContent(infowindowContent)

  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
    position: location.value
  })

  autocomplete.addListener('place_changed', () => {
    infowindow.close()
    marker.setVisible(false)

    const place = autocomplete.getPlace()

    // Perform a nearby search.
    service.nearbySearch(
      { location: place.geometry.location, radius: 500, type: 'store' },
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
        pagination: google.maps.places.PlaceSearchPagination | null
      ) => {
        if (status !== 'OK' || !results) return

        addPlaces(results, map)
        moreButton.disabled = !pagination || !pagination.hasNextPage

        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            // Note: nextPage will call the same handler function as the initial call
            pagination.nextPage()
          }
        }
      }
    )
    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'")
      return
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport)
    } else {
      map.setCenter(place.geometry.location)
      map.setZoom(17)
    }

    marker.setPosition(place.geometry.location)
    marker.setVisible(true)

    infowindowContent.children['place-name'].textContent = place.name
    infowindowContent.children['place-address'].textContent = place.formatted_address
    infowindow.open(map, marker)
  })

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    const radioButton = document.getElementById(id) as HTMLInputElement

    radioButton.addEventListener('click', () => {
      autocomplete.setTypes(types)
      input.value = ''
    })
  }

  setupClickListener('changetype-all', [])
  setupClickListener('changetype-address', ['address'])
  setupClickListener('changetype-establishment', ['establishment'])
  setupClickListener('changetype-geocode', ['geocode'])
  setupClickListener('changetype-cities', ['(cities)'])
  setupClickListener('changetype-regions', ['(regions)'])

  biasInputElement.addEventListener('change', () => {
    if (biasInputElement.checked) {
      autocomplete.bindTo('bounds', map)
    } else {
      // User wants to turn off location bias, so three things need to happen:
      // 1. Unbind from map
      // 2. Reset the bounds to whole world
      // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
      autocomplete.unbind('bounds')
      autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 })
      strictBoundsInputElement.checked = biasInputElement.checked
    }

    input.value = ''
  })

  strictBoundsInputElement.addEventListener('change', () => {
    autocomplete.setOptions({
      strictBounds: strictBoundsInputElement.checked
    })

    if (strictBoundsInputElement.checked) {
      biasInputElement.checked = strictBoundsInputElement.checked
      autocomplete.bindTo('bounds', map)
    }

    input.value = ''
  })
}

function addPlaces(places: google.maps.places.PlaceResult[], map: google.maps.Map) {
  const placesList = document.getElementById('places') as HTMLElement

  // Clear the list every time addPlaces is called
  placesList.innerHTML = ''

  // Clear existing markers from the map
  markers.value.forEach((marker) => {
    marker.setVisible(false)
    marker.setMap(null)
  })
  // Clear the markers array
  markers.value = []

  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      console.log(place.types)
      const image = {
        url: place.icon!,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }

      // Create a marker for each place
      const marker = new google.maps.Marker({
        map,
        icon: image,
        title: place.name!,
        position: place.geometry.location
      })

      marker.addListener('click', () => {
        const contentString = `<div><h3>${place.name}</h3><p>${place.vicinity}</p><a href="https://www.google.com/maps/place/?q=place_id:${place.place_id}" target="_blank">View on Google Maps</a></div>`
        const infowindow = new google.maps.InfoWindow({
          content: contentString
        })
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

      placesList.appendChild(li)

      li.addEventListener('click', () => {
        map.setCenter(place.geometry!.location!)
        const contentString = `<div><h3>${place.name}</h3><p>${place.vicinity}</p><a href="https://www.google.com/maps/place/?q=place_id:${place.place_id}" target="_blank">View on Google Maps</a></div>`
        const infowindow = new google.maps.InfoWindow({
          content: contentString
        })
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
window.initMap = initMap
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

.pac-controls {
  display: inline-block;
  padding: 5px 11px;
}

.pac-controls label {
  font-family: Roboto;
  font-size: 13px;
  font-weight: 300;
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
