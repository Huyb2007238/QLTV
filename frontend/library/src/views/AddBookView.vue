<template >
    <HeaderView />
    <div class="add-book-view container">

        <h3 class="text-uppercase my-4">Thêm sách </h3>

        <form method="POST" @submit.prevent="addBook" action="">
            <div class="form-row mb-4">
                <div class="form-group col-md-2">
                    <label for="id-book">Mã số</label>
                    <input required="true" type="text" class="form-control" id="id-book" v-model="posts.idBook">
                </div>

                <div class="form-group col-md-4">
                    <label for="name-Book">Tên sách</label>
                    <input required="true" type="text" class="form-control" id="name-Book" v-model="posts.nameBook">
                </div>

                <div class="form-group">
                    <label for="author">Tác giả</label>
                    <input required="true" type="text" class="form-control" id="author" v-model="posts.author">
                </div>
            </div>

            <div class="form-group mb-4">
                <label class="form-label" for="type-book">Thể loại</label>
                <input required="true" type="text" class="form-control" id="type-book" v-model="posts.typeBook">
            </div>

            <div class="form-group mb-4">
                <label class="form-label" style="margin-right: 10px;" for="shelf">Vị trí </label>
                <select required="true" class="select" id="shelf" v-model="posts.shelf">
                    <option>A1</option>
                    <option>A2</option>
                    <option>A3</option>
                </select>
            </div>

            <div class="form-group mb-4">
                <label class="form-label" for="quality">Số lượng</label>
                <input required="true" type="number" class="form-control" id="quality" v-model="posts.quantity" min="0">
            </div>

            <div class="form-group mb-4">
                <label class="form-label" for="pathURL">Chọn hình ảnh</label><br>
                <input required="true" type="file" name="name-file" id="pathURL">
            </div>

            <button type="submit" class="btn btn-success btn-lg mb-1 mt-4 text-uppercase" @click="getNameFileImg">
                Thêm mới</button>
            <button type="button" v-on:click="comebackHome()" class="btn btn-info btn-lg mb-1 mx-5 mt-4 text-white">
                Về trang chủ</button>
        </form>
    </div>
    <FooterView />
</template>

<script>
import axios from 'axios'
import HeaderView from '../components/HeaderView.vue';
import FooterView from '../components/FooterView.vue';

export default {

    data() {
        return {
            posts: {
                idBook: null,
                nameBook: null,
                author: null,
                typeBook: null,
                shelf: null,
                quantity: null,
                image: null
            }
        };
    },
    methods: {
        getNameFileImg() {
            const fake_path = document.getElementById('pathURL').value;
            this.posts.image = fake_path.split("\\").pop();
        },
        addBook() {
            const x = JSON.parse(localStorage.getItem('id'))[2]
            if (x !== 'Thủ thư') {
                this.$router.push('/');
            }
            axios.post('http://localhost:8000/admin/books/edit', this.posts)
                // .then(res => console.log(res))
                .then(res => {
                    if (res.status === 201) {
                        this.posts.idBook = "";
                        this.posts.nameBook = "";
                        this.posts.author = "";
                        this.posts.typeBook = "";
                        this.posts.shelf = "";
                        this.posts.quantity = "";
                        this.posts.image = "";
                        document.getElementById('pathURL').value = "";
                        window.alert("Thêm sách thành công");
                        window.location.reload()
                    }
                    else
                        if (res.status === 501) {
                            window.alert("Thêm sách thất bại");
                            window.location.reload()
                        }

                })
                .catch(err => console.log(err));
            // window.alert("Thông tin nhập đã có");
        },
        comebackHome() {
            this.$router.push("/");
        }
    },
    components: { HeaderView, FooterView }
}
</script>


<style scoped>
.add-book-view {
    margin: 16px auto;
    margin-top: 100px;
}

.form-row {
    display: flex;
    justify-content: space-between;
}
</style>