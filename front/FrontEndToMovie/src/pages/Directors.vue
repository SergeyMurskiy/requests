<template>
    <div class="directors">
        <div v-if="authorization === null" class="login-modal">
            <h2>Необходима авторизация</h2>
            <login></login>
        </div>
        <div class="content" v-else>
            <div>
                <div>
                    <a href="/films">Фильмы</a>
                    <a href="/directors">Режиссеры</a>
                </div>
                <div class="form">
                <h3>Поиск режиссера</h3>
                <form>
                    <label>
                        Имя
                        <input type="text" v-model="searchDirector.name">
                    </label>
                    <label>
                        Страна
                        <input type="text" v-model="searchDirector.country">
                    </label>
                    <input type="button" value="Найти" @click="findDirector">
                </form>
                </div>
            </div>
            <div class="form">
            <table>
                <th>
                    <td>Id</td>
                    <td>Имя</td>
                    <td>Страна</td>
                    <td></td>
                </th>
                <tr v-for="director in directors">
                    <div v-if="update === director.id">
                        <td>{{director.id}}</td>
                        <td>
                            <input type="text" v-model="director.name">
                        </td>
                        <td>
                            <input type="text" v-model="director.country">
                        </td>
                        <td>
                            <input type="button" value="Сохранить"
                                   @click="updateDirector(director.id, director.name, director.country)">
                        </td>
                    </div>
                    <div v-else>
                        <td>{{director.id}}</td>
                        <td>{{director.name}}</td>
                        <td>{{director.country}}</td>
                        <td>
                            <input type="button" @click="edit(director.id)" value="Редактировать">&nbsp
                            <input type="button" @click="deleteDirector(director.id)" value="Удалить">
                        </td>
                    </div>
                </tr>
            </table>
            </div>
            <div class="form">
            <div class="add-director">
            <h3>Добавление режиссера</h3>
            <form>
                <label>
                    Имя
                    <input type="text" v-model="newDirector.name">
                </label>
                <label>
                    Страна
                    <input type="text" v-model="newDirector.country">
                </label>
                <input type="button" value="Добавить" @click="addDirector">
            </form>
            </div></div>
        </div>
    </div>
</template>

<script>
    import Login from '../components/SearchComponents/Login'
    import axios from 'axios'

    export default {
        components: {
            Login
        },
        data() {
            return {
                directors: [],
                newDirector: {
                    name: '',
                    country: ''
                },
                upDirector: {
                    name: '',
                    country: ''
                },
                searchDirector: {
                    name: '',
                    country: ''
                },
                authorization: localStorage.getItem("Authorization"),
                url: 'http://localhost:8080/api/directors',
                update: '',
            }
        },
        mounted() {
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                Authorization: this.authorization
            };
            this.getDirectors();
        },
        methods: {
            findDirector() {
                axios.get(this.url, {
                    params: {
                        name: this.searchDirector.name,
                        country: this.searchDirector.country
                    }
                }).then((response) => {
                    this.directors = response.data;
                    this.searchDirector.name = '';
                    this.searchDirector.country = ''
                })
            },

            edit(id) {
                this.update = id;
            },

            updateDirector(id, name, country) {
                this.upDirector.name = name;
                this.upDirector.country = country;
                axios.put(this.url, this.upDirector, {
                    params: {
                        directorId: id,
                    }
                });
                this.update = '';
            },

            deleteDirector(id) {
                axios.delete(this.url, {
                    params: {
                        directorId: id
                    }
                }).then(() => {
                    this.getDirectors();
                })
            },

            addDirector() {
                axios.post(this.url, this.newDirector).then(() => {
                    this.getDirectors();
                    this.newDirector.name = '';
                    this.newDirector.country = ''
                })
            },

            getDirectors() {
                if (this.authorization != null) {
                    axios.get(this.url).then((response) => {
                        this.directors = response.data;
                    })
                }
            },

        }
    }
</script>

<style>
    .directors table {
        border-collapse: collapse;
    }

    .directors hr {
        background-color: #2aaacf;
    }

    .directors td {
        padding: 10px;
        border-bottom: 1px solid #2aaacf;
        width: 250px;
    }

    .directors .content {
        margin: 50px auto;
        width: 1000px;

    }

    .directors .login-modal {
        margin-left: 550px;
        margin-top: 10px;
        position: absolute;
    }

    .directors input {
        border-radius: 5px;
    }

    .directors .add-director {
        margin-top: 15px;
    }

    a {
        font-size: 35px;
        margin-right: 30px;
    }

</style>