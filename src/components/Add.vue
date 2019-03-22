<template>
<v-app>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
          <v-toolbar color="#78909C" dark>
        
        <v-toolbar-title>Add X Item</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card>
        <v-card-title primary-title>
         <template>
  <v-container grid-list-xl>
    <v-layout
      wrap
      justify-space-between
    >
      <v-flex
        xs12
        md4
      >
        <form ref="form" enctype="multipart/form-data">
          <div id="my-strictly-unique-vue-upload-multiple-image" style="display: flex; justify-content: center;">
            <vue-upload-multiple-image
              @upload-success="uploadImageSuccess"
              @before-remove="beforeRemove"
              @edit-image="editImage"
              @data-change="dataChange"
              :data-images="images"
              idUpload="myIdUpload"
              editUpload="myIdEdit"
              name="photos"
              ></vue-upload-multiple-image>
          </div>
          <div style="display: flex; justify-content: center;">
            <swatches v-model="itemcolor" :colors="colors" show-border inline></swatches>
          </div>
        </form>
      </v-flex>

      <v-flex
        xs12
        md6
      >
       <v-text-field
            v-model="code"
            label="Code"
            @keyup.enter.native="next('Name')"
            autofocus
          ></v-text-field>
          <v-text-field
            v-model="name"
            label="Name"
            ref="Name"
            @keyup.enter.native="next('Models')"
            autofocus
          ></v-text-field>
         
            <v-flex d-flex>
            <v-layout row>
                
              <v-flex d-flex>
             <v-combobox
          v-model="models"
          :items="items"
          :search-input.sync="search"
          item-text="name"
          item-value="code"
          label="..."
          @change="onchange"
          
        ></v-combobox>
               </v-flex>
              <v-flex d-flex>
           
                <v-icon left medium @click="expand = !expand">fas fa-plus-square</v-icon>
              
              </v-flex>
              
            </v-layout>
          </v-flex>
          <v-expand-transition>
          <div v-show="expand">
          <v-card>
            <v-card-title>
              <v-layout row>
              <v-flex d-flex>
                <v-text-field
            v-model="models.code"
            label="Code"
            @keyup.enter.native="next('Mname')"
            autofocus
          ></v-text-field>
              </v-flex>
              <v-flex d-flex>
              <v-text-field
            v-model="models.name"
            label="Name"
            ref="Mname"
            autofocus
          ></v-text-field>
              </v-flex>
            </v-layout>
            </v-card-title>
             <v-card-actions>
               <v-spacer></v-spacer>
               <v-icon large color="green" @click="savem">fas fa-check-square</v-icon>
               <span style="width:10px"></span>
               <v-icon large color="red" @click="cancelm">fas fa-window-close</v-icon>
             </v-card-actions>
          </v-card>
      </div>
    </v-expand-transition>
        

            <!-- <v-layout row v-show="!showCollapse" transition="expand">
              <v-flex d-flex>
                <v-text-field
            v-model="models"
            label="Model"
            ref="Models"
            @keyup.enter.native="next('Size')"
            autofocus
          ></v-text-field>
              </v-flex>
              <v-flex d-flex>
              <v-text-field
            v-model="models"
            label="Model"
            ref="Models"
            @keyup.enter.native="next('Size')"
            autofocus
          ></v-text-field>
              </v-flex>
            </v-layout> -->
          
           <v-flex d-flex>
            <v-layout row>
              <v-flex d-flex>
                <v-checkbox
                v-model="active"
                label="Active"
                ref="Active"
                ></v-checkbox>
              </v-flex>
              <v-flex d-flex>
               <v-text-field
          v-model="size"
          label="Size"
          @keyup.enter.native="next('barcode')"
          ref="Size"
        ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          
            <v-flex d-flex>
            <v-layout row>
              <v-flex d-flex>
                 <v-img :src="require('../assets/barcode.png')" aspect-ratio="1"></v-img>
              </v-flex>
               <v-flex d-flex>
              <v-text-field
                  v-model="barcode"
                  :counter="max"
                  :rules="rules"
                  label="Barcode"
                  ref="barcode"
                  @keyup.enter.native="next('SKU')"
                  autofocus
                ></v-text-field>
               </v-flex>
            </v-layout>
            </v-flex>
             <v-flex d-flex>
            <v-layout row>
              <v-flex d-flex>
                <v-text-field
          v-model="qty"
          label="SKU"
          ref="SKU"
          @keyup.enter.native="next('Price')"
          autofocus
        ></v-text-field>
              </v-flex>
              <v-flex d-flex>
               <v-text-field
          v-model="price"
          label="Price"
          ref="Price"
          autofocus
        ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>
         
        </v-card-title>
       
        <v-card-actions>
               
          <v-btn  color="green" large @click="save">Save</v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="red" large @click="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </v-app>
</template>
<script>
import Swatches from 'vue-swatches'
// Import the styles too, globally
import 'vue-swatches/dist/vue-swatches.min.css'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import api from '../models/backapi'

export default {
  name: 'add-comp',
  components: { Swatches, VueUploadMultipleImage },
  data () {
    return {
      active: false,
      expand: false,
      barcode: '',
      itemcolor: '#FFFFFF',
      colors: ['#FFFFFF', '#FFF9C4', '#B3E5FC', '#FCE4EC', '#CE93D8'],
      max: 13,
      code: '',
      name: '',
      croppa: {},
      imageData: '',
      images: [],
      imagex: [],
      show: false,
      size: '',
      qty: '',
      price: '',
      model: '',
      models: {
        code: '...',
        name: '...'
      },
      search: '',
      select: '',
      items: [{'code': 1, 'name': 'iphone6'}],
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
    }
  },
  watch: {
    search (val) {
      if (val === null) return
      if (val.length > 1) {
        this.isLoading = true
        this.getmodels()
      }
    }
  },
  computed: {
    rules () {
      const rules = []

      if (this.max) {
        const rule =
            v => (v || '').length <= this.max ||
              `A maximum of ${this.max} characters is allowed`

        rules.push(rule)
      }

      // if (!this.allowSpaces) {
      //   const rule =
      //       v => (v || '').indexOf(' ') < 0 ||
      //         'No spaces are allowed'

      //   rules.push(rule)
      // }
      // if (this.match) {
      //   const rule =
      //       v => (!!v && v) === this.match ||
      //         'Values do not match'

      //   rules.push(rule)
      // }
      return rules
    }
  },
  created () {
    this.cleardata()
    this.getmodels()
  },
  methods: {
    next (ref) {
      this.$nextTick(function () {
        switch (ref) {
          case 'Name':
            this.$refs.Name.focus()
            break
          // case 'Models':
          //   this.$refs.Models.focus()
          //   break
          case 'SKU':
            this.$refs.SKU.focus()
            break
          case 'Size':
            this.$refs.Size.focus()
            break
          case 'barcode':
            this.$refs.barcode.focus()
            break
          case 'Price':
            this.$refs.Price.focus()
            break
          case 'Mname':
            this.$refs.Mname.focus()
            break
          default:
            break
        }
      })
    },
    validateField () {
      this.$refs.form.validate()
    },
    save () {
      this.$store.set('additem', !this.additem)
      this.$store.set('showlist', !this.additem)
      // console.log(this.images[0].path)
      let data = {
        barcode: this.barcode,
        code: this.code,
        name1: this.name,
        sizecode: this.size,
        stockqty: this.qty,
        price: this.price,
        active: this.active,
        colorcode: this.itemcolor,
        models: this.models,
        images: this.imagex
      }
      var sfile = function () {
        return new Promise(function (resolve) {
          api.save(data)
            .then(function (response) {
              return resolve(response.file)
            })
        })
      }
      sfile().then(response => {
        // this.imagex = []
        this.$store.set('reindex', true)
      })
      // console.log(data.images[0])
      // this.images = []
      // console.log(this.$store.state.additem)
    },
    cancel () {
      this.$store.set('additem', !this.additem)
      this.$store.set('showlist', !this.additem)
      this.images = []
      this.$store.set('reindex', false)
    },
    previewImage: function (event) {
      // Reference to the DOM input element
      var input = event.target
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0])
      }
    },
    uploadImageSuccess (formData, index, fileList) {
      // console.log(this.images)
      // console.log('data', formData, index, fileList)
      formData.append('name', fileList[index].name)
      formData.append('file', fileList[index].path)
      // this.imagex.push(fileList[index])
      var gfile = function () {
        return new Promise(function (resolve) {
          api.uploadimg(formData).then(function (response) {
            if (response.status === '502') {
              response = {file: 'none.jpg'}
            }
            return resolve(response.file)
          })
        })
      }
      gfile().then(response => {
        console.log(response)
        this.imagex.push(response)
      })
    },
    beforeRemove (index, done, fileList) {
      console.log('index', index, fileList)
      var r = confirm('remove image')
      if (r === true) {
        this.imagex.splice(index, 1)
        done()
      } else {
      }
    },
    editImage (formData, index, fileList) {
      console.log('edit data', formData, index, fileList)
    },
    dataChange (data) {
    // onsole.log(data[0].path)
      console.log(data)
    },
    savem () {
      api.addmo(this.models).then(res => {
        this.models.code = ''
        this.models.name = ''
        this.expand = !this.expand
      })
    },
    cancelm () {
      this.models.code = ''
      this.models.name = ''
      this.expand = !this.expand
    },
    getmodels () {
      this.isLoading = true
      api.getmodels()
        .then(res => {
          // console.log(res)
          this.items = JSON.parse(JSON.stringify(res.rows))
          // console.log(this.items)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
    cleardata () {
      this.barcode = ''
      this.code = ''
      this.name = ''
      this.size = ''
      this.qty = ''
      this.price = ''
      this.active = ''
      this.itemcolor = ''
      this.models = ''
      this.imagex = []
    },
    loadcombo (val) {
      console.log()
    },
    onchange (value) {
      if (value == null) {
        this.models = {
          code: '',
          name: ''
        }
      }
      // console.log(value)
      // if (value === '') {
      //   value = null
      // }
      // this.$emit('input', value)
    }

  }
}
</script>

<style>

</style>
