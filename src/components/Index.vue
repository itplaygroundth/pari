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
       <div class="title font-weight-light">{{users.username}}</div>
      <v-btn  v-if="users.username"  icon>
        <v-avatar size="36px">
      <img
        :src="users.avartar"
        :alt="users.username"
      >
    </v-avatar>
      </v-btn>
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          color="transparent"
          fixed=tabs
          slider-color="#F44336"
          grow
          @change="changetab"
        >
          <!-- <v-tabs-slider color="#FF4081"></v-tabs-slider> -->

          <v-tab
            v-for="item in items"
            :key="item"
            :href="'#'+item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <!-- <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items> -->
    <br>
    <add-comp v-show="!additem"></add-comp>
    <div v-show="additem">
    <template v-for="n in models">
      <list-comp v-bind:key="n.modelcode" v-bind:id="n.modelcode" v-bind:all="cdata" v-bind:tab="tab"></list-comp>
    </template>
    </div>
    <!-- <list-comp v-show="additem"></list-comp> -->
     <v-fab-transition>
    <v-btn v-if="users.level!=='admin'"
       
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
  import List from '@/components/List'
  import { sync } from 'vuex-pathify'
  import api from '../models/backapi'
  
  export default {
    name: 'index',
    components: {
      'add-comp': Add,
      'list-comp': List
    },
    data: () => ({
      fab: '',
      items: [
        '32-36', '36-40', '40-44', '44-46'
      ],
      text: '',
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
      ],
      models: [],
      all: []
    }),
    created () {
      this.getItem()
    },
    watch: {
      reindex: function () {
        // console.log(this.$store.state.reindex)
        this.models = []
        this.additem = true
        this.getItem()
        // console.log(this.$store.state.additem)
        // if (this.additem) this.getItem()
      }
    },
    computed: {
      additem: sync('additem'),
      reindex: sync('reindex'),
      tab: sync('tab'),
      users: sync('users'),
      cdata: function () {
        return this.all
      }
    },
    methods: {
      getItem () {
        this.isLoading = true
        // api.getItems()
        api.getItemsbsize({'size': this.tab})
          .then(res => {
            this.all = JSON.parse(JSON.stringify(res.data))
            // console.log(this.all)
            const map = new Map()
            this.models = []
            for (const item of JSON.parse(JSON.stringify(res.data))) {
              if (!map.has(item.modelcode)) {
                map.set(item.modelcode, true)
                this.models.push({
                  modelcode: item.modelcode,
                  title: item.title
                })
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
      changetab () {
        // sconsole.log(this.all)
        this.getItem()
      }
    }
}
</script>
<style scoped>
.showlist {
  min-height: 100vh;
}
</style>
