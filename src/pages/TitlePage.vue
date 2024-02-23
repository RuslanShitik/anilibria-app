<template>
  <PageComponent>
    <!-- <video
      v-if="titleData"
      :src="getVideoUrl(titleData.player.list[1].hls.sd)"
    ></video> -->

    anime: {{ titleData }}
  </PageComponent>
</template>

<script setup lang="ts">
import PageComponent from 'src/components/PageComponent.vue';
import { getTitleByCode } from 'src/composables/title-api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { titleT } from 'src/types';
import { getVideoUrl } from 'src/composables/urls';

const $q = useQuasar();

const { params } = useRoute();
const code = String(params.code);
const titleData = ref<titleT | null>();

onMounted(async () => {
  $q.loading.show();
  titleData.value = await getTitleByCode(code);
  $q.loading.hide();
});
</script>
