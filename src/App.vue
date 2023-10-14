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
              >
                Add Section
              </el-button>
            </el-row>

            <el-row v-if="forms.length === 0">
              <div class="empty-section">Please add Sections</div>
            </el-row>

            <template
              v-for="(eachFormObj, eachFormIndex) in forms"
              :key="`div-${eachFormIndex}`"
            >
              <div class="section-block">
                <div class="source">
                  <el-row>
                    <el-col :span="18">
                      <el-input
                        placeholder="Please input section title"
                        v-model="eachFormObj.title"
                        style="width: 100%"
                      ></el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-button
                        type="danger"
                        round
                        style="float: right"
                        @click="deleteSection(eachFormIndex, eachFormObj.title)"
                      >
                        Delete Section
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
                <div class="meta">
                  <el-row>
                    <draggable
                      :list="eachFormObj.fields"
                      class="dragArea"
                      :group="{ name: 'formbuilder', pull: false, put: true }"
                      :sort="true"
                      ghost-class="sortable__ghost"
                    >
                      <template #item="{ field, index }">
                        <el-col
                          class="form__group"
                          v-bind="field"
                          :span="12"
                          :class="{ 'is--active': field === activeField }"
                        >
                          <span class="form__selectedlabel">{{
                            field.fieldType
                          }}</span>
                          <div @click="editElementProperties(field)">
                            <component
                              :is="field.fieldType"
                              :currentField="field"
                              class="form__field"
                            ></component>
                          </div>
                          <div class="form__actiongroup">
                            <el-button
                              circle
                              size="mini"
                              icon="el-icon-rank"
                              class="form__actionitem--move"
                            ></el-button>
                            <el-button-group class="form__actionlist">
                              <el-button
                                size="mini"
                                icon="el-icon-plus"
                                @click="
                                  cloneElement(index, field, eachFormObj.fields)
                                "
                                v-show="!field.isUnique"
                              ></el-button>
                              <el-button
                                size="mini"
                                icon="el-icon-delete"
                                @click="
                                  deleteElement(index, eachFormObj.fields)
                                "
                              ></el-button>
                            </el-button-group>
                          </div>
                        </el-col>
                      </template>
                    </draggable>
                  </el-row>
                </div>
              </div>
            </template>
          </el-form>
        </div>
      </el-main>

      <el-aside class="wrapper--sidebar" width="30%">
        <el-tabs type="border-card" v-model="activeTabForFields">
          <el-tab-pane name="elements" label="Elements">
            <elements />
          </el-tab-pane>

          <el-tab-pane name="properties" label="Properties">
            <properties></properties>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import { FormBuilder } from "@/components/form_elements/formbuilder";

export default {
  name: "Home",
  data() {
    return {
      sortElementOptions: FormBuilder.sortElementOptions,
    };
  },
  computed: {
    forms() {
      return this.$store.state.forms;
    },
    activeField() {
      return this.$store.state.activeField;
    },
    activeTabForFields: {
      get() {
        return this.$store.state.activeTabForFields;
      },
      set(value) {
        this.$store.state.commit("updateActiveTabForFields", value);
      },
    },
  },
  mounted() {
    console.log("form ->", this.$store.state.forms);
    console.log("activeField ->", this.$store.state.activeField);
  },
  components: FormBuilder.components,
  methods: {
    deleteElement(index, form) {
      FormBuilder.methods.deleteElement(index, form);
    },
    cloneElement(index, field, form) {
      FormBuilder.methods.cloneElement(index, field, form);
    },
    editElementProperties(field) {
      console.log("form ->", this.$store.state.forms);
      console.log("activeField ->", this.$store.state.activeField);
      FormBuilder.methods.editElementProperties(field);
    },
    addSection() {
      const formObj = {
        title: "",
        fields: [],
      };
      this.$store.commit("addForm", formObj);
    },
    deleteSection(formIndex, formTitle) {
      this.$confirm(
        `Are you sure to delete the section ${formTitle}?`,
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(() => {
        this.$store.commit("deleteForm", formIndex);
      });
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
