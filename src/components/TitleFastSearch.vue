<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ITitlesResponse, useTitleAPI } from 'src/composables/title-api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const $q = useQuasar();

const search = ref<string>('');

const handleSearchClick = () => {
  console.log('suka');
  fastSearchTitle();
};

const fastSearchTitle = async (): Promise<void> => {
  $q.loading.show();

  const res = await useTitleAPI<ITitlesResponse>('title/search', {
    search: search.value,
    limit: 1,
  });
  $q.loading.hide();
  console.log(res);
  if (res?.list?.length) {
    router.push(`/title/${res.list[0].code}`)
  }
};
</script>
<template>
  <q-input outlined v-model="search" placeholder="Быстрый поиск">
    <template v-slot:append>
      <q-btn @click="handleSearchClick" round dense flat icon="search" />
    </template>
  </q-input>
</template>
