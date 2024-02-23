<template>
  <page-component> anime: {{ titleData }} </page-component>
</template>

<script setup lang="ts">
import PageComponent from 'src/components/PageComponent.vue';
import { getTitleByCode } from 'src/composables/title-api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { titleT } from 'src/types';
const $q = useQuasar();

const { params } = useRoute();
const code = String(params.code);
const titleData = ref<titleT | null>()

onMounted(async() => {
    $q.loading.show();
    titleData.value = await getTitleByCode(code)
    $q.loading.hide();
})

</script>
