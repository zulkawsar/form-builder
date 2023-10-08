import TextInput from '@/components/form_elements/FormElementTextInput.vue';
import { reactive, ref } from 'vue';
import Draggable from 'vuedraggable';

export const FormBuilder = reactive({
  components: {
    Draggable,
    TextInput,
  },
  fields: ref([
    {
      fieldType: 'TextInput',
      label: 'Text',
      text: 'Text',
      group: 'form',
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
      prepend: '',
      append: '',
      maxlength: 10,
      showWordLimit: false,
    },
  ]),
  sortElementOptions: {
    group: {
      name: 'formbuilder',
      pull: false,
      put: true,
    },
    sort: true,
  },
  dropElementOptions: {
    group: {
      name: 'formbuilder',
      pull: 'clone',
      put: false,
    },
    sort: false,
    filter: ".is-disabled",
  },
});
