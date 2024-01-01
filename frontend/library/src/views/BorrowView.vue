<template>
    <HeaderView></HeaderView>


    <div class="stored-books-view container">
        <h3 class="text-uppercase mt-4 mb-4 ">Danh sách mượn sách</h3>

        <div class="grid wide">
            <input type="text" id="name" v-model="search" @keyup="filteredList">
        </div>
        <table class="table table-bordered">
            <thead class="thead-dark">
                <tr class="text-uppercase">
                    <th scope="col-1">STT</th>
                    <th scope="col-1">idBorrow</th>
                    <th scope="col">username</th>
                    <!-- <th scope="col-3">idBook</th>
                    <th scope="col-3">dateBorrow</th>
                    <th scope="col-2">dateDue</th>
                    <th scope="col">dateReturn</th>
                    <th scope="col-2">trangthai</th> -->
                    <th scope="col-2"></th>
                </tr>
            </thead>

            <tbody>
                <tr v-if="!this.search" class="text-justify" v-for="(listuser, index) in listborrow" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ listuser.user.code }}</td>
                    <td>{{ listuser.user.fullname }}</td>
                    <td style="text-align: center;">
                        <button class="btn btn-link" type="button" data-toggle="modal" data-target="#exampleModalCenter"
                            @click="getDataBorrow(listuser._id)" :data-id="listborrow._id">
                            Chi tiết
                        </button>

                        <router-link :to="'/admin/borrows/' + listuser._id" class="btn btn-link">Thêm</router-link>
                        <router-link :to="'/admin/borrows/' + listuser._id + '/edit'" class="btn btn-link">Sửa</router-link>
                        <a href="" class="btn btn-link" @click="getIdBorrow(listuser._id)" data-toggle="modal"
                            data-target="#delete-book-modal"> Xóa</a>

                        <!-- Modal -->
                        <div class="modal fade bd-example-modal-xl" id="exampleModalCenter" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title " id="exampleModalLongTitle">
                                            {{ Borrow.user.fullname }}
                                        </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="table-xl">
                                            <table class="table table-bordered">
                                                <thead class="thead-dark">
                                                    <tr class="text-uppercase">
                                                        <th scope="col-1">STT</th>
                                                        <th scope="col-3">Mã sách</th>
                                                        <th scope="col-2">Ngày mượn</th>
                                                        <th scope="col-2">Hạn trả </th>
                                                        <th scope="col-2">Ngày trả</th>
                                                        <th scope="col-2">Trạng thái</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="text-justify" v-for="(Borrow, index) in Borrow.books"
                                                        :key="index">
                                                        <th scope="row">{{ index + 1 }}</th>
                                                        <td>{{ Borrow.id ?? '' }}</td>
                                                        <td>{{ Borrow.dateBorrow ? Borrow.dateBorrow.split('T')[0] : '' }}
                                                        </td>
                                                        <td>{{ Borrow.dateDue ? Borrow.dateDue.split('T')[0] : '' }}</td>
                                                        <td>{{ Borrow.dateReturn ? Borrow.dateReturn.split('T')[0] : '' }}
                                                        </td>
                                                        <td>{{ Borrow.dateReturn ? 'Đã trả' : 'Chưa trả' }}</td>
                                                    </tr>
                                                </tbody>



                                            </table>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <!-- <router-link :to="'/admin/borrow/' + listborrow._id + '/edit'" class="btn btn-link" >
                            Xem chi tiết</router-link>
                        <a href="" class="btn btn-link" @click="getIdBorr   ow(listborrow)" :data-id="listborrow._id"
                            data-toggle="modal" data-target="#delete-book-modal">Xóa</a> -->
                    </td>
                </tr>
                <tr v-if="this.search" class="text-justify" v-for="(listuser, index) in Filter" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ listuser.user.code }}</td>
                    <td>{{ listuser.user.fullname }}</td>
                    <td style="text-align: center;">
                        <button class="btn btn-link" type="button" data-toggle="modal" data-target="#exampleModalCenter"
                            @click="getDataBorrow(listuser._id)" :data-id="listborrow._id">
                            Chi tiết
                        </button>
                        <router-link :to="'/admin/borrows/' + listuser._id" class="btn btn-link">Thêm</router-link>
                        <router-link :to="'/admin/borrows/' + listuser._id + '/edit'" class="btn btn-link" >Sửa</router-link>
                        <a href="" class="btn btn-link" @click="getIdBorrow(listuser._id)" data-toggle="modal"
                            data-target="#delete-book-modal"> Xóa</a>

                        <!-- Modal -->
                        <div class="modal fade bd-example-modal-xl" id="exampleModalCenter" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title " id="exampleModalLongTitle">
                                            {{ Borrow.user.fullname }}
                                        </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="table-xl">
                                            <table class="table table-bordered">
                                                <thead class="thead-dark">
                                                    <tr class="text-uppercase">
                                                        <th scope="col-1">STT</th>
                                                        <th scope="col-3">Mã sách</th>
                                                        <th scope="col-2">Ngày mượn</th>
                                                        <th scope="col-2">Hạn trả </th>
                                                        <th scope="col-2">Ngày trả</th>
                                                        <th scope="col-2">Trạng thái</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="text-justify" v-for="(Borrow, index) in Borrow.books"
                                                        :key="index">
                                                        <th scope="row">{{ index + 1 }}</th>
                                                        <td>{{ Borrow.id ?? '' }}</td>
                                                        <td>{{ Borrow.dateBorrow ? Borrow.dateBorrow.split('T')[0] : '' }}
                                                        </td>
                                                        <td>{{ Borrow.dateDue ? Borrow.dateDue.split('T')[0] : '' }}</td>
                                                        <td>{{ Borrow.dateReturn ? Borrow.dateReturn.split('T')[0] : '' }}
                                                        </td>
                                                        <td>{{ Borrow.dateReturn ? 'Đã trả' : 'Chưa trả' }}</td>
                                                    </tr>
                                                </tbody>



                                            </table>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <!-- <router-link :to="'/admin/borrow/' + listborrow._id + '/edit'" class="btn btn-link" >
                            Xem chi tiết</router-link>
                        <a href="" class="btn btn-link" @click="getIdBorr   ow(listborrow)" :data-id="listborrow._id"
                            data-toggle="modal" data-target="#delete-book-modal">Xóa</a> -->
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
                        <h5 class="modal-title" id="exampleModalLongTitle">Xóa đối tượng?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Bạn có chắc muốn xóa đối tượng này?
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="deleteBorrow(id)" class="btn btn-danger">Xóa bỏ</button>
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
            input: '',
            search: '',
            Filter: [],
            listborrow: {
                user: {
                    code: '',
                    fullname: ''
                },
                books: [
                    {
                        id: '',
                        dateBorrow: '',
                        dateDue: '',
                        dateReturn: '',
                        state: false
                    }
                ]
            },
            Borrow: {
                user: {
                    code: '',
                    fullname: ''
                },
                books: [
                    {
                        id: '',
                        dateBorrow: '',
                        dateDue: '',
                        dateReturn: '',
                        state: false
                    }
                ]
            },

        };
    },


    async created() {
        const x = JSON.parse(localStorage.getItem('id'))[2]
        if (x !== 'Thủ thư') {
            this.$router.push('/');
        }
        console.log(this.Borrow.user);
        axios.get("http://localhost:8000/admin/listBorrow")
            .then(res => {
                this.listborrow = res.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        filteredList() {
            if (this.search == '')
                this.Filter = this.listborrow
            else {
                this.Filter = this.listborrow.filter(item => item.user.fullname.toLowerCase().includes(this.search));
            }
            // console.log(this.Filter);
        },
        getIdBorrow(id) {
            this.id = id;
        },
        getDataBorrow(id) {
            const x = JSON.parse(localStorage.getItem('id'))[2]
            if (x !== 'Thủ thư') {
                this.$router.push('/');
            }
            axios.get(`http://localhost:8000/admin/borrows/${id}/edit`)
                .then(res => {
                    this.Borrow = res.data;
                    // console.log(this.Borrow);
                })
                .catch(err => {
                    console.log(err);
                })
            // this.$el.getAttribute('data-id');
        },
        deleteBorrow(id) {
            const x = JSON.parse(localStorage.getItem('id'))[2]
            if (x !== 'Thủ thư') {
                this.$router.push('/');
            }
            console.log(id);
            axios.delete(`http://localhost:8000/admin/borrows/${id}`)
                .then(() => {
                    console.log(id);
                    // this.$router.push("/admin/borrow/edit");
                    // window.alert("Xóa thành công");
                    window.location.reload();
                })
                .catch(err => console.log(err));
        },
    },
    components: { HeaderView, FooterView }

}
</script>

<style scoped>
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

.stored-books-view {
    margin: 16px auto;
    margin-top: 100px;

}

.modal-content {
    width: 200%;
    margin-right: auto;
    float: left;
}

.btn {
    background-color: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
}

.btn.btn-link {
    text-decoration: none;
}
</style>
