<template>
    <HeaderView></HeaderView>


    <div class="stored-books-view container">
        <div class="grid wide">
            <input type="text" id="name" v-model="search" @keyup="filteredList">
        </div>
        <table class="table table-bordered">
            <thead class="thead-dark">
                <tr class="text-uppercase">
                    <th scope="col-1">STT</th>
                    <th scope="col">idBook</th>
                    <th scope="col-3">nameBook</th>
                    <th scope="col-3">author</th>
                    <th scope="col-2">typeBook</th>
                    <th scope="col">shelf</th>
                    <th scope="col-2">quantity</th>
                    <th scope="col" colspan="2"></th>
                </tr>
            </thead>

            <tbody v-if="!this.search" v-for="(books, index) in books" :key="index">
                <tr class="text-justify">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ books.idBook }}</td>
                    <td>{{ books.nameBook }}</td>
                    <td>{{ books.author }}</td>
                    <td>{{ books.typeBook }}</td>
                    <td>{{ books.shelf }}</td>
                    <td>{{ books.quantity }}</td>
                    <!-- <td>{{ books._id }}</td> -->

                    <td>
                        <router-link :to="'/admin/books/' + books._id + '/edit'" class="btn btn-link">Sửa</router-link>
                        <a href="" class="btn btn-link" @click="getIdBook(books._id)" :data-id="books._id"
                            data-toggle="modal" data-target="#delete-book-modal">Xóa</a>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="this.search" v-for="(books, index) in booksFilter" :key="index">
                <tr class="text-justify">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ books.idBook }}</td>
                    <td>{{ books.nameBook }}</td>
                    <td>{{ books.author }}</td>
                    <td>{{ books.typeBook }}</td>
                    <td>{{ books.shelf }}</td>
                    <td>{{ books.quantity }}</td>
                    <!-- <td>{{ books._id }}</td> -->

                    <td>
                        <router-link :to="'/admin/books/' + books._id + '/edit'" class="btn btn-link">Sửa</router-link>
                        <a href="" class="btn btn-link" @click="getIdBook(books._id)" :data-id="books._id"
                            data-toggle="modal" data-target="#delete-book-modal">Xóa</a>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <div class="modal fade" id="delete-book-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Xóa quyển sách?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Bạn có chắc muốn xóa quyển sách này?
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="deleteBook(id)" class="btn btn-danger">Xóa
                            bỏ</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <FooterView></FooterView>
</template>

<script>
import axios from 'axios';
import HeaderView from '../components/HeaderView.vue';
import FooterView from '../components/FooterView.vue';

export default {
    data() {
        return {
            id: '',
            books: [],
            idBook: [],
            input: '',
            search: '',
            booksFilter: []

        };
    },
    async created() {
        const x = JSON.parse(localStorage.getItem('id'))[2]
        if (x !== 'Thủ thư') {
            this.$router.push('/');
        }
        axios.get("http://localhost:8000/admin/books")
            .then(res => {
                this.books = res.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        getIdBook(id) {
            this.id = id;
            console.log(id);
        },
        deleteBook(id) {
            axios.delete(`http://localhost:8000/admin/books/${id}`)
                .then(() => {

                    console.log(this.id);
                    this.$router.push("/admin/books");
                    // window.alert("Xóa thành công");
                    window.location.reload();
                })
                .catch(err => console.log(err));
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
    components: { HeaderView, FooterView }
}
</script>

<style scoped>
.stored-books-view {
    margin: 16px auto;
    margin-top: 100px;

}

.btn.btn-link {
    text-decoration: none;
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
</style>
