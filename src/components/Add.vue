<template>
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
        <v-form ref="form">
         <!-- <v-img :aspect-ratio="1.7" :src="imageData" contain></v-img> -->
           <!-- <div>
            <div class="file-upload-form">
                Upload an image file:
                <input type="file" @change="previewImage" accept="image/*">
            </div>
            <div class="image-preview" v-if="imageData.length > 0">
                <img class="preview" :src="imageData">
            </div>
        </div>-->
         <!-- <v-btn color="blue"  @click="$refs.inputUpload.click()">Image</v-btn>
          <input v-show="false" ref="inputUpload" type="file" @change="previewImage" > -->
          <div id="my-strictly-unique-vue-upload-multiple-image" style="display: flex; justify-content: center;">
            <vue-upload-multiple-image
              @upload-success="uploadImageSuccess"
              @before-remove="beforeRemove"
              @edit-image="editImage"
              @data-change="dataChange"
              :data-images="images"
              idUpload="myIdUpload"
              editUpload="myIdEdit"
              ></vue-upload-multiple-image>
          </div>
          <div style="display: flex; justify-content: center;">
            <swatches v-model="itemcolor" :colors="colors" show-border inline></swatches>
          </div>
        </v-form>
      </v-flex>

      <v-flex
        xs12
        md6
      >
       <v-text-field
            v-model="code"
            label="Code"
          ></v-text-field>
          <v-text-field
            v-model="name"
            label="name"
          ></v-text-field>
           <v-flex d-flex>
            <v-layout row>
              <v-flex d-flex>
                <v-checkbox
                v-model="active"
                label="Active"
                ></v-checkbox>
              </v-flex>
              <v-flex d-flex>
               <v-text-field
          v-model="size"
          label="Size"
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
               <v-spacer></v-spacer>
          <v-btn  color="green" large @click="save">Save</v-btn>
          <v-btn  color="red" large @click="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Swatches from 'vue-swatches'
// Import the styles too, globally
import 'vue-swatches/dist/vue-swatches.min.css'
import VueUploadMultipleImage from 'vue-upload-multiple-image'

export default {
  name: 'add-comp',
  components: { Swatches, VueUploadMultipleImage },
  data () {
    return {
      active: false,
      barcode: '',
      itemcolor: 'white',
      colors: ['#FFFFFF', '#FFF9C4', '#B3E5FC', '#FCE4EC', '#CE93D8'],
      max: 13,
      code: '',
      name: '',
      croppa: {},
      imageData: '',
      images: [],
      show: false,
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
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
  watch: {
    match: 'validateField',
    max: 'validateField',
    model: 'validateField'
  },
  methods: {
    validateField () {
      this.$refs.form.validate()
    },
    save () {
      this.$store.set('additem', !this.additem)
      this.images = []
      // console.log(this.$store.state.additem)
    },
    cancel () {
      this.$store.set('additem', !this.additem)
      this.images = []
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
      console.log('data', formData, index, fileList)
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove (index, done, fileList) {
      console.log('index', index, fileList)
      var r = confirm('remove image')
      if (r === true) {
        done()
      } else {
      }
    },
    editImage (formData, index, fileList) {
      console.log('edit data', formData, index, fileList)
    },
    dataChange (data) {
      console.log(data)
    }

  }
}
</script>

<style>

</style>
