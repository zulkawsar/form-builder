<template>
  <div class="row">
    <el-row>
      <el-button style="margin-bottom: 10px" type="primary" @click="addSection"
        >Add Section</el-button
      >
    </el-row>
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="cloneDog"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable
        class="dragArea list-group"
        :list="list2"
        group="people"
        @change="log"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import { FormBuilder } from "@/components/form_elements/formbuilder";
let idGlobal = 8;
export default {
  name: "custom-clone",
  display: "Custom Clone",
  order: 3,
  components: FormBuilder.components,
  data() {
    return {
      list1: [
        {
          fieldType: "TextInput",
          name: "Text",
          text: "Text",
          group: "form",
          isRequired: false,
          isHelpBlockVisible: false,
          isPlaceholderVisible: true,
          isUnique: false,
          span: 8,
          labelWidth: 100,
          advancedOptions: true,
          showPassword: false,
          disabled: false,
          clearable: false,
          prepend: "",
          append: "",
          maxlength: 10,
          showWordLimit: false,
        },
        { name: "dog 2", id: 2 },
        { name: "dog 3", id: 3 },
        { name: "dog 4", id: 4 },
      ],
      list2: [
        { name: "cat 5", id: 5 },
        { name: "cat 6", id: 6 },
        { name: "cat 7", id: 7 },
      ],
    };
  },
  mounted() {
    console.log("form ->", this.$store.state.forms);
    console.log("activeField ->", this.$store.state.activeField);
  },
  methods: {
    addSection() {
      const formObj = {
        title: "",
        fields: [],
      };
      this.$store.commit("addForm", formObj);
      console.log(this.$store.state.forms);
    },
    log: function (evt) {
      window.console.log(evt);
    },
    cloneDog({ id }) {
      return {
        id: idGlobal++,
        name: `cat ${id}`,
      };
    },
  },
};
</script>
<style scoped></style>
