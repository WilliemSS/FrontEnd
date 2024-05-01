<template>
    <div>
      <NavBarList/>
      <h1>List Pengajar</h1>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">NIM</th>
            <th scope="col">Nama Mahasiswa</th>
            <th scope="col">Mata Kuliah</th>
            <th scope="col">SKS</th>
            <th scope="col">NID</th>
            <th scope="col">Nama Pengajar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listview" :key="item.Id_list">
            <td>{{ item.NIM }}</td>
            <td>{{ item.Nama_mahasiswa }}</td>
            <td>{{ item.Nama_matkul }}</td>
            <td>{{ item.SKS }}</td>
            <td>{{ item.NID }}</td>
            <td>{{ item.Nama_dosen }}</td>
            <td>
              <button @click="updatePengajar(item.Id_pengajar)" class="btn btn-primary">Update</button>
              &nbsp;
              <button @click="deletePengajar(item.Id_pengajar)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link :to="{name: 'daftarPengajarAddForm'}" class="btn btn-primary">Tambah Pengajar</router-link>
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
                      const response=await axios.get('http://localhost:8000/api/daftar-pengajar');
                      this.listview=response.data;
                  }catch(error){
                      console.error('Error fetching data: ',error);
                      //For handling error
                  }
              },
              async deletePengajar(Id_pengajar){
                try{
                  await axios.delete(`http://localhost:8000/api/daftar-pengajar/${Id_pengajar}`);
                  this.fetchData();//refresh the Data after deleteion
                }catch(error){
                  console.error('Error deleting daftar pengajar :',error);
                }
              },
              updatePengajar(Id_pengajar){
                //use vue router to navigate to Daftar Pegnajar Update Form
                this.$router.push({name:'daftarPengajarUpdateForm',params:{Id_pengajar}});
              }
          }
      }
  </script>
  
  