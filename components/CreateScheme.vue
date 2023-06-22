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
        @input="handelInputChange"
        placeholder="Scheme Name"
      ></v-text-field>
      <v-text-field
        density="compact"
        variant="outlined"
        name="displayName"
        @input="handelInputChange"
        placeholder="Scheme Name"
      ></v-text-field>
      <v-select
        variant="outlined"
        v-model="selectedValue"
        label="Select"
        :items="['normal', 'kpi']"
        density="compact"
      ></v-select
      ><v-btn type="submit" class="mt-2" @click="emitEvent">Submit</v-btn>
    </v-form>

    <!-- <v-divider></v-divider> -->

    <!-- <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="bg-blue" text > I accept </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true,
      selectedValue: "",
      newScheme: {},
    };
  },
  methods: {
    emitEvent() {
      if (this.newScheme.name == undefined) {
        alert("Please fill all Sections");
      } else {
        this.newScheme = { ...this.newScheme, type: this.selectedValue };
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
