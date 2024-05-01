my MahasiswaList.vue :
<template>
    <div>
      <NavBarList/>
      <h1>List Mahasiswa</h1>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">NIM</th>
            <th scope="col">Nama Lengkap</th>
            <th scope="col">Alamat</th>
            <th scope="col">No.Telp</th>
            <th scope="col">Jurusan</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listview" :key="item.Id_list">
            <td>{{ item.NIM }}</td>
            <td>{{ item.Nama_depan + ' ' + item.Nama_belakang }}</td>
            <td>{{ item.Alamat }}</td>
            <td>{{ item.No_telp }}</td>
            <td>{{ item.Jurusan }}</td>
            <td>
              <button @click="updateMahasiswa(item.Id_mahasiswa)" class="btn btn-primary">Update</button>
              &nbsp;
              <button @click="deleteMahasiswa(item.Id_mahasiswa)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link :to="{name: 'mahasiswaAddForm'}" class="btn btn-primary">Tambah mahasiswa</router-link>
    </div>
  </template>
  
  <script >
      import NavBarList from '@/components/navBarList.vue';
      import axios from 'axios';
      export default{
          components:{
            NavBarList,
          },
          data(){
              return{
                  listview:[],
              };
          },
          created(){
              this.fetchData();
          },
          methods:{
              async fetchData(){
                  try{
                      const response=await axios.get('http://localhost:8000/api/mahasiswa');
                      this.listview=response.data;
                  }catch(error){
                      console.error('Error fetching data: ',error);
                      //For handling error
                  }
              },
              async deleteMahasiswa(Id_mahasiswa){
                try{
                  await axios.delete(`http://localhost:8000/api/mahasiswa/${Id_mahasiswa}`);
                  this.fetchData();//refresh the Data after deleteion
                }catch(error){
                  console.error('Error deleting data mahasiswa :',error);
                }
              },
              updateMahasiswa(Id_mahasiswa){
                //use vue router to navigate to MahasiswaUpdateForm
                this.$router.push({name:'mahasiswaUpdateForm',params:{Id_mahasiswa}});
              }
          }
      }
  </script>
  
  