import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faPenToSquare);
library.add(faTrash);
library.add(faUpload);

Vue.component("font-awesome-icon", FontAwesomeIcon);
