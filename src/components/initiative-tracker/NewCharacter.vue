<script setup lang="ts">
import { ref, watch } from "vue";
import Character from "@model/Character";
const emit = defineEmits<{
  (e: "new-character", character: Character): void;
}>();

const open = ref(false);

const isEnemy = ref(false);
const number = ref("1");

const name = ref("");
const initiative = ref("");
const armorClass = ref("");
const hitPointsMax = ref("");
const hitPointsCurrent = ref("");

watch(open, () => {
  isEnemy.value = false;
  number.value = "1";
  name.value = "";
  initiative.value = "";
  armorClass.value = "";
  hitPointsMax.value = "";
  hitPointsCurrent.value = "";
});

function save() {
  const count = Number(number.value);
  for (let i = 0; i < count; ++i) {
    emit(
      "new-character",
      new Character(
        isEnemy.value ? `${name.value} ${i + 1}` : name.value,
        Number(initiative.value),
        armorClass.value ? Number(armorClass.value) : undefined,
        hitPointsMax.value ? Number(hitPointsMax.value) : undefined,
        hitPointsCurrent.value ? Number(hitPointsCurrent.value) : undefined,
      ),
    );
  }

  open.value = false;
}
</script>

<template>
  <button @click.stop.prevent="open = true">+ Creatura</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>

      <form @submit.stop.prevent="save">
        <label>
          <input v-model="isEnemy" type="checkbox" />
          <span>Nemico</span>
        </label>
        <input v-if="isEnemy" v-model.lazy="number" type="number" min="1" />
        <div>
          <input v-model.lazy="name" required placeholder="Nome" />
          <input v-model.lazy="initiative" type="number" required placeholder="Iniziativa" />
          <input
            v-model.lazy="armorClass"
            type="number"
            placeholder="Classe Armatura"
            :required="isEnemy"
          />
          <input
            v-model.lazy="hitPointsMax"
            type="number"
            placeholder="Punti ferita Massimi"
            :required="isEnemy"
          />
          <input
            v-model.lazy="hitPointsCurrent"
            type="number"
            placeholder="Punti ferita attuali"
            :required="isEnemy"
          />
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
