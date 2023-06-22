<template>
  <v-container fluid class="bg-white min-h-screen"
    ><p class="text-h5 text-center">Github Tracker</p>
    <v-row class="mt-5">
      <v-col cols="12" md="6">
        <v-text-field
          density="compact"
          v-model="username"
          label="GitHub User Name"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          density="compact"
          v-model="repo"
          label="Repo Name"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-btn color="primary" @click="getAllIssues" block>Find</v-btn>
      </v-col>
    </v-row>

    <!-- <ul class="mt-5">
      <li v-for="(issue, ind) in allIssues" :key="issue.id">
        <span>{{ ind }}</span> {{ issue.created_at }}
      </li>
    </ul> -->
    <div class="text-subtitle-2 mt-4 mb-2">Accordion</div>

    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="(yearIssues, year) in groupedIssues"
        :key="year"
      >
        <template #title>
          <span>{{ year }}</span>
        </template>
        <template #content>
          <ul>
            <li v-for="issue in yearIssues" :key="issue.id">
              {{ issue.title }}
            </li>
          </ul>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- <div class="mt-10 px-5">
      <ul v-for="(yearIssues, year) in groupedIssues" :key="year">
        <li>{{ year }}</li>
        <li v-for="issue in yearIssues" :key="issue.id">
          {{ issue.title }}
        </li>
      </ul>
    </div> -->
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      repo: "",
      repository: null,
      allIssues: [],
      groupedIssues: {},
    };
  },
  methods: {
    async getAllIssues() {
      const owner = "twitter";
      const repo = "scalding";
      const perPage = 100;
      let page = 1;

      try {
        while (true) {
          const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/issues`,
            {
              params: {
                per_page: perPage,
                page,
              },
            }
          );

          const issues = response.data;
          this.allIssues = this.allIssues.concat(issues);

          if (issues.length < perPage) {
            break;
          } else {
            page++;
          }
        }

        console.log(this.allIssues);
        this.groupIssuesByYear();
      } catch (error) {
        console.error(error);
      }
    },

    groupIssuesByYear() {
      this.groupedIssues = this.allIssues.reduce((groups, issue) => {
        const createdYear = new Date(issue.created_at).getFullYear();
        if (!groups[createdYear]) {
          groups[createdYear] = [];
        }
        groups[createdYear].push(issue);
        return groups;
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
