<script setup lang="ts">
// import { reactive, computed } from "vue";
import InitiativeCount from "@model/InitiativeCount";

const { initiativeCount } = defineProps<{ initiativeCount: InitiativeCount }>();
</script>

<template>
  <div class="initiativeCount">
    <div class="line"></div>
    <div class="text">
      <span>{{ initiativeCount.initiative }}</span>
      <span v-if="initiativeCount.name">&nbsp;- {{ initiativeCount.name }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.initiativeCount {
  display: flex;
  align-items: center;

  margin-top: -0.75em;
  margin-bottom: -0.75em;

  color: red;

  & .line {
    width: 75vw;
    height: 2px;
    background-color: currentColor;
  }

  & .text {
    margin-left: 1em;
    text-wrap: nowrap;
  }
}
</style>
