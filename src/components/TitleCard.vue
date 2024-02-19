<template>
  <q-card style="width: 280px; height: 452px">
    <q-img
      style="height: 400px; width: 280px"
      :src="poster"
    >
      <div class="absolute-bottom">
        <div class="text-h6">{{ titleName }}</div>
        <div class="text-subtitle2">{{ titleType }}</div>
      </div>
    </q-img>
    <q-card-actions>
      <q-btn flat>Смотреть</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script setup lang="ts">


interface ICardTitleProps {
    poster: string;
    titleName: string;
    titleType: string; 
}

defineProps<ICardTitleProps>()
</script>
