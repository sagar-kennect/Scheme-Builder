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
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel
        v-for="(yearIssues, year) in groupedIssues"
        :key="year"
      >
        <v-expansion-panel-title>{{ year }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <p v-for="issue in yearIssues" :key="issue.id">
            <!-- {{ issue.title }} -->
            {{ issue.created_at }}
            <!-- {{ getMonth(issue?.created_at) }} -->
          </p>
        </v-expansion-panel-text>
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
    <div variant="outlined" class="mt-10 px-5">
      <div class="d-flex justify-end align-center text-caption">
        <select @change="handelSelectPages" class="mr-2" style="outline: none">
          <option :value="result.length">All</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <p class="mr-2">Result of {{ result.length }}</p>
      </div>
    </div>
    <v-table v-if="result.length !== 0">
      <thead>
        <tr>
          <th>
            <div class="text-left d-flex item-center">
              Number
              <v-icon
                :icon="mdiArrowDownThin"
                class="ml-1"
                @click="handelToggleSort"
                :style="`${sort ? 'transform: rotate(180deg)' : ''}`"
              >
              </v-icon>
            </div>
          </th>
          <th class="text-left">Title Of Issue</th>
          <th class="text-left">Created At</th>
          <th class="text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in result.slice(start, resultPerPage)" :key="item.name">
          <td>{{ item.number }}</td>
          <td class="text-uppercase">{{ item.title }}</td>
          <td>{{ item.created_at }}</td>
          <td>
            <p
              :class="`px-2  d-flex justify-center ${
                item.state == 'open' ? 'bg-green' : 'bg-gray'
              }  rounded-xl py-1`"
            >
              {{ item.state }}
            </p>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import axios from "axios";
import { mdiArrowDownThin } from "@mdi/js";

export default {
  data() {
    return {
      mdiArrowDownThin,
      username: "freeCodeCamp",
      repo: "freeCodeCamp",
      repository: null,
      allIssues: [],
      groupedIssues: {},
      panel: [],
      itemsPerPage: 5,
      // Pagination, sort ,filter
      sort: false,
      resultPerPage: 5,
      start: 0,
      end: 0,
      result: [],
    };
  },
  methods: {
    async getAllIssues() {
      const owner = this.username;
      const repo = this.repo;
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
        this.result = this.allIssues;
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

      // console.log(this.groupedIssues);
    },

    groupIssuesByMonth(year) {
      console.log();
    },

    getMonth(dateString) {
      const date = new Date(dateString);
      const month = date.toLocaleString("default", { month: "long" });
      console.log(month);
    },
    handelToggleSort() {
      this.sort = !this.sort;

      if (this.sort) {
        this.result = this.result?.sort((a, b) => a.number - b.number);
      } else {
        this.result = this.result?.sort((a, b) => b.number - a.number);
      }
    },
    handelSelectPages($event) {
      console.log(event.target.value);
      this.resultPerPage = event.target.value;
    },
  },
};
</script>

<style lang="scss" scoped></style>
