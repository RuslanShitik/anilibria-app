<template>
  <div v-if="episodesList.length" class="row q-gutter-y-xs">
    <div class="col-12">
      <VideoPlayer
        controls
        :sources="episodesList[currentEpisode - 1].sources"
        aspect-ratio="16:9"
      >
        <template v-slot="{ player, state }">
          <div style="bottom: 30px; position: absolute; padding: 1rem">
            <template
              v-if="episodesList[currentEpisode - 1].skips.opening.length"
            >
              <q-btn
                v-if="
                  state.currentTime >=
                    episodesList[currentEpisode - 1].skips.opening[0] &&
                  state.currentTime <=
                    episodesList[currentEpisode - 1].skips.opening[1] - 1
                "
                @click="
                  player.currentTime(
                    episodesList[currentEpisode - 1].skips.opening[1]
                  )
                "
                label="skip opening"
              />
            </template>
          </div>
        </template>
      </VideoPlayer>
    </div>
    <div class="col-12">
      <q-scroll-area
        visible
        :thumb-style="{ height: '2px' }"
        style="height: 40px"
      >
        <q-btn-toggle
          no-wrap
          unelevated
          v-model="currentEpisode"
          color="primary    "
          toggle-color="accent"
          :options="episodesList"
        />
      </q-scroll-area>
    </div>
  </div>
</template>
<script setup lang="ts">
import { VideoPlayer } from '@videojs-player/vue';
import { playerT } from 'src/types/title';
import 'video.js/dist/video-js.css';
import { getVideoUrl } from 'src/composables/urls';
import { computed, ref } from 'vue';

interface ITitleVideoPlayerProps {
  player: playerT;
}

const props = defineProps<ITitleVideoPlayerProps>();

const currentEpisode = ref(1);

const episodesList = computed(
  () =>
    Object.values(props.player.list || {}).map((el) => ({
      label: `Серия ${el.episode}`,
      value: el.episode,
      skips: el.skips,
      sources: [
        {
          src: getVideoUrl(props.player.host || '', el.hls.fhd || ''),
        },
        {
          src: getVideoUrl(props.player.host || '', el.hls.hd || ''),
        },
        {
          src: getVideoUrl(props.player.host || '', el.hls.sd || ''),
        },
      ],
    })) || []
);
</script>
