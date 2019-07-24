<template>
  <div class="content-backing-panel">
    <div
      class="display-option-backing-panel"
      v-for="(rankedMatch, index) in rankedMatches"
      :key="index"
      @click="onClientSelect(rankedMatch)"
    >{{rankedMatch.firstName}} {{rankedMatch.middleName}} {{rankedMatch.lastName}} {{rankedMatch.address}} {{rankedMatch.contacts}}</div>
  </div>
</template>

<script>
//Components

//Services
import { bus } from "@/services/Bus";

//Vuex
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["props"],
  components: {},

  data() {
    return {
      name: this.props.name,

      firstNameMatches: [],
      middleNameMatches: [],
      lastNameMatches: [],

      rankedMatches: []
    };
  },

  methods: {
    ...mapActions(["getClientBy", "setSelectedClient"]),

    sortByRank() {
      this.rankedMatches.sort(function(a, b) {
        return a.rank + b.rank;
      });
    },

    rankDuplicateMiddleNameMatches() {
      var listLength = this.rankedMatches.length;
      for (var i = 0; i < listLength; i++) {
        for (var i1 = 0; i1 < this.middleNameMatches.length; i1++) {
          if (
            this.rankedMatches[i].clientId ===
            this.middleNameMatches[i1].clientId
          ) {
            this.rankedMatches[i].rank += 1;
            this.middleNameMatches.splice(i1, 1);
          } else {
            this.rankedMatches.push(this.middleNameMatches[i1]);
            this.middleNameMatches.splice(i1, 1);
          }
        }
      }
    },

    rankDuplicateLastNameMatches() {
      var listLength = this.rankedMatches.length;
      for (var i = 0; i < listLength; i++) {
        for (var i1 = 0; i1 < this.lastNameMatches.length; i1++) {
          if (
            this.rankedMatches[i].clientId === this.lastNameMatches[i1].clientId
          ) {
            this.rankedMatches[i].rank += 1;
            this.lastNameMatches.splice(i1, 1);
          } else {
            this.rankedMatches.push(this.lastNameMatches[i1]);
            this.lastNameMatches.splice(i1, 1);
          }
        }
      }
    },

    rankMatches() {
      this.rankedMatches = this.firstNameMatches;
      this.rankDuplicateMiddleNameMatches();
      this.rankDuplicateLastNameMatches();
      this.sortByRank();
    },

    pushFirstNameMatches(firstNameMatches) {
      this.firstNameMatches = [];
      for (var i = 0; i < firstNameMatches.length; i++) {
        firstNameMatches[i].rank = 1;
        this.firstNameMatches.push(firstNameMatches[i]);
      }
      this.rankMatches();
    },

    pushMiddleNameMatches(middleNameMatches) {
      this.middleNameMatches = [];
      for (var i = 0; i < middleNameMatches.length; i++) {
        middleNameMatches[i].rank = 1;
        this.middleNameMatches.push(middleNameMatches[i]);
      }
      this.rankMatches();
    },

    pushLastNameMatches(lastNameMatches) {
      this.lastNameMatches = [];
      for (var i = 0; i < lastNameMatches.length; i++) {
        lastNameMatches[i].rank = 1;
        this.lastNameMatches.push(lastNameMatches[i]);
      }
      this.rankMatches();
    },

    async getClient(payload) {
      await this.getClientBy(payload);

      if (payload.field === "firstName") {
        this.pushFirstNameMatches(this.allFirstNameMatches);
      } else if (payload.field === "middleName") {
        this.pushMiddleNameMatches(this.allMiddleNameMatches);
      } else if (payload.field === "lastName") {
        this.pushLastNameMatches(this.allLastNameMatches);
      }
    },

    onClientSelect(rankedMatch) {
      this.setSelectedClient(rankedMatch);
      bus.$emit(this.name + "FromChild", true);
    }
  },

  computed: mapGetters([
    "allFirstNameMatches",
    "allMiddleNameMatches",
    "allLastNameMatches"
  ]),

  created() {
    bus.$on(this.name + "FromParent", payload => {
      this.getClient(payload);
    });
  },

  mounted() {},

  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.display-option-backing-panel {
  background-color: lightcyan;
  margin: 5px;
  cursor: pointer;
}
</style>
