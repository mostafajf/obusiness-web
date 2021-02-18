<template>
  <ul class="modifier-groups">
    <li v-for="(mg, mgIndex) of modifierGroups" :key="mgIndex">
      <div class="mg-info">
        <div>{{ mg.name }}</div>
        <div>{{ groupSpecification(mg) }}</div>
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
          <checkbox
            v-else-if="!mg.includeQuantity"
            :label="md.name"
            v-model="md.isSelected"
            @updated="checkSelection(md, mg)"
            :is-disabled="mg.maximumDisabled && !md.isSelected"
          />
          <div>+${{ md.price | currency }}</div>
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
import Checkbox from "@/components/shared/customs/checkbox.vue";
import { ModifierDto } from "../../api/models/ModifierDto";
export default Vue.extend({
  name: "Modifiers",
  components: {
    Radio,
    Checkbox
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
    },
    checkSelection(md: ModifierDto, mg: ModifierGroupDto) {
      md.checkMaximumSelection(mg);
      md.checkMinimumSelection(mg);
    },
    groupSpecification(group: ModifierGroupDto) {
      if (group.isForceSel && group.maximumSelection) {
        if (group.minimumSelection == group.maximumSelection) {
          return `Select ${group.maximumSelection}`;
        }
        return `Select ${group.minimumSelection} to ${group.maximumSelection}`;
      } else if (group.maximumSelection) {
        return `Select up to ${group.maximumSelection}`;
      } else if (group.isForceSel) {
        return `Select at least ${group.minimumSelection}`;
      }
    }
  }
});
</script>

<style scoped></style>
