<template>
<v-app>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
          <v-toolbar color="#78909C" dark>
        
        <v-toolbar-title>Carts X Item</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-flex
              v-for="(card, index) in this.groupBy(this.carts, 'code')"
              :key="index"
               v-bind="{ [`xs${card.flex}`]: true }"
              shirnk
              pa-2
            >
            <v-card color="white">
              <v-layout>
                <v-flex xs5>
                  <v-img
                  :src="loadurl(index)"
                  height="200px"
                  contain
                ></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline  black--text">รุ่น {{loadtitle(index)}}</div>
                      <div class="headline  black--text"></div>
                      <div class="headline  black--text">ขนาด {{loadsize(index)}}</div>
                      <div class="headline  black--text"><br></div>
                      <div class="headline  black--text">สี</div>
                      <div :style="`width:50px;height:30px;border:1px;background-color:${loadcolor(index)}`"></div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                <div class="headline  black--text">ราคา {{ $n(loadprice(index),'currency') }}  </div>
                <v-spacer></v-spacer>
                <v-icon medium color="red"  @click="delcart(index)">remove_circle</v-icon>
                <span style="width:20px"></span>
                <div class="headline  black--text">จำนวน {{ loadqty(index) }}   ตัว</div>
                <span style="width:20px"></span>
                <v-icon medium color="green"  @click="addcart(index)">add_circle</v-icon>
                <v-spacer></v-spacer>
                <div class="headline  black--text">ยอดเงิน {{ $n(calctotal(index),'currency') }}   </div>
                <v-spacer></v-spacer>
                <!-- <div><v-icon color="red" @click="addcart(card)">fas fa-cart-plus</v-icon></div> -->

              </v-card-actions>
            </v-card>
          </v-flex>   
    </v-flex>
  </v-layout>
</v-app>
</template>

<script>
import {sync} from 'vuex-pathify'

export default {
  name: 'cart-comp',
  data () {
    return {
      seleteds: []
    }
  },
  computed: {
    carts: sync('carts'),
    acards: sync('acards')
  },
  methods: {
    loadurl (code) {
      var url = 'https://vps434.vpshispeed.net/sapi/images/none.png'
      this.carts.filter(x => {
        if (x.code === code) {
          url = 'https://vps434.vpshispeed.net/sapi/images/' + x.picfilename1
        }
      })
      return url
    },
    loadtitle (code) {
      var data = ''
      this.carts.filter(x => {
        if (x.code === code) {
          data = x.title
        }
      })
      return data
    },
    loadcolor (code) {
      var data = ''
      this.carts.filter(x => {
        if (x.code === code) {
          data = x.colorcode
        }
      })
      return data
    },
    loadsize (code) {
      var data = ''
      this.carts.filter(x => {
        if (x.code === code) {
          data = x.mysize
        }
      })
      return data
    },
    loadprice (code) {
      var data = ''
      this.carts.filter(x => {
        if (x.code === code) {
          data = x.price
        }
      })
      return data
    },
    loadqty (code) {
      return this.carts.filter(x => x.code === code).length
      // return this.groupBy(data, 'code')
    },
    calctotal (code) {
      var price = 0
      this.carts.filter(x => {
        if (x.code === code) {
          price = x.price
        }
      })
      return this.carts.filter(x => x.code === code).length * price
    },
    groupBy (array, key) {
      const result = {}
      array.forEach(item => {
        if (!result[item[key]]) {
          result[item[key]] = []
        }
        result[item[key]].push(item)
      })
      return result
    },
    addcart (code) {
      if (this.stock(code) > 0) {
        var item = this.$store.state.acards.filter(x => x.code === code)
        this.carts.push(item[0])
        // this.$store.set('carts', this.carts)
      }
    },
    delcart (code) {
      this.carts.splice(this.carts.findIndex(e => e.code === code), 1)
      // this.carts.filter(x => x.code === code)
    },
    stock (code) {
      var item = this.$store.state.acards.filter(x => x.code === code)
      var qty = this.carts.filter(value => value.code === item[0].code && value.colorcode === item[0].colorcode).map(res => {
        return res.stockqty
      })
      return qty.length > 0 ? item[0].stockqty - qty.length : item[0].stockqty
    }
  }
}
</script>

<style>

</style>
