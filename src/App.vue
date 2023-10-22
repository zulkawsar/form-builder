<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-8">
        <form>
          <row>
            <button
              class="btn btn-primary"
              style="margin-bottom: 10px"
              type="button"
              @click="addSection"
            >
              Add Section
            </button>
          </row>

          <row v-if="forms.length === 0">
            <div class="empty-section">Please add Sections</div>
          </row>

          <template
            v-for="(eachFormObj, eachFormIndex) in forms"
            :key="`div-${eachFormIndex}`"
          >
            <div class="section-block">
              <div class="source">
                <div class="row">
                  <div class="col-8">
                    <input
                      placeholder="Please input section title"
                      v-model="eachFormObj.title"
                      class="form-control"
                    />
                  </div>
                  <div class="col-4">
                    <button
                      class="btn btn-danger"
                      type="button"
                      @click="deleteSection(eachFormIndex, eachFormObj.title)"
                    >
                      Delete Section
                    </button>
                  </div>
                </div>
              </div>
              <div class="meta">
                <div class="row">
                  <draggable
                    :list="eachFormObj.fields"
                    class="dragArea"
                    :group="{ name: 'formbuilder', pull: false, put: true }"
                    :sort="true"
                    ghost-class="sortable__ghost"
                  >
                    <template #item="{ element, index }">
                      <div
                        class="col-6 form__group"
                        v-bind="element"
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
                          <div class="btn-group btn-group-sm" role="group">
                            <button type="button" class="btn btn-danger">
                              Edit
                            </button>
                            <button
                              type="button"
                              class="btn btn-warning"
                              @click="deleteElement(index, eachFormObj.fields)"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </template>
                  </draggable>
                </div>
              </div>
            </div>
          </template>
        </form>
      </div>
      <div class="col-4">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Elements
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Properties
            </button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <elements />
          </div>
          <div
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <properties></properties>
          </div>
        </div>
      </div>
    </div>
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
      this.$store.commit("deleteForm", formIndex);
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
