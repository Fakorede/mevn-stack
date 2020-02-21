<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align:center">Add a new Product</h2>
            <form>
              <!-- category dropdown -->
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select
                  class="a-select-option"
                  v-model="categoryID"
                >
                  <option
                    v-for="category in categories"
                    :key="category._id"
                    :value="category._id"
                  >{{ category.type }}</option>
                </select>
              </div>
              <!-- owner dropdown -->
              <div class="a-spacing-top-medium">
                <label>Owner</label>
                <select
                  class="a-select-option"
                  v-model="ownerID"
                >
                  <option
                    v-for="owner in owners"
                    :key="owner._id"
                    :value="owner._id"
                  >{{ owner.name }}</option>
                </select>
              </div>
              <!-- title input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Title</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="title"
                >
              </div>
              <!-- price input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Price</label>
                <input
                  type="number"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="price"
                >
              </div>
              <!-- stock quantity input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Stock Quantity</label>
                <input
                  type="number"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="stockQuantity"
                >
              </div>
              <!-- description text -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Description</label>
                <textarea
                  placeholder="Provide details such as a product description"
                  style="width: 100%"
                  v-model="description"
                ></textarea>
              </div>
              <!-- photo file input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Add Photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input
                      type="file"
                      @change="onFileSelected"
                    >
                    <p style="margin-top: -70px">{{ fileName }}</p>
                  </label>
                </div>
              </div>
              <hr>
              <!-- button -->
              <div
                class="a-spacing-top-large"
                style="margin-bottom: 50px;"
              >
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span
                      class="a-button-text"
                      @click="onAddProduct"
                    >Add product</span>
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>


<script>
export default {
  async asyncData({ $axios }) {
    try {
      let categories = $axios.$get("http://localhost:4005/api/v1/categories");
      let owners = $axios.$get("http://localhost:4005/api/v1/owners");

      const [categoryResponse, ownerResponse] = await Promise.all([
        categories,
        owners
      ]);

      console.log(categoryResponse.categories);
      console.log(ownerResponse.owners);

      return {
        categories: categoryResponse.categories,
        owners: ownerResponse.owners
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      categoryID: null,
      ownerID: null,
      title: "",
      description: "",
      price: 0,
      stockQuantity: 1,
      selectedFile: null,
      fileName: ""
    };
  },
  methods: {
    onFileSelected(e) {
      this.selectedFile = e.target.files[0];
      console.log(this.selectedFile);
      this.fileName = e.target.files[0].name;
    },
    async onAddProduct() {
      let data = new FormData();
      data.append("categoryID", this.categoryID);
      data.append("ownerID", this.ownerID);
      data.append("title", this.title);
      data.append("description", this.description);
      data.append("price", this.price);
      data.append("stockQuantity", this.stockQuantity);
      data.append("photo", this.selectedFile, this.selectedFile.name);

      let result = await this.$axios.$post(
        "http://localhost:4005/api/v1/products",
        data
      );

      this.$router.push("/");
    }
  }
};
</script>