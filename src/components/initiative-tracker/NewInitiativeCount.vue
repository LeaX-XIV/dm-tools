<script setup lang="ts">
import { ref, watch } from "vue";
import InitiativeCount from "@/model/InitiativeCount";
const emit = defineEmits<{
  (e: "new-initiative-count", initiativeCount: InitiativeCount): void;
}>();

const open = ref(false);

const name = ref("");
const initiative = ref("");

watch(open, () => {
  name.value = "";
  initiative.value = "";
});

function save() {
  emit("new-initiative-count", new InitiativeCount(Number(initiative.value), name.value));
  open.value = false;
}
</script>

<template>
  <button @click.stop.prevent="open = true">+ Iniziativa</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>

      <form @submit.stop.prevent="save">
        <div>
          <input v-model.lazy="initiative" type="number" required placeholder="Iniziativa" />
          <input v-model.lazy="name" placeholder="Nome" />
        </div>

        <button type="reset" @click="open = false">Annulla</button>
        <button type="submit">Salva</button>
      </form>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;

  padding: 0.5em;
  border: 1px solid black;
  background-color: white;
}
</style>
