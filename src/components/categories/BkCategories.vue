<template>
  <div>
    <div class="columns">
      <div class="column is-9">
        <h1 class="title">Categories</h1>
      </div>
      <div class="column">
        <div class="is-flex is-justify-content-flex-end">
          <b-button @click="onCategory(false)" type="is-primary"
            >Add Category</b-button
          >
        </div>
      </div>
    </div>
    <b-table striped :data="categories">
      <b-table-column
        field="id"
        label="ID"
        width="40"
        numeric
        v-slot="{ index }"
      >
        {{ index + 1 }}
      </b-table-column>
      <b-table-column field="title" label="Title" v-slot="props">
        {{ props.row.title }}
      </b-table-column>
      <b-table-column field="action" label="Edit/Delete" v-slot="{ row }">
        <b-button
          @click="onCategory(true, row)"
          class="mr-2"
          type="is-info"
          size="is-small"
          ><font-awesome-icon icon="fa-solid fa-pen-to-square"
        /></b-button>
        <b-button @click="onDelete(row._id)" type="is-danger" size="is-small"
          ><font-awesome-icon icon="fa-solid fa-trash"
        /></b-button>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CategoryForm from "./CategoryForm.vue";
import { categoryService } from "@/_services/category.service";
export default {
  name: "BkCategories",
  data() {
    return {
      deleteId: "",
    };
  },
  computed: {
    ...mapGetters("category", ["categories"]),
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions("category", ["fetchCategories"]),
    onCategory(isEdit = false, item = {}) {
      this.$buefy.modal.open({
        parent: this,
        component: CategoryForm,
        hasModalCard: true,
        canCancel: false,
        props: {
          isEdit,
          item,
        },
        events: {
          fetch: () => {
            this.fetchCategories();
          },
        },
      });
    },
    onDelete(id) {
      this.$buefy.dialog.confirm({
        title: "Deleting category",
        message: "Are you sure you want to <b>delete</b> this category?",
        confirmText: "Delete category",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          try {
            await categoryService.delete(id);
            this.$buefy.toast.open({
              message: "Category deleted!",
              type: "is-success",
            });
            this.fetchCategories();
          } catch (err) {
            console.log(err);
          }
        },
      });
    },
  },
};
</script>

<style lang="scss">
.is-full {
  width: 100%;
}
</style>
