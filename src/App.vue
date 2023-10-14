<template>
  <div>
    <el-container>
      <el-main class="el-main-left">
        <div class="wrapper--forms">
          <el-form>
            <el-row>
              <el-button
                style="margin-bottom: 10px"
                type="primary"
                @click="addSection"
                >Add Section</el-button
              >
            </el-row>
            <template v-if="show">
              <div class="col-3">
                <h3>Draggable 2</h3>
                <draggable
                  class="dragArea list-group"
                  :list="list2"
                  group="formbuilder"
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
            </template>
          </el-form>
        </div>
      </el-main>

      <el-aside class="wrapper--sidebar" width="30%">
        <el-tabs type="border-card" v-model="activeTabForFields">
          <el-tab-pane name="elements" label="Elements">
            <div class="col-3">
              <elements />
            </div>
          </el-tab-pane>

          <el-tab-pane name="properties" label="Properties"> </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
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
      list2: [
        { name: "cat 5", id: 5 },
        { name: "cat 6", id: 6 },
        { name: "cat 7", id: 7 },
      ],
      show: true,
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
