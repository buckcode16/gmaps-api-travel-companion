<template>
  <div>
    <v-container class="mb-6"
      ><v-carousel hide-delimiters>
        <v-carousel-item
          ><v-sheet height="100%" tile>
            <div class="d-flex fill-height justify-center align-center">
              <div class="text-h2">Slide</div>
            </div>
            <v-img
              aspect-ratio="16/9"
              cover
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img> </v-sheet
        ></v-carousel-item>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
        ></v-carousel-item>
      </v-carousel>
    </v-container>
    <v-container class="mb-6"
      ><v-row align="start" no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-img
              aspect-ratio="16/9"
              cover
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <div>
              <h2 class="text-h4 font-weight-black text-orange">
                Discover and Plan Your Next Getaway
              </h2>

              <div class="text-h5 font-weight-medium mb-2">
                Dive into the world's wonders with [App Name]. From bustling cities to serene
                landscapes, find destinations that resonate with your spirit. Utilize our
                comprehensive planning tools to tailor your itinerary, book accommodations, and find
                the best local eats and activities—all in one place.
              </div>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mb-6"
      ><v-row align="start" no-gutters>
        <v-col :cols="4">
          <v-sheet class="pa-2 ma-2">
            <div>
              <h2 class="text-h4 font-weight-black text-orange">Explore Top Destinations</h2>

              <div class="text-h5 font-weight-medium mb-2">
                Curated with love, our top picks guide you to the destinations that make every
                traveler's heart skip a beat. Whether you're in search of adventure, relaxation,
                culture, or cuisine, find your perfect escape with [App Name].
              </div>
            </div>
          </v-sheet>
        </v-col>
        <v-row :cols="8">
          <v-col
            ><v-sheet class="pa-2 ma-2">
              <v-img
                aspect-ratio="16/9"
                cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img> </v-sheet
          ></v-col>
          <v-col
            ><v-sheet class="pa-2 ma-2">
              <v-img
                aspect-ratio="16/9"
                cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img> </v-sheet
          ></v-col>
          <v-col
            ><v-sheet class="pa-2 ma-2">
              <v-img
                aspect-ratio="16/9"
                cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img> </v-sheet
          ></v-col>
          <v-col
            ><v-sheet class="pa-2 ma-2">
              <v-img
                aspect-ratio="16/9"
                cover
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img> </v-sheet
          ></v-col>
        </v-row>
      </v-row>
    </v-container>
    <v-container class="mb-6"
      ><v-img
        aspect-ratio="16/9"
        cover
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      ></v-img>
    </v-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
