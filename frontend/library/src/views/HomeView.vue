
<template >
    <HeaderView />


    <div class="home-view  container">
        <div class="grid wide">
            <input type="text" id="name" v-model="search" @keyup="filteredList">

        </div>

        <div class="sections row top-10px">
                <template v-if="!this.search" v-for="(book, index) in books" :key="index">

                <button class="card" style="width: 300px;" data-toggle="modal" data-target="#exampleModalCenter"
                    @click="getbyid(book._id)">
                    <img class="card img-thumnail-padding" style="width: 260px ;height: 320px;" :src="path + book.image"
                        alt="..." data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <div class="card-body">
                        <p class="card-title ">{{ book.nameBook }} </p>
                        <p class="card-title">Mã sách:{{ book.idBook }} - vị trí: {{ book.shelf }}</p>
                    </div>
                </button>


                <div class="modal fade " id="exampleModalCenter" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog  modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title " id="exampleModalLongTitle">Tác Phẩm: {{ books_details.nameBook }}
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm" style="width: 290px;" data-toggle="modal"
                                            data-target="#exampleModalCenter">
                                            <img class="card-img-top img-fluid" style="width: 160px; height: 220;"
                                                :src="path + books_details.image" alt="..." data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop">
                                        </div>
                                        <div class="col-sm-7">
                                            <p class="card-title">Mã Sách- {{ books_details.idBook }}</p>
                                            <p class="card-title">Tác giả- {{ books_details.author }}</p>
                                            <p class="card-title">Thể loại- {{ books_details.typeBook }}</p>
                                            <p class="card-title">Vị trí- {{ books_details.shelf }}</p>
                                            <p class="card-title">Số lượng- {{ books_details.quantity }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="this.search" v-for="(book, index) in booksFilter" :key="index">

                <button class="card" style="width: 300px;" data-toggle="modal" data-target="#exampleModalCenter"
                    @click="getbyid(book._id)">
                    <img class="card img-thumnail-padding" style="width: 260px ;height: 320px;" :src="path + book.image"
                        alt="..." data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <div class="card-body">
                        <p class="card-title ">{{ book.nameBook }} </p>
                        <p class="card-title">Mã sách:{{ book.idBook }} - vị trí: {{ book.shelf }}</p>
                    </div>
                </button>


                <div class="modal fade " id="exampleModalCenter" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog  modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title " id="exampleModalLongTitle">Tác Phẩm: {{ books_details.nameBook }}
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm" style="width: 290px;" data-toggle="modal"
                                            data-target="#exampleModalCenter">
                                            <img class="card-img-top img-fluid" style="width: 160px; height: 220;"
                                                :src="path + books_details.image" alt="..." data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop">
                                        </div>
                                        <div class="col-sm-7">
                                            <p class="card-title">Mã Sách- {{ books_details.idBook }}</p>
                                            <p class="card-title">Tác giả- {{ books_details.author }}</p>
                                            <p class="card-title">Thể loại- {{ books_details.typeBook }}</p>
                                            <p class="card-title">Vị trí- {{ books_details.shelf }}</p>
                                            <p class="card-title">Số lượng- {{ books_details.quantity }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>

    <FooterView />
</template>

<script>
import axios from 'axios'
import staticPath from '../assets/staticPath';
import HeaderView from '../components/HeaderView.vue';
import FooterView from '../components/FooterView.vue';

export default {
    data() {
        return {
            books: [],
            books_details: {},
            input: '',
            search: '',
            booksFilter: []
        }
    },

    components: {
        HeaderView,
        FooterView
    },

    computed: {
        path() {
            return staticPath
        },
    },

    async created() {
        axios.get('http://localhost:8000/user')
            .then(res => {
                this.books = res.data.document;
                // console.log(books.idBook);
            })

            .catch(err => console.log(err));
        await this.assignValues()
        // console.log(this.booksFilter);
    },

    methods: {
        getbyid(id) {
            console.log(id);
            axios.get(`http://localhost:8000/user/books/${id}`)
                .then(res => {
                    this.books_details = res.data;
                    // console.log(this.books_details);
                })
                .catch(err => console.log(err));
        },
        assignValues() {
            this.booksFilter = [...this.books]
        },
        filteredList() {
            if (this.search == '')
                this.booksFilter = this.books
            else {
                this.booksFilter = this.books.filter(item => item.nameBook.toLowerCase().includes(this.search));
            }
            // console.log(this.booksFilter);
        },
    },
}

</script>


<style scoped>
.home-view {
    margin: auto;
    margin-top: 100px;
}

/* .card {
    display: inline-block;
    margin: 0 12px 8px;
} */

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
}

body {
    padding: 20px;
    min-height: 100vh;
    background-color: rgb(44, 85, 150);
}



input {
    display: block;
    width: 350px;
    margin: 20px auto;
    padding: 10px 45px;
    background: white no-repeat 15px center;
    background-size: 15px 15px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
    width: 350px;
    margin: 0 auto 10px auto;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.books {
    background-color: rgb(97, 62, 252);
    cursor: pointer;
}

.error {
    background-color: tomato;
}

.hide {
    display: none;
}
</style>
