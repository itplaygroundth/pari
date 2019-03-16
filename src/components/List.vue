<template>
            <carousel :stagePadding=0 
            :responsive="{0:{items:1,nav:false},600:{items:3,nav:false}}">
                       
            <v-flex
              v-for="card in cards"
              :key="card.title"
              v-bind="{ [`xs${card.flex}`]: true }"
              grow
              pa-2
            >
              <v-card>
                <v-img
                  :src="card.src"
                  height="200px"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <v-card-actions class="headline text-truncate">
                 <v-flex><v-icon left medium >fas fa-box</v-icon>20 SKU</v-flex>
                 <v-flex><v-icon left medium >fas fa-dollar-sign</v-icon> 1,200 Baht</v-flex>
                 <v-flex><v-icon left medium >fas fa-cart-plus</v-icon>0</v-flex>
                  <!-- <v-btn icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn> -->
                </v-card-actions>
              </v-card>
            </v-flex>
            
            </carousel>
        
</template>

<script>
import carousel from 'vue-owl-carousel'

export default {
  components: { carousel },
  name: 'list-comp',
  data () {
    return {
      items: '',
      cards: [
        // { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 12 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 12 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 12 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 12 }
      ]
    }
  }
}
</script>

<style>

</style>

