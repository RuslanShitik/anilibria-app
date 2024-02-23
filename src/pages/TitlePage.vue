<template>
  <PageComponent>
    <!-- getVideoUrl(titleData?.player.host || '', titleData?.player.list[1].hls.sd || '') -->
    <VideoPlayer
      v-if="episodesList.length"
      controls
      aspect-ratio="16:9"
      :src="
        getVideoUrl(
          titleData?.player.host || '',
          episodesList[currentEpisode].hls.sd
        )
      "
    />
    <!-- anime: {{ titleData }} -->

    <q-btn-group push>
      <q-btn
        v-for="el in episodesList"
        push
        :label="el.episode"
        :key="el.episode"
        @click="currentEpisode = el.episode - 1"
      />
    </q-btn-group>
    {{ episodesList }}
  </PageComponent>
</template>

<script setup lang="ts">
import PageComponent from 'src/components/PageComponent.vue';
import { getTitleByCode } from 'src/composables/title-api';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { titleT } from 'src/types';
import { getVideoUrl } from 'src/composables/urls';
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';

const $q = useQuasar();
const { params } = useRoute();
const code = String(params.code);

const titleData = ref<titleT | null>();
const currentEpisode = ref(0);

const episodesList = computed(
  () => Object.values(titleData.value?.player.list || {}).map((el) => el) || []
);

onMounted(async () => {
  $q.loading.show();
  titleData.value = await getTitleByCode(code);
  $q.loading.hide();
});
</script>
