<template>
<v-flex xs12 sm12>
  <v-card
    class="mx-auto"
    color="#7290c1"
    dark
    max-width="400"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
      mdi-keys
      </v-icon>
      <span class="title font-weight-light">Login</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
     <v-layout column wrap>
     <v-text-field v-model="userid" label="UserID"></v-text-field>
     <v-text-field v-model="passwd" label="Password"></v-text-field>
     </v-layout>
    </v-card-text>

    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>Jacky Yun</v-list-tile-title>
        </v-list-tile-content>

        <v-layout
          align-center
          justify-end
        >
          <v-spacer></v-spacer>
          <v-btn  color="green" @click="save">Login</v-btn>
          <v-btn  color="red"  @click="cancel">Cancel</v-btn>
        </v-layout>
      </v-list-tile>
    </v-card-actions>
  </v-card>
    </v-flex>
</v-layout>
</template>
<script>
export default {
  name: 'admin',
  data () {
    return {
      userid: '',
      passwd: ''
    }
  },
  methods: {
    save () {
    },
    cancel () {
    }
  }
}
</script>

<style>

</style>
