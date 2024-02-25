<template>
  <PageComponent>
    <div class="q-gutter-y-xl" v-if="titleData">
      <div class="row">
        <div class="col-12">
          <q-img :src="getImageUrl(titleData.posters.original.url)" />
        </div>
        <div class="col-12 text-h5">
          <div class="row">
            <div class="col-12">
              {{ titleData.names.ru }}
            </div>
            <div class="col-12 q-gutter-xs">
              <q-badge
                :key="index"
                v-for="(genre, index) in titleData.genres"
                :label="genre"
                color="secondary"
              />
            </div>
            <div class="col-12 q-gutter-xs">
              <q-btn
                v-if="titleData.player.list"
                unelevated
                color="primary"
                label="watch"
                href="#watch"
              />
              <q-btn
                unelevated
                color="primary"
                label="description"
                href="#description"
              />
              <q-btn
                v-if="titleData.franchises.length"
                unelevated
                color="primary"
                label="Franchise"
                href="#franchise"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row" id="description">
        <div class="col-12 text-body1">
          {{ titleData.description }}
        </div>
      </div>
      <div class="row" v-if="titleData.player.list" id="watch">
        <div class="col-12">
          <TitleVideoPlayer :player="titleData.player" />
        </div>
      </div>

      <div v-if="titleData.franchises.length" id="franchise" class="row">
        <div class="col-12 text-h5">Франшизы</div>
        <div class="col-12">
          <div
            :key="el.franchise.id"
            v-for="el in titleData.franchises"
            class="row"
          >
            <div class="col-12 text-h6">
              {{ el.franchise.name }}
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <q-list bordered separator>
                    <q-item
                      :key="el2.id"
                      v-for="el2 in el.releases"
                      clickable
                      v-ripple
                      :to="`/title/${el2.code}`"
                    >
                      <q-item-section>{{ el2.names.ru }}</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageComponent>
</template>

<script setup lang="ts">
import PageComponent from 'src/components/PageComponent.vue';
import { getTitleByCode } from 'src/composables/title-api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { titleT } from 'src/types';
import 'video.js/dist/video-js.css';
import TitleVideoPlayer from 'src/components/TitleVideoPlayer.vue';
import { getImageUrl } from 'src/composables/urls';
import { watch } from 'vue';

const $q = useQuasar();
const route = useRoute();

const titleData = ref<titleT | null>();

watch(route, async () => {
    await fetchTitleData();
})

onMounted(async () => {
  await fetchTitleData();
});

const fetchTitleData = async (): Promise<void> => {
  $q.loading.show();
  titleData.value = await getTitleByCode(String(route.params.code));
  $q.loading.hide();
};
</script>
