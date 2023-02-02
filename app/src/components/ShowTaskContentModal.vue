<script setup lang="ts">
import { defineExpose, ref} from "vue";
import type { Ref } from "vue";
import { Modal } from 'bootstrap';
import { Task } from "@/models/task";

const modalId = 'showTaskContentModal';
let modal: any;

/* モーダル表示実装側でこの関数を参照してください */
const openModal: Ref<(task: Task)=> void> = ref((task) => {
  setDefaultValues(task);
  modal = new Modal(document.getElementById(modalId) as HTMLElement);
  modal.show();
});

defineExpose({openModal});

const title: Ref<string>   = ref('');
const content: Ref<string> = ref('');

function setDefaultValues(task: Task): void{
  title.value   = task.title;
  content.value = task.content;
}

function closeModal(): void{
  modal.hide();
}

</script>

<template>
  <div class="showTaskContentModal">
    <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header ms-5">
            <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body ms-5 me-5">
            <div class="col-12 text-start">content</div>
            <div class="col-12 text-start">{{content}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>