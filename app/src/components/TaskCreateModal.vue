<script setup lang="ts">
import { defineExpose, defineProps, ref, defineEmits } from "vue";
import type { Ref } from "vue";
import { axiosIncludedIdToken as axios } from '../services/axiosIncludedIdToken';

const modalId = "createTaskModal";
defineExpose({modalId});

defineProps(['taskStatus']);
const emit = defineEmits(['addTask']);

const title: Ref<string> = ref('');
const taskStatusId: Ref<string> = ref('');
const startDate: Ref<Date|null> = ref(null);
const endDate: Ref<Date|null> = ref(null);
const content: Ref<string> = ref('');

function submit(){
  const formData = {
    title: title,
    taskStatusId: taskStatusId,
    startDate: startDate,
    endDate: endDate,
    content: content
  };
  axios.post('/tasks/create', formData).then((res) => {
    console.log('create task');
    emit('addTask', res.data.createdTask);
  }).catch((error) => {
    console.error(error);
    alert('登録に失敗しました プラウザをリロードしてください');
  });
}

</script>

<template>
  <div class="taskCreateModal">
    <div :id="modalId" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">add task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label>title</label><br/>
            <input type="text" v-model="title"><br/>
            <select v-model="taskStatusId">
              <option v-for="ts in taskStatus" :key="ts.id" :value="ts.id">{{ts.name}}</option>
            </select>
            <label>start date</label><br/>
            <input type="date" v-model="startDate"><br/>
            <label>end date</label><br/>
            <input type="date" v-model="endDate"><br/>
            <label>content</label><br/>
            <textarea v-model="content"></textarea><br/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="submit">add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>