<template>
    <HeaderView />
    <div class="edit-book-view container">
        <h3 class="text-uppercase mt-4 mb-4">Cập nhật thông tin Sách</h3>

        <form method="POST" @submit.prevent="updatebook">
            <div class="form-row mb-4">
                <div class="form-group col-md-2">
                    <label for="id-book">Mã số</label>
                    <input type="text" class="form-control" id="id-book" v-model="this.book.idBook" disabled>
                </div>

                <div class="form-group col-md-4">
                    <label for="name-Book">Tên sách</label>
                    <input type="text" class="form-control" id="name-Book" v-model="this.book.nameBook" disabled>
                </div>

                <div class="form-group">
                    <label for="author">Tác giả</label>
                    <input type="text" class="form-control" id="author" v-model="this.book.author" disabled >
                </div>
            </div>

            <div class="form-group mb-4">
                <label class="form-label" for="type-book">Thể loại</label>
                <input type="text" class="form-control" id="type-book" v-model="this.book.typeBook" disabled>
            </div>

            <div class="form-group mb-4">
                <label class="form-label" for="shelf">Gender</label>
                <select class="select" id="shelf" v-model="this.book.shelf">
                    <option>A1</option>
                    <option>A2</option>
                    <option>A3</option>
                </select>
            </div>

            <div class="form-group mb-4">
                <label class="form-label" for="quality">Số lượng</label>
                <input type="number" class="form-control" id="quality" v-model="this.book.quantity" min="0">
            </div>

            <div class="form-group mb-4">
                <label class="form-label" for="pathURL">Chọn hình ảnh</label><br>
                <input type="file" name="name-file" id="pathURL" >
            </div>

            <button type="submit" class="btn btn-primary text-uppercase">
                Lưu lại
            </button>
        </form>
    </div>
    <FooterView />
</template>

<script>

import axios from 'axios'
import HeaderView from '../components/HeaderView.vue';
import FooterView from '../components/FooterView.vue';

export default {
    components: {
        HeaderView,
        FooterView
    },
    data() {
        return {
            book: {
                idBook: [],
                nameBook: [],
                author: [],
                typeBook: [],
                shelf: [],
                quality: [],
                image: []
            }
        }
    },

    computed: {
        id() {
            return this.$route.params.id;
        }
    },

    created() {
        const x = JSON.parse(localStorage.getItem('id'))[2]
        if (x !== 'Thủ thư') {
            this.$router.push('/');
        }
        axios
            .get('http://localhost:8000/admin/books/' + this.id + '/edit')
            .then(res => {
                this.book = res.data;
            })
            .catch(err => {
                console.log(err)
            })
    },

    methods: {
        updatebook() {
            const x = JSON.parse(localStorage.getItem('id'))[2]
            if (x !== 'Thủ thư') {
                this.$router.push('/');
            }
            // `http://localhost:8000/books/${this.id}`
            axios
                .put('http://localhost:8000/admin/books/' + this.id + '/edit', this.book)
                .then(res => {
                    // console.log(this.book);
                    console.log(res.data);
                    if ( res.status === 200) {
                        this.$router.push('/admin/books');
                        window.alert("Cập nhật thông tin thành công")
                    }
                    else if ( res.status === 500) {
                        window.alert("Cập nhật thông tin thất bại")
                    }
                })
                .catch(err => console.error('Error updating book:', err))
                window.alert("Thông tin nhập đã có");
        },
    }
}
</script>

<style scoped>
.edit-book-view {
    margin: 16px auto;
    margin-top: 100px;

}

.form-group label {
    font-weight: bold;
}

.form-row {
    display: flex;
    justify-content: space-between;
}

#shelf{
    margin-left: 10px;
}
</style>