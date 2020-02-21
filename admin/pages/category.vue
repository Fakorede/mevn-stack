<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3">
        </div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align:center">Add a new Category</h2>
            <form>
              <!-- title input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Type</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="type"
                >
              </div>
              <!-- button -->
              <div
                class="a-spacing-top-large"
                style="margin-bottom: 50px;"
              >
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span
                      class="a-button-text"
                      @click="onAddCategory"
                    >Add category</span>
                  </span>
                </span>
              </div>
            </form>
            <hr>
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="category in categories"
                :key="category._id"
              >{{ category.type }}</li>
            </ul>
          </div>
        </div>
        <div class="col-sm-3">
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let { categories } = await $axios.$get(
        "http://localhost:4005/api/v1/categories"
      );

      return {
        categories
      };
    } catch (err) {}
  },
  data() {
    return {
      type: ""
    };
  },
  methods: {
    async onAddCategory() {
      try {
        let data = { type: this.type };

        let response = await this.$axios.$post(
          "http://localhost:4005/api/v1/categories",
          data
        );

        this.categories.push(data);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>