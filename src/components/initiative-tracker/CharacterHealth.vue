<script setup lang="ts">
import { reactive, computed } from "vue";

const {
  current = null,
  max = null,
  bloodiedThresh = 0.25,
} = defineProps<{ current?: number | null; max?: number | null; bloodiedThresh?: number }>();

const hasCurrent = computed(() => current !== null);
const hasMax = computed(() => max !== null);
const hasAll = computed(() => hasCurrent.value && hasMax.value);

const isDead = computed(() => hasCurrent.value && current! <= 0);
const isBloodied = computed(
  () => hasAll.value && !isDead.value && max! * bloodiedThresh >= current!,
);

const classObject = reactive({
  dead: isDead,
  bloodied: isBloodied,
});

// No need for reactivity here
const styleObject = {
  "--artificial-animation-jitter": `${Math.random().toFixed(3)}s`,
  "--artificial-delay": `${(Math.random() * 2).toFixed(3)}s`,
};
</script>

<template>
  <div :class="classObject">
    <div style="text-align: center">
      <span v-if="hasCurrent" class="hitPointsCurrent">{{ current }}</span>
      <span v-if="hasAll">/</span>
      <span v-if="hasMax" class="hitPointsMax">{{ max }}</span>
    </div>
    <div v-if="hasCurrent" :style="styleObject" class="pulse"></div>
  </div>
</template>

<style lang="scss" scoped>
$w: 4em;
$h: 2em;
$strokeWidth: 3px;
$strokeColor: black;
$svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="#{$w}" height="#{$h}"><polyline fill="none" stroke-width="#{$strokeWidth}" stroke="#{$strokeColor}" points="2.4,58.7 70.8,58.7 76.1,46.2 81.1,58.7 89.9,58.7 93.8,66.5 102.8,22.7 110.6,78.7 115.3,58.7 126.4,58.7 134.4,54.7 142.4,58.7 197.8,58.7 "/></svg>';

.pulse {
  --animation-duration-factor: 1;
  --animation-duration: calc(
    (2s + var(--artificial-animation-jitter)) * var(--animation-duration-factor)
  );

  height: $h;
  width: $w;
  overflow: hidden;
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // heartbeat gfx
  &:after {
    content: "";
    display: block;
    background: url("data:image/svg+xml;utf8,#{$svg}") 0 0 no-repeat;
    width: 100%;
    height: 100%;
    position: absolute;
    animation: var(--animation-duration) pulse infinite linear;
    animation-delay: var(--artificial-delay);
  }
  // flat opaque line
  &:before {
    content: "";
    background: #eee;
    position: absolute;
    z-index: -1;
    left: #{$w * 0.02};
    right: #{$w * 0.02};
    bottom: 0;
    top: #{$h * 0.16}; // the SVG isn't exacly centered..
    margin: auto;
    height: $strokeWidth;
  }
  .bloodied & {
    --animation-duration-factor: 1 / 2.85;
    $strokeColor: red;
    $svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="#{$w}" height="#{$h}"><polyline fill="none" stroke-width="#{$strokeWidth}" stroke="#{$strokeColor}" points="2.4,58.7 70.8,58.7 76.1,46.2 81.1,58.7 89.9,58.7 93.8,66.5 102.8,22.7 110.6,78.7 115.3,58.7 126.4,58.7 134.4,54.7 142.4,58.7 197.8,58.7 "/></svg>';
    &:after {
      background: url("data:image/svg+xml;utf8,#{$svg}") 0 0 no-repeat;
    }
  }
  .dead & {
    --animation-duration-factor: 1.5;
    $svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="#{$w}" height="#{$h}"><polyline fill="none" stroke-width="#{$strokeWidth}" stroke="#{$strokeColor}" points="2.4,58.7 197.8,58.7 "/></svg>';
    &:after {
      background: url("data:image/svg+xml;utf8,#{$svg}") 0 0 no-repeat;
      animation-name: flat;
    }
  }
}

@keyframes pulse {
  0% {
    clip-path: rect(0 0 $h 0);
  }
  10% {
    clip-path: rect(0 calc($w/3) $h 0);
  }
  38% {
    clip-path: rect(0 #{calc($w/1.5)} $h 0);
  }
  48% {
    clip-path: rect(0 $w $h 0);
  }
  52% {
    clip-path: rect(0 $w $h 0);
  }
  62% {
    clip-path: rect(0 $w $h calc($w/3));
  }
  90% {
    clip-path: rect(0 $w $h #{calc($w/1.5)});
  }
  100% {
    clip-path: rect(0 $w $h $w);
  }
}

@keyframes flat {
  0% {
    clip-path: rect(0 0 $h 0) /*rect(0 0 $h 0)*/;
  }
  10% {
    clip-path: rect(0 20% $h 0) /*rect(0 0 $h 0)*/;
  }
  40% {
    clip-path: rect(0 $w $h #{calc($w * 0.8)}) /*rect(0 0 $h -20%)*/;
  }
  50% {
    clip-path: rect(0 $w $h $w) /*rect(0 20% $h 0)*/;
  }
  100% {
    clip-path: rect(0 $w $h $w) /*rect(0 20% $h 0)*/;
  }
}
</style>
