<script setup lang="ts">
// import { reactive, computed } from "vue";
import InitiativeCount from "@model/InitiativeCount.ts";

const { initiativeCount } = defineProps<{ initiativeCount: InitiativeCount }>();
</script>

<template>
  <div style="display: flex; align-items: center">
    <div class="line"></div>
    <span>{{ initiativeCount.initiative }}</span>
    <span v-if="initiativeCount.name">&nbsp;- {{ initiativeCount.name }}</span>
  </div>
</template>

<style scoped>
* {
  color: red;
}

.line {
  width: 75vw;
  height: 2px;
  background-color: currentColor;
}
</style>
