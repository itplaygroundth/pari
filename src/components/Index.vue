<template>
<div>
    <v-toolbar
      color="#2c3e50"
      dark
      tabs
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>Pari X Store</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          color="#2c3e50"
          grow
        >
          <v-tabs-slider color="#FF4081"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <br>
    <add-comp v-show="!additem"></add-comp>
     <v-fab-transition>
    <v-btn
       
        v-model="fab"
        v-show="additem"
        color="red"
        dark
        fab
        fixed
        bottom
        right
        
        @click="additem=!additem"
      >
      
        <v-icon>add</v-icon>
    </v-btn>
     </v-fab-transition>
</div>
</template>
<script>
  import Add from '@/components/Add'
  import { sync } from 'vuex-pathify'
  
  export default {
    name: 'index',
    components: {
      'add-comp': Add
    },
    data: () => ({
      tab: '',
      fab: '',
      items: [
        '60-50', '50-40', '40-30', '30-20', '10'
      ],
      text: '',
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
      ]
    }),
    computed: {
      additem: sync('additem')
    }
}
</script>