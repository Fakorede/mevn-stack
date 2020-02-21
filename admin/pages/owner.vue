<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3">
        </div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align:center">Add a new Owner</h2>
            <form>
              <!-- name input -->
              <div class="a-spacing-top-medium">
                <label>Name</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="name"
                >
              </div>
              <!-- about input -->
              <div class="a-spacing-top-medium">
                <label>About</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="about"
                >
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
                      @click="onAddOwner"
                    >Add owner</span>
                  </span>
                </span>
              </div>
            </form>
            <hr>
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="owner in owners"
                :key="owner._id"
              >{{ owner.name }}</li>
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
      let { owners } = await $axios.$get("http://localhost:4005/api/v1/owners");

      return {
        owners
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      name: "",
      about: "",
      selectedFile: null,
      fileName: ""
    };
  },
  methods: {
    onFileSelected(e) {
      this.selectedFile = e.target.files[0];
      this.fileName = e.target.files[0].name;
    },
    async onAddOwner() {
      try {
        let data = new FormData();
        data.append("name", this.name);
        data.append("about", this.about);
        data.append("photo", this.selectedFile, this.selectedFile.name);

        let response = await this.$axios.$post(
          "http://localhost:4005/api/v1/owners",
          data
        );

        this.owners.push({ name: this.name });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>