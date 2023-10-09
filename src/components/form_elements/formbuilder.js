import TextInput from '@/components/form_elements/FormElementTextInput.vue';
import { reactive, ref } from 'vue';
import draggable from 'vuedraggable';

export const FormBuilder = reactive({
  components: {
    draggable,
    TextInput,
  }
});
