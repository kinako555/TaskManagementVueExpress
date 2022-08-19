<script setup lang="ts">
import { defineExpose, defineProps, ref, defineEmits } from "vue";
import type { Ref } from "vue";
import { axiosIncludedIdToken as axios } from '../services/axiosIncludedIdToken';
import { Modal } from 'bootstrap';
import { Form, Field, ErrorMessage } from 'vee-validate';

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
            <div class="modal-header ms-5">
              <h5 class="modal-title" id="staticBackdropLabel">add task</h5>
              <button type="reset" class="btn-close" aria-label="Close" @click="closeModal"></button>
            </div>
            <div class="modal-body ms-5 me-5">
              <label class="col-12 text-start">title</label>
              <Field name="title" class="col-12" type="text" v-model="title" maxlength="50" rules="required"/>
              <ErrorMessage name="title" class="text-danger col-12"/>
              <label class="col-12 text-start">status</label>
              <select class="col-12" v-model="taskStatusId">
                <option v-for="ts in taskStatus" :key="ts.id" :value="ts.id">{{ts.name}}</option>
              </select>
              <label class="col-12 text-start">start date</label>
              <Field name="startDate" class="col-12" type="date" v-model="startDate"/>
              <label class="col-12 text-start">end date</label>
              <Field name="endDate" class="col-12" type="date" v-model="endDate" rules="endDateValidate:@startDate"/>
              <ErrorMessage name="endDate" class="text-danger col-12"/>
              <label class="col-12 text-start">content</label>
              <textarea class="col-12" v-model="content" maxlength="255"></textarea>
            </div>
            <div class="modal-footer ms-5 me-5">
              <span class="col-12">
                <button type="submit" class="btn btn-primary w-100">add</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>