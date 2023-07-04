<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2 mb-4">
      Crete Scheme
    </v-card-title>
    <v-form @submit.prevent class="px-3 py-4">
      <v-text-field
        density="compact"
        variant="outlined"
        name="name"
        v-model="SchemeName"
        placeholder="Scheme Name"
      ></v-text-field>
      <v-text-field
        density="compact"
        variant="outlined"
        name="displayName"
        placeholder="Scheme Name"
        v-model="DisplayName"
      ></v-text-field>
      <v-select
        variant="outlined"
        v-model="selectedValue"
        label="Select"
        :items="['normal', 'kpi']"
        density="compact"
      ></v-select
      ><v-btn type="submit" class="mt-2 bg-blue" @click="emitEvent"
        >Submit</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    isDuplicate: {
      type: Boolean,
      required: true,
    },
    dataObject: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: true,
      selectedValue: "",
      newScheme: {},
      SchemeName: this.dataObject.name,
      DisplayName: this.dataObject.displayName,
      selectedValue: this.dataObject.type,
    };
  },
  mounted() {
    // console.log(this.isDuplicate);
    if (!this.isDuplicate) {
      console.log("new scheme");
      this.SchemeName = "";
      this.DisplayName = "";
      this.selectedValue = "";
    } else {
      console.log("dup scheme");
      this.newScheme = this.dataObject;
    }
  },

  methods: {
    emitEvent() {
      if (this.SchemeName == undefined) {
        alert("Please fill all Sections");
      } else {
        this.newScheme = {
          ...this.newScheme,
          type: this.selectedValue,
          name: this.SchemeName,
          displayName: this.DisplayName,
        };
        this.$emit("child-event", this.newScheme);
      }
    },
    handelInputChange($event) {
      this.newScheme = {
        ...this.newScheme,
        [event.target.name]: event.target.value,
      };
    },
  },
};
</script>
