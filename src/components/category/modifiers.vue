<template>
  <ul class="modifier-groups">
    <li v-for="(mg, mgIndex) of modifierGroups" :key="mgIndex">
      <div class="mg-info">
        <div>{{ mg.name }}</div>
        <div>required</div>
      </div>
      <div class="modifiers">
        <div
          class="modifier"
          v-for="(md, mdIndex) in mg.modifiersList"
          :key="mdIndex"
        >
          <radio
            v-if="mg.isSingleSel"
            v-model="md.isSelected"
            :label="md.name"
            :group="mg.iD"
            @updated="singleSelectModifier(md, mg)"
          />
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { ModifierGroupDto } from "../../api/models/ModifierGroupDto";
import { PropOptions } from "vue";
import Radio from "@/components/shared/customs/radio.vue";
import { ModifierDto } from "../../api/models/ModifierDto";
export default Vue.extend({
  name: "Modifiers",
  components: {
    Radio
  },
  props: {
    modifierGroups: {
      type: Array
    } as PropOptions<ModifierGroupDto[]>
  },
  methods: {
    singleSelectModifier(md: ModifierDto, mg: ModifierGroupDto) {
      debugger;
      const otherModifiers = mg.modifiersList.filter(m => m.iD != md.iD);
      for (const md of otherModifiers) {
        md.count = 0;
        md.isSelected = false;
      }
    }
  }
});
</script>

<style scoped></style>
