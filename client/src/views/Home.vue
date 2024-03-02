<template>
  <div>
    <v-container class="my-6"
      ><v-carousel hide-delimiters class="rounded-lg">
        <v-carousel-item
          ><v-img
            src="
              https://images.pexels.com/photos/1796725/pexels-photo-1796725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
            "
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="100%"
            cover
          >
            <div class="top ml-4">
              <v-card-title class="text-white text-h3"
                >Explore the World with Travel Pal</v-card-title
              >
              <v-card-text class="text-white text-h5 w-75 mt-3 text-justify"
                >Let's make every journey unforgettable with personalized recommendations, seamless
                planning tools, and real-time travel insights.</v-card-text
              >
            </div>
          </v-img></v-carousel-item
        >

        <v-carousel-item
          ><v-img
            src="
              https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
            "
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="100%"
            cover
          >
            <div class="top ml-4">
              <v-card-title class="text-white text-h3"
                >Explore the World with Travel Pal</v-card-title
              >
              <v-card-text class="text-white text-h5 w-75 mt-3 text-justify"
                >Let's make every journey unforgettable with personalized recommendations, seamless
                planning tools, and real-time travel insights.</v-card-text
              >
            </div>
          </v-img></v-carousel-item
        >
        <v-carousel-item
          ><v-img
            src="
              https://images.pexels.com/photos/109630/pexels-photo-109630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
            "
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="100%"
            cover
          >
            <div class="top ml-4">
              <v-card-title class="text-white text-h3"
                >Explore the World with Travel Pal</v-card-title
              >
              <v-card-text class="text-white text-h5 w-75 mt-3 text-justify"
                >Let's make every journey unforgettable with personalized recommendations, seamless
                planning tools, and real-time travel insights.</v-card-text
              >
            </div>
          </v-img></v-carousel-item
        >
      </v-carousel>
    </v-container>
    <v-container class="mb-6"
      ><v-row align="start" no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-img
              aspect-ratio="16/9"
              cover
              src="https://img.freepik.com/free-vector/flat-tourists-ready-holiday_23-2149059980.jpg?t=st=1709215475~exp=1709219075~hmac=32b5824adb449a946c780e5ca0267406e1784c83ed2e8499e2516e663f5dcb73&w=1380"
            ></v-img>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <div>
              <h2 class="text-h4 font-weight-black text-orange">
                Discover and Plan Your Next Getaway
              </h2>

              <div class="font-weight-medium mb-2 text-justify mt-10">
                Dive into the world's wonders with Travel Pal. From bustling cities to serene
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

              <div class="font-weight-medium mb-2 text-justify mt-10">
                Curated with love, our top picks guide you to the destinations that make every
                traveler's heart skip a beat. Whether you're in search of adventure, relaxation,
                culture, or cuisine, find your perfect escape with Travel Pal.
              </div>
            </div>
          </v-sheet>
        </v-col>
        <v-row :cols="8">
          <v-col
            ><v-sheet>
              <v-img
                class="rounded-lg align-end"
                aspect-ratio="16/9"
                height="35vh"
                cover
                src="https://img.freepik.com/free-photo/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan_335224-213.jpg?w=1380"
                ><div class="d-flex flex-reverse pa-3">
                  <h1 class="text-white">Japan</h1>
                </div></v-img
              >
            </v-sheet></v-col
          >
          <v-col
            ><v-sheet>
              <v-img
                class="rounded-lg align-end"
                aspect-ratio="16/9"
                height="35vh"
                width="100%"
                cover
                src="https://img.freepik.com/free-photo/big-ben_53876-16158.jpg?t=st=1709216144~exp=1709219744~hmac=3b1d3b0823c889d486047f2618cc1a481bd717bd97bb82152747b3729b069405&w=1380"
                ><div class="d-flex flex-reverse pa-3">
                  <h1 class="text-white">London</h1>
                </div></v-img
              >
            </v-sheet></v-col
          >
          <v-col
            ><v-sheet>
              <v-img
                class="rounded-lg align-end"
                aspect-ratio="16/9"
                height="35vh"
                cover
                src="https://img.freepik.com/free-photo/guangjimen-chaozhou-city-guangdong-province-china_1205-13827.jpg"
                ><div class="d-flex flex-reverse pa-3">
                  <h1 class="text-white">China</h1>
                </div></v-img
              >
            </v-sheet></v-col
          >
          <v-col
            ><v-sheet>
              <v-img
                class="rounded-lg align-end"
                aspect-ratio="16/9"
                height="35vh"
                cover
                src="https://img.freepik.com/free-photo/merlion-statue-cityscape-singapore_335224-666.jpg?t=st=1709217170~exp=1709220770~hmac=4cf6f4e48fa57334704a5c2db185022de419b9df041ec0b51194973d3588d075&w=1380"
                ><div class="d-flex flex-reverse pa-3">
                  <h1 class="text-white">Singapore</h1>
                </div></v-img
              >
            </v-sheet></v-col
          >
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.top {
  margin-top: 25%;
}
</style>
