import Vue from 'vue';

import draggable from 'vuedraggable';

import TextInput from '@/components/form_elements/FormElementTextInput';

export const FormBuilder = new Vue({
    components: {
      draggable,
      TextInput,
    },
    data() {
      return {
        fields: [{
            fieldType: 'TextInput',
            label: 'Text',
            text: 'Text',
            group: 'form', //form group
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
            showWordLimit: false
          }
        ],
  
        sortElementOptions: {
          group: {
            name: 'formbuilder',
            pull: false,
            put: true
          },
          sort: true
        },
  
        dropElementOptions: {
          group: {
            name: 'formbuilder',
            pull: 'clone',
            put: false
          },
          sort: false,
          filter: ".is-disabled"
        }
      }
    },
  });