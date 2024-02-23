<script setup lang="ts">
import { titleT } from 'src/types';
import { Ref, onMounted, ref } from 'vue';
import { useTitleAPI } from '../composables/title-api';
import { getImageUrl } from '../composables/urls';
import TitleCard from './TitleCard.vue';
import TitleCardSkeleton from './TitleCardSkeleton.vue';

const titleUpdates: Ref<titleT[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);
const page: Ref<number> = ref(1);

const getTitleUpdates = async (): Promise<void> => {
  isLoading.value = true;
  const res = await useTitleAPI('title/updates', { page: page.value });
  titleUpdates.value = [...titleUpdates.value, ...res.list];
  isLoading.value = false;
};

onMounted(async () => {
  await getTitleUpdates();
});

const loadMore = async (): Promise<void> => {
  page.value++;
  await getTitleUpdates();
};
</script>

<template>
  <div class="row">
    <div class="text-h5 col-12">Последние обновления</div>
    <div class="col-12">
      <q-scroll-area style="width: 100%; height: 465px">
        <div class="row q-gutter-sm no-wrap">
          <TitleCard
            v-for="title in titleUpdates"
            :key="title.id"
            :poster="getImageUrl(title.posters.small.url)"
            :title-type="title.type.full_string"
            :title-name="title.names.ru"
          />

          <template v-if="isLoading">
            <TitleCardSkeleton v-for="i in 3" :key="i" />
          </template>

          <q-btn v-if="!isLoading" flat @click="loadMore">Еще</q-btn>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>
