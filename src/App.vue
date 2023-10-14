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
                      <template #item="{ element, index }">
                        <el-col
                          class="form__group"
                          v-bind="element"
                          :span="12"
                          :class="{ 'is--active': element === activeField }"
                        >
                          <span class="form__selectedlabel">{{
                            element.fieldType
                          }}</span>
                          <div @click="editElementProperties(element)">
                            <component
                              :is="element.fieldType"
                              :currentField="element"
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
                            <el-button-group class="ml-4">
                              <el-button type="primary" round> Edit</el-button>
                              <el-button
                                type="primary"
                                round
                                @click="
                                  deleteElement(index, eachFormObj.fields)
                                "
                                >Delete</el-button
                              >
                            </el-button-group>

                            <el-button-group class="form__actionlist">
                              <el-button
                                size="mini"
                                icon="el-icon-plus"
                                @click="
                                  cloneElement(
                                    index,
                                    element,
                                    eachFormObj.fields
                                  )
                                "
                                v-show="!element.isUnique"
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
      this.$store.commit("deleteFormElement", { form, index });
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

<style>
.empty-section {
  text-align: center;
  font-size: 40px;
  background: linear-gradient(to bottom, #fff, #409eff);
  -webkit-text-fill-color: transparent;
}

.dragArea {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  min-height: 10px;
  height: calc(30vh);
  z-index: 2;
}

.el-main-left {
  height: calc(90vh);
}

.form__selectedlabel {
  display: none;
  background: #ecf5ff;
  padding: 3px 5px;
  color: black;
  font-size: 10px;
  position: absolute;
  top: -17px;
  right: 15px;
}

.form__actionitem--move {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  visibility: hidden;

  &:active,
  &:focus,
  &:hover {
    border-color: #409eff;
    background: #ecf5ff;
  }
}

.form__actionlist {
  position: absolute;
  margin-top: 10px;
  visibility: hidden;
  z-index: 3;
  right: 0;
  border-radius: 2px;
}

.form__group {
  margin-bottom: 25px;
  border: 1px solid transparent;
  position: relative;

  &:hover {
    border-color: #409eff;

    .form__actionitem--move {
      visibility: visible;
    }
  }

  &.is--active {
    border-color: #409eff;
    background: #ecf5ff;

    .form__actionlist {
      visibility: visible;
    }
    .form__selectedlabel {
      display: inline-block;
    }
  }
}

.section-block {
  border: 1px solid #ebebeb;
  border-radius: 3px;
}

.section-block .source {
  padding: 10px;
}

.section-block .meta {
  background-color: #fafafa;
  border-top: 1px solid #eaeefb;
}
</style>
