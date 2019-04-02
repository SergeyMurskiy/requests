<template>
    <div class="login">
        <form>
            <input type="text" placeholder="Логин" v-model="username"><br>
            <input type="password" placeholder="Пароль" v-model="password"><br>
            <input type="button" value="Войти" @click="login">
        </form>
        <div>{{info}}</div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                username: '',
                password: '',
                info: ''
            }
        },
        methods: {
            login() {
                this.info = ''
                axios.get("http://localhost:8080/login", {
                    params: {
                        username: this.username,
                        password: this.password
                    }
                }).then((response) => {
                    localStorage.setItem("Authorization", response.headers.authorization);
                    this.info = "Добро пожаловать! Перезагрузите страницу";
                    // axios.get("http://localhost:8080/api/account/" + this.username, {
                    //     headers: {
                    //         "Authorization": localStorage.getItem("Authorization")
                    //     }
                    // })
                }).catch((e) => {
                    this.info = "Неверное имя пользователя или пароль";
                })
            }
        }
    }
</script>

<style scoped>
    .login {
        margin-top: 50px;
        text-align: center;
    }
</style>