<template>
    <div>
        <form>
            <h1>Удаление режиссера по Id</h1>
            <label>
                Id
                <input type="text" v-model="id">
            </label>
            <input type="button" @click="addDirector" value="Удалить">
        </form>
        <div>{{info}}</div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                id: '',
                info: ''
            };
        },
        methods: {
            addDirector () {
                this.info = '';
                axios.delete('http://localhost:8080/api/directors', {
                        params: {
                            directorId: this.id
                        },
                    headers: {
                        "Authorization" : localStorage.getItem("Authorization")
                    }
                }).then(() => {
                    this.info = "Режиссер удален"
                }).catch(() => {
                    this.info = "Ошибка: Режиссер не найден"});
            }
        }
    }
</script>
<style>
    label {
        padding: 5px;
    }
</style>
