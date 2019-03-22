<template>
            <carousel :stagePadding=0 
            :responsive="{0:{items:1,nav:false},600:{items:3,nav:false}}">
             <v-flex
              v-for="card in cards"
              :key="card.code"
               v-bind="{ [`xs${card.flex}`]: true }"
              shirnk
              pa-2
            >
            <v-card color="white">
              <v-layout>
                <v-flex xs5>
                  <v-img
                  :src="loadurl(card.picfilename1)"
                  height="200px"
                  contain
                ></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline  black--text">รุ่น {{card.title}}</div>
                      <div class="headline  black--text"></div>
                      <div class="headline  black--text">ขนาด {{card.mysize}}</div>
                      <div class="headline  black--text"><br></div>
                      <div class="headline  black--text">สี</div>
                      <div :style="`width:50px;height:30px;border:1px;background-color:${card.colorcode}`"></div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                <div class="headline  black--text">ราคา {{ $n(card.price,'currency') }}  </div>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <div class="headline  black--text">เหลือ {{ stock(card) }}   ตัว</div>
                <v-spacer></v-spacer>
                <div><v-icon color="red" @click="addcart(card)">fas fa-cart-plus</v-icon></div>

              </v-card-actions>
            </v-card>
          </v-flex>            
            <!-- <v-flex
              v-for="card in cards"
              :key="card.code"
               v-bind="{ [`xs${card.flex}`]: true }"
              shirnk
              pa-2
            >
              <v-card>
                <v-img
                  :src="loadurl(card.picfilename1)"
                  height="200px"
                  contain
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                          <span class="headline black--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                     <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                          <span class="headline black--text" v-text="`Size :${card.size}`"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <v-card-actions class="headline text-truncate">
                 <v-flex><v-icon left medium >fas fa-box</v-icon>{{card.stockqty}}</v-flex>
                 <v-flex><v-icon left medium >fas fa-dollar-sign</v-icon>{{card.price}}</v-flex>
                 <v-flex><v-icon left medium >fas fa-cart-plus</v-icon>0</v-flex>
                </v-card-actions>
              </v-card>
            </v-flex> -->
            
            </carousel>
        
</template>

<script>
import Swatches from 'vue-swatches'
// Import the styles too, globally
import { sync } from 'vuex-pathify'
import 'vue-swatches/dist/vue-swatches.min.css'
import carousel from 'vue-owl-carousel'

export default {
  components: { Swatches, carousel },
  name: 'list-comp',
  props: ['models', 'all', 'id', 'tab'],
  data () {
    return {
      items: '',
      itemcolor: '#FFFFFF',
      colors: ['#FFFFFF', '#FFF9C4', '#B3E5FC', '#FCE4EC', '#CE93D8'],
      cards: [],
      selected: []
    }
  },
  watch: {
    all: function () {
      // console.log(this.tab, this.models)
      // this.cards = []
      // const map = new Map()
      // this.models = []
      // for (const item of this.all) {
      //   if (!map.has(item.modelcode)) {
      //     map.set(item.modelcode, true)
      //     this.models.push({
      //       modelcode: item.modelcode,
      //       title: item.title
      //     })
      //   }
      // }
      // console.log(this.models)
      // this.initCard()
    }
  },
  computed: {
    carts: sync('carts'),
    acards: sync('acards')
  },
  created () {
    this.initCard()
    this.$store.set('acards', this.all)
  },
  methods: {
    initCard () {
      const map = new Map()
      if (!map.has(this.models)) {
        map.set(this.models, true)
        this.all.map((key) => {
          if (key.modelcode === this.id) {
            this.cards.push({
              modelcode: key.modelcode,
              title: key.title,
              code: key.code,
              name1: key.name1,
              picfilename1: key.picfilename1,
              price: key.price,
              stockqty: key.stockqty,
              flex: key.flex,
              mysize: key.mysize,
              colorcode: key.colorcode
            })
          }
        })
      }
    },
    loadurl (img) {
      var url = 'https://vps434.vpshispeed.net/sapi/images/' + img
      if (img === null) {
        url = 'https://vps434.vpshispeed.net/sapi/images/none.png'
      }
      return url
      // return require('../static/img/product' + img)
    },
    addcart (item) {
      if (this.stock(item) > 0) {
        this.selected.push(item)
        this.$store.set('carts', this.selected)
      }
    },
    stock (item) {
      var qty = this.$store.state.carts.filter(value => {
        if (value.code === item.code && value.colorcode === item.colorcode) {
          return value
        }
      }).map(res => {
        return res.stockqty
      })
      return qty.length > 0 ? item.stockqty - qty.length : item.stockqty
    }
  }
}
</script>

<style>

</style>

