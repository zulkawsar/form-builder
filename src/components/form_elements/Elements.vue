<template>
  <div class="el-tabs__inner">
    <el-row :gutter="10" class="row-bg">
      <draggable
        :list="fields"
        :clone="clone"
        class="dragArea"
        :group="{ name: 'formbuilder', pull: 'clone', put: false }"
        :sort="true"
        item-key="index"
      >
        <template #item="{ element }">
          <el-col
            class="list-group-item"
            :span="12"
            :class="{ 'is-disabled': checkStopDragCondition(element) }"
          >
            <el-button class="button__sidebar">
              {{ element.text }}
            </el-button>
          </el-col>
        </template>
      </draggable>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { FormBuilder } from "@/components/form_elements/formbuilder";
import draggable from "vuedraggable";
import _ from "lodash";
export default {
  name: "Elements",
  components: {
    draggable,
  },
  setup() {
    const store = useStore(); // Use useStore to access the Vuex store
    const fields = ref(FormBuilder.fields);
    const forms = ref(store.state.forms);
    const dropElementOptions = ref(FormBuilder.dropElementOptions);

    const clone = (field) => _.cloneDeep(field);

    const checkStopDragCondition = (field) => {
      const formArray = forms.value.map((form) => form.fieldType);
      return _.includes(formArray, field.text) && field.isUnique;
    };
    onMounted(() => {
      console.log(store.state.forms);
      if (FormBuilder && FormBuilder.fields) {
        fields.value = FormBuilder.fields;
      }
    });
    return {
      fields,
      clone,
      checkStopDragCondition,
      dropElementOptions,
    };
  },
};
</script>

<style scoped></style>
