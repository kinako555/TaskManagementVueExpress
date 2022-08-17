<script setup lang="ts">
import { defineExpose, defineProps, ref, defineEmits } from "vue";
import type { Ref } from "vue";
import { axiosIncludedIdToken as axios } from '../services/axiosIncludedIdToken';
import { Modal } from 'bootstrap';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { taskValidates } from '../services/validates';

const modalId = 'createTaskModal';
let modal: any;

/* モーダル表示実装側でこの関数を参照してください */
const openModal: Ref<()=> void> = ref(() => {
  clearFormValues();
  modal = new Modal(document.getElementById(modalId) as HTMLElement);
  modal.show();
});

defineExpose({openModal});

defineProps(['taskStatus']);

const emit = defineEmits(['addTask']);

const notCompatibleTaskStatusId = '1'; // 「未対応」を初期表示する

const title: Ref<string>        = ref('');
const taskStatusId: Ref<string> = ref(notCompatibleTaskStatusId);
const startDate: Ref<Date|null> = ref(null);
const endDate: Ref<Date|null>   = ref(null);
const content: Ref<string>      = ref('');

function clearFormValues(): void{
  title.value        = '';
  taskStatusId.value = notCompatibleTaskStatusId;
  startDate.value    = null;
  endDate.value      = null;
  content.value      = '';
}

function closeModal(): void{
  modal.hide();
}

/* 第一引数は使用していないがvee validateの仕様のため設定 */
function submit(value: any, {resetForm}: any): void{
  const formData = {
    task: {
      title: title.value,
      taskStatusId: taskStatusId.value,
      startDate: startDate.value,
      endDate: endDate.value,
      content: content.value
    }
  };
  axios.post('/tasks/create', formData).then((res) => {
    console.log('create task');
    emit('addTask', res.data.createdTask);
    closeModal();
    resetForm();
  }).catch((error) => {
    console.error(error);
    alert('登録に失敗しました プラウザをリロードしてください');
  });
}

</script>

<template>
  <div class="taskCreateModal">
    <Form @submit="submit">
      <div :id="modalId" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">add task</h5>
              <button type="reset" class="btn-close" aria-label="Close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
                <label>title</label><br/>
                <Field name="title" type="text" v-model="title" maxlength="50" :rules="taskValidates.titleValidates"/><br/>
                <ErrorMessage name="title" class="text-danger"/>
                <label>status</label><br/>
                <select v-model="taskStatusId">
                  <option v-for="ts in taskStatus" :key="ts.id" :value="ts.id">{{ts.name}}</option>
                </select><br/>
                <label>start date</label><br/>
                <Field name="startDate" type="date" v-model="startDate"/><br/>
                <label>end date</label><br/>
                <Field name="endDate" type="date" v-model="endDate" rules="endDateValidate:@startDate"/><br/>
                <ErrorMessage name="endDate" class="text-danger"/>
                <label>content</label><br/>
                <textarea v-model="content" maxlength="255"></textarea><br/>
            </div>
            
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">add</button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>