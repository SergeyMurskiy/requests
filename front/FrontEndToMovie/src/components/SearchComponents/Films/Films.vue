<template>
    <div>
        <form>
            <h1>Поиск фильмов</h1>
            <label>
                Название
                <input type="text" v-model="title">
            </label>
            <label>
                Год
                <input type="Date" v-model="year">
            </label>
            <label>
                Страна
                <input type="text" v-model="country">
            </label>
            <label>
                Жанр
                <input type="text" v-model="genre">
            </label>
            <label>
                Дата выхода
                <input type="date" v-model="releaseDate">
            </label>
            <label>
                Бюджет
                <input type="text" v-model="budget">
            </label>
            <input type="button" @click="getFilms" value="Поиск">
        </form>
        <div>
            <div v-for="film in films"> {{film.title}} {{film.country}}</div>
        </div>
        <div v-if="info">Режиссер не найден</div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                films:[],
                title: '',
                year: '',
                country: '',
                genre: '',
                releaseDate: '',
                budget: '',
                info: ''
            };
        },
        methods: {
            getFilms () {
                console.log(this.year)
                axios.get('http://localhost:8080/api/films', {
                    params: {
                        title: this.title,
                        year: this.year,
                        country: this.country,
                        genre: this.genre,
                        releaseDate: this.releaseDate,
                        budget: this.budget
                    }
                }).then((response) => {
                    console.log(response.data);
                    if (response.data.empty) {
                        this.info = true;
                    } else {
                        this.films = response.data;
                    }
                });
            }
        }
    }
</script>
<style>
    label {
        padding: 5px;
    }
</style>
