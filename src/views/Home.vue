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
                      <el-col
                        v-for="(field, index) in eachFormObj.fields"
                        :key="index"
                        :span="field.span"
                        class="form__group"
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
                              @click="deleteElement(index, eachFormObj.fields)"
                            ></el-button>
                          </el-button-group>
                        </div>
                      </el-col>
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
            <properties
              v-show="activeField && Object.keys(activeField).length > 0"
            ></properties>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
// Home.vue
import { ref, computed } from "vue";
import { FormBuilder } from "@/components/form_elements/formbuilder";
import { useStore } from "vuex"; // Import useStore from Vuex

export default {
  name: "Home",
  setup() {
    const store = useStore(); // Use useStore to access the store

    const forms = computed(() => store.state.forms);
    const activeField = computed(() => store.state.activeField);

    const sortElementOptions = ref(FormBuilder.sortElementOptions);

    const activeTabForFields = computed({
      get() {
        return store.state.activeTabForFields;
      },
      set(value) {
        store.commit("setActiveTabForFields", value);
      },
    });

    const addSection = () => {
      const formObj = {
        title: "",
        fields: [],
      };
      store.commit("addForm", formObj);
    };

    const deleteSection = (formIndex, formTitle) => {
      // Your delete section logic
      store.commit("deleteForm", formIndex);
    };

    // Other methods...

    return {
      forms,
      activeField,
      sortElementOptions,
      activeTabForFields,
      addSection,
      deleteSection,
      // Other properties...
    };
  },
};
</script>
