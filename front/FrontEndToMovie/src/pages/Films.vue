<template>
    <div>
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
                <h3>Поиск фильма</h3>
                <form>
                    <label>Название
                        <input size="30" type="text" v-model="searchFilm.title">
                    </label>
                    <label>Год
                        <input size="7" type="text" v-model="searchFilm.year">
                    </label>
                    <label>Жанр
                        <input size="15" type="text" v-model="searchFilm.genre">
                    </label>
                    <label>
                        Страна
                        <input size="15" type="text" v-model="searchFilm.country">
                    </label>
                    <label>
                        Дата выхода
                        <input size="5" type="Date" v-model="searchFilm.release">
                    </label>
                    <label>
                        Бюджет
                        <input size="9" type="text" v-model="searchFilm.budget">
                    </label><br>
                    <input type="button" value="Найти"
                           @click="findFilm">
                </form>
                </div>
            </div>
            <div class="form">
            <table class="tab">
                <th>
                <td class="id">Id</td>
                <td class="title">Название</td>
                <td class="year">Год</td>
                <td class="genre">Жанр</td>
                <td class="country">Страна</td>
                <td class="release">Дата выхода</td>
                <td class="budget">Бюджет</td>
                <td class="options"></td>
                </th>
                <tr v-for="film in films">
                    <div v-if="update === film.id">
                        <td class="id">{{film.id}}</td>
                        <td class="title">
                            <input size="30" type="text" v-model="film.title">
                        </td>
                        <td class="year">
                            <input size="7" type="text" v-model="film.year">
                        </td>
                        <td class="genre">
                            <input size="15" type="text" v-model="film.genre">
                        </td>
                        <td class="country">
                            <input size="15" type="text" v-model="film.country">
                        </td>
                        <td class="release">
                            <input size="5" type="Date" v-model="film.release">
                        </td>
                        <td class="budget">
                            <input size="9" type="text" v-model="film.budget">
                        </td>
                        <td class="options">
                            <input type="button" value="Сохранить"
                                   @click="updateFilm(film.id, film.title, film.year, film.genre, film.country, film.release, film.budget)">
                        </td>
                    </div>
                    <div v-else>
                        <td class="id">{{film.id}}</td>
                        <td class="title">{{film.title}}</td>
                        <td class="year">{{film.year}}</td>
                        <td class="genre">{{film.genre}}</td>
                        <td class="country">{{film.country}}</td>
                        <td class="release">{{film.release}}</td>
                        <td class="budget">{{film.budget}}</td>
                        <td class="options">
                            <input type="button" @click="edit(film.id)" value="Редактировать">&nbsp
                            <input type="button" @click="deleteFilm(film.id)" value="Удалить">
                        </td>
                    </div>
                </tr>
            </table>
            </div>
            <div class="add-director">
                <div class="form">
                    <h3>Добавление фильма</h3>
                <form>
                    <label>Название
                        <input size="30" type="text" v-model="newFilm.title">
                    </label>
                    <label>Год
                        <input size="7" type="text" v-model="newFilm.year">
                    </label>
                    <label>Жанр
                        <input size="15" type="text" v-model="newFilm.genre">
                    </label>
                    <label>
                        Страна
                        <input size="15" type="text" v-model="newFilm.country">
                    </label>
                    <label>
                        Дата выхода
                        <input size="5" type="Date" v-model="newFilm.release">
                    </label>
                    <label>
                        Бюджет
                        <input size="9" type="text" v-model="newFilm.budget">
                    </label><br>
                    <input type="button" value="Добавить"
                           @click="addFilm">
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import login from '../components/SearchComponents/Login'

    export default {
        components: {
            login
        },
        data() {
            return {
                films: [],
                url: "http://localhost:8080/api/films",
                authorization: localStorage.getItem("Authorization"),
                update: '',
                upFilm: {
                    title: '',
                    year: '',
                    genre: '',
                    country: '',
                    release: '',
                    budget: ''
                },
                newFilm: {
                    title: '',
                    year: '',
                    genre: '',
                    country: '',
                    release: '',
                    budget: ''
                },
                searchFilm: {
                    title: '',
                    year: '',
                    genre: '',
                    country: '',
                    release: '',
                    budget: ''
                }
            }
        },
        mounted() {
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                Authorization: this.authorization
            };
            this.getFilms();

        },
        methods: {
            edit(id) {
                this.update = id;
            },
            getFilms() {
                if (this.authorization != null) {
                    axios.get(this.url).then((response) => {
                        this.films = response.data;
                        this.films.forEach(function (film) {
                            film.year = film.year.substring(0, 4);
                            film.release = film.release.substring(0, 10);
                        });
                    });
                }
            },
            updateFilm(id, title, year, genre, country, release, budget) {

                this.upFilm.title = title;
                this.upFilm.year = year + "-01-01";
                this.upFilm.genre = genre;
                this.upFilm.country = country;
                this.upFilm.release = release;
                this.upFilm.budget = budget;
                axios.put(this.url, this.upFilm, {
                    params: {
                        filmId: id,
                    }
                });
                this.update = '';
            },

            deleteFilm(id) {
                axios.delete(this.url, {
                    params: {
                        filmId: id
                    }
                }).then(() => {
                    this.getFilms();
                })
            },

            addFilm() {
                this.newFilm.year = this.newFilm.year + "-01-01";
                axios.post(this.url, this.newFilm).then(() => {
                    this.getFilms();
                    this.newFilm.title = '';
                    this.newFilm.year = '';
                    this.newFilm.genre = '';
                    this.newFilm.country = '';
                    this.newFilm.release = '';
                    this.newFilm.budget = '';
                })
            },

            findFilm() {
                if (this.searchFilm.year !== '') {
                    this.searchFilm.year =  this.searchFilm.year + "-01-01";
                }
                axios.get(this.url, {
                    params: {
                        title: this.searchFilm.title,
                        year: this.searchFilm.year,
                        genre: this.searchFilm.genre,
                        country: this.searchFilm.country,
                        releaseDate: this.searchFilm.release,
                        budget: this.searchFilm.budget
                    }
                }).then((response) => {
                    this.films = response.data;
                    this.films.forEach(function (film) {
                        film.year = film.year.substring(0, 4);
                        film.release = film.release.substring(0, 10);
                    });
                    this.searchFilm.title = '';
                    this.searchFilm.year = '';
                    this.searchFilm.genre = '';
                    this.searchFilm.country = '';
                    this.searchFilm.release = '';
                    this.searchFilm.budget = '';
                })
            }
        }
    }
</script>

<style>
    .tab {
        border-collapse: collapse;
    }

    hr {
        background-color: #2aaacf;
    }

    .id {
        width: 50px;
    }

    .release {
        width: 180px;
    }

    .year {
        width: 80px;
    }

    .genre, .country {
        width: 150px;
    }

    .title {
        width: 270px;
    }

    .options {
        width: 220px;
    }

    .budget {
        width: 100px;
    }

    td {
        padding: 5px;
        border-bottom: 1px solid #2aaacf;
        text-align: left;
    }

    .content {
        margin: 50px auto;
        width: 1200px;
    }

    .login-modal {
        margin-left: 550px;
        margin-top: 10px;
        position: absolute;
    }

    login {
        text-align: center;
    }

    input {
        border-radius: 5px;
    }

    .add-director {
        margin-top: 15px;
    }
    a {
        font-size: 35px;
        margin-right: 30px;
    }

    label{
        font-size: 14px;
    }
    .form {
        padding: 5px;
        border: 1px solid #2aaacf;
        border-radius: 5px;
        margin-top: 10px;
    }
</style>