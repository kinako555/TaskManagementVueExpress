<script setup lang="ts">
import { ref, defineEmits } from "vue";
import type { Ref } from "vue";
import { axiosIncludedIdToken as axios } from '../services/axiosIncludedIdToken';
import { Task } from "@/models/task";

const emits = defineEmits(['setTasks']);

const searchWord: Ref<string> = ref('');

/* 検索ワードが空の場合は全件取得する */
function submit(): void {
  const queryParameter: string = formatQueryParameter(searchWord.value);
  axios.get('/tasks'+queryParameter)
  .then((res) => {
    const tasks: Map<number, Task> = new Map<number, Task>();
    //ObjectからMap<number, Task>への変換
    Object.keys(res.data.tasks).forEach((id: string) => { tasks.set(Number(id), new Task(res.data.tasks[id])) });
    emits( 'setTasks', tasks);
  }).catch((error) =>{
    console.error(error.code + ": " + error.message);
    alert('エラーが発生しました。プラウザをリロードしてください');
  });
}

/* searchWordが空の場合はクエリパラメータを付与しない */
function formatQueryParameter(searchWord: string): string {
  if (searchWord == '') return '';
  return '?title='+searchWord;
}
</script>

<template>
  <div class="taskSearchTextBox">
    <div class="input-group w-50 m-auto">
      <input type="text" class="form-control" placeholder="title" v-model="searchWord">
      <button class="btn btn-outline-success" type="button" id="button-addon2" @click="submit"><i class="fas fa-search"></i> </button>
    </div>
  </div>
</template>