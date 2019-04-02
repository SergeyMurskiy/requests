<template>
  <!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
  <div v-show="showLoginModal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="card border-0 shadow bg-secondary centre">
          <div class="card-header pb-5 bg-white">
            <div class="text-muted text-center mb-3">
              <small>Sign in with</small>
            </div>
            <div class="btn-wrapper text-center">
              <button type="button" class="btn btn-icon btn-neutral"
                      onClick="window.location='http://github.com'">
                                            <span class="btn-inner--icon">
                                                <img src="img/icons/common/github.svg">
                                            </span>
                <span class="btn-inner--text">Github</span>
              </button>
              <button type="button" class="btn btn-icon btn-neutral"
                      onclick="window.location='https://accounts.google.com/signin/v2/identifier?hl=ru&continue=https%3A%2F%2Fwww.google.com%2F&flowName=GlifWebSignIn&flowEntry=AddSession'">
                                            <span class="btn-inner--icon">
                                                <img src="img/icons/common/google.svg">
                                            </span>
                <span class="btn-inner--text">Google</span>
              </button>
            </div>
          </div>
          <div class="card-body px-lg-5 py-lg-5 bg-white">
            <div class="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <div id="form">
              <form>
                <div class="form-group input-group input-group-alternative">
                  <div class="input-group-prepend">
                                                <span class="input-group-text">
                                                    <i class="ni ni-email-83"></i>
                                                </span>
                  </div>
                  <input aria-describedby="addon-right addon-left" placeholder="Email"
                         class="form-control" v-model="username">
                </div>
                <div class="form-group input-group input-group-alternative">
                  <div class="input-group-prepend">
                                                <span class="input-group-text">
                                                    <i class="ni ni-lock-circle-open"></i>
                                                </span>
                  </div>
                  <input aria-describedby="addon-right addon-left" type="password"
                         placeholder="Password" class="form-control" v-model="password">
                </div>
                <div class="custom-control custom-checkbox">
                  <input id="iVDxtqc" type="checkbox" class="custom-control-input">
                  <label for="iVDxtqc" class="custom-control-label">Remember me</label>
                </div>
                <div class="text-center">
                  <button type="button" @click="loginForm" class="btn my-4 btn-primary">Sign In</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button btn btn-icon btn-neutral" @click="showLoginModal = false">
              X
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue"
export default {
  components: {
    Modal
  },
  data() {
    return {
      showLoginModal: false,
      username: '',
      password: ''
    };
  },
  methods: {
    loginForm() {
      axios.get('http://localhost:8080/login', {
        params: {
          username : this.username,
          password : this.password
        }
      }).then(function (response) {
        this.authorization = response.headers.authorization;
        localStorage.setItem("Authorization", authorization);
      });
    }
}
}
</script>

<style>
</style>