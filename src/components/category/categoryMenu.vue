<template>
  <nav class="category-menu">
    <a
      class="nav-link"
      v-for="(category, index) in categories"
      :key="index"
      :href="'#' + category.iD"
      :data-hash="category.iD"
      >{{ category.name }}
    </a>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { CategoryDto } from "../../api/models/CategoryDto";
import { PropOptions } from "vue";
export default Vue.extend({
  name: "CategoryMenu",
  props: {
    categories: {
      type: Array,
      default: () => []
    } as PropOptions<CategoryDto[]>
  },
  mounted() {
    const body = document.scrollingElement || document.documentElement;
    const links = document.getElementsByClassName("nav-link");
    for (const link of links) {
      link.addEventListener("click", event => {
        event.preventDefault();
        const linkElement = link as HTMLLinkElement;
        //Using () => arrow lambdas preserve this scope for you:
        this.deActive(links);
        link.classList.add("active");
        const categoryId = linkElement.dataset.hash;
        const category = document.getElementById(
          categoryId as string
        ) as HTMLElement;
        body.scrollTop = category.offsetTop - 75;
      });
    }
    window.addEventListener(
      "scroll",
      () => {
        for (let i = links.length - 1; i >= 0; i--) {
          const element = links[i] as HTMLLinkElement;
          const categoryId = element.dataset.hash;
          const category = document.getElementById(
            categoryId as string
          ) as HTMLElement;
          if (body.scrollTop >= category.offsetTop - 75) {
            this.deActive(links);
            element.classList.add("active");
            break;
          }
        }
      },
      { passive: true }
    );
  },
  methods: {
    deActive(links: HTMLCollectionOf<Element>) {
      for (const link of links) {
        link.classList.remove("active");
      }
    }
  }
});
</script>

<style scoped></style>
