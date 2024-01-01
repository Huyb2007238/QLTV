<template>
    <HeaderView />

    <div class="user-view container">
        <div class="grid wide">
            <input type="text" id="name" v-model="search" @keyup="filteredList">
        </div>
        <table class="table table-bordered">
            <thead class="thead-dark">
                <tr class="text-uppercase">
                    <th scope="col-1">STT</th>
                    <th scope="col-1">username</th>
                    <th scope="col-1">password</th>
                    <th scope="col-1">name</th>
                    <th scope="col-3">position</th>
                    <th scope="col-2">phone</th>
                    <!-- <th scope="col-2">phone</th> -->
                    <th scope="col" colspan="2"></th>
                </tr>
            </thead>

            <tbody v-if="!this.search" v-for="(user, index) in user" :key="index">
                <tr class="text-justify">
                    <th scope="row">{{ index + 1 }}</th>
                
                    <td>{{ user.username }}</td>
                    <td>{{ user.password }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.position }}</td>
                    <td>{{ user.phone }}</td>
                    <!-- <td>{{ user.id }}</td> -->
                    <td>
                        <router-link :to="'/user/register'" class="btn btn-link">Thêm</router-link>
                        <a href="" class="btn btn-link" @click="getIdUser(user._id)" :data-id="user._id" data-toggle="modal"
                            data-target="#delete-book-modal">Xóa</a>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="this.search" v-for="(user, index) in userFilter" :key="index">
                <tr class="text-justify">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user.username }}</td>
                    <td>{{ user.password }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.position }}</td>
                    <td>{{ user.phone }}</td>
                    <!-- <td>{{ user.id }}</td> -->
                    <td>
                        <router-link :to="'/user/register'" class="btn btn-link">Thêm</router-link>
                        <a href="" class="btn btn-link" @click="getIdUser(user._id)" :data-id="user._id" data-toggle="modal"
                            data-target="#delete-book-modal">Xóa</a>
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
                        <h5 class="modal-title" id="exampleModalLongTitle">Xóa người dùng?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Bạn có chắc muốn xóa người dùng này?
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="deleteUser(id)" class="btn btn-danger">Xóa bỏ</button>
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
import HeaderView from '../components/Headerview.vue';
import FooterView from '../components/FooterView.vue';

export default {
    components: { HeaderView, FooterView },
    data() {
        return {
            id: '',
            user: [],
            username: [],
            input: '',
            search: '',
            userFilter: []
        };
    },


    created() {
        const x = JSON.parse(localStorage.getItem('id'))[2]
        if (x !== 'Thủ thư') {
            this.$router.push('/');
        }
        axios.get("http://localhost:8000/admin/users")
            .then(res => {
                this.user = res.data;
                // console.log(res.data[1]._id);
                // console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        filteredList() {
            if (this.search == '')
                this.userFilter = this.user,
                console.log(this.userFilter);
            else {
                this.userFilter = this.user.filter(item => item.name.toLowerCase().includes(this.search));
            }
            // console.log(this.booksFilter);
        },
        getIdUser(id) {
            this.id = id;
            console.log(id);
            // this.$el.getAttribute('data-id');
        },
        deleteUser(id) {
            const x = JSON.parse(localStorage.getItem('id'))[2]
            if (x !== 'Thủ thư') {
                this.$router.push('/');
            }
            axios.delete(`http://localhost:8000/admin/user/${id}`)
                .then(() => {

                    console.log(id);
                    this.$router.push("/admin/users");
                    // window.alert("Xóa thành công");
                    window.location.reload();
                })
                .catch(err => console.log(err));
        },
    },

}
</script>

<style scoped>
.user-view {
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
