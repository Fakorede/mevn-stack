<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3">
        </div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align:center">Profile Page</h2>
            <form>
              <!-- name -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Name</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="name"
                  :placeholder="$auth.$state.user.name"
                >
              </div>
              <!-- email  -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Email</label>
                <input
                  type="email"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="email"
                  :placeholder="$auth.$state.user.email"
                >
              </div>
              <!-- password -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Password</label>
                <input
                  type="password"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="password"
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
                      @click="onUpdateProfile"
                    >Update Profile</span>
                  </span>
                </span>
              </div>
            </form>
            <hr>
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
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async onUpdateProfile() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        };

        let response = await this.$axios.$put("/api/v1/auth/user", data);

        if (response.success) {
          (this.name = ""), (this.email = ""), (this.password = "");

          await this.$auth.fetchUser();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>