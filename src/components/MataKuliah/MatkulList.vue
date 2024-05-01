<template>
  <div>
    <NavBarList/>
    <h1>List Mata Kuliah</h1>
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">KD Mata Kuliah</th>
          <th scope="col">Nama Mata Kuliah</th>
          <th scope="col">SKS</th>
          <th scope="col">Jurusan</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listview" :key="item.Id_list">
          <td>{{ item.Kd_matkul }}</td>
          <td>{{ item.Nama_matkul }}</td>
          <td>{{ item.SKS }}</td>
          <td>{{ item.Jurusan }}</td>
          <td>
            <button @click="updateMatkul(item.Id_matkul)" class="btn btn-primary">Update</button>
            &nbsp;
            <button @click="deleteMatkul(item.Id_matkul)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link :to="{name: 'matkulAddForm'}" class="btn btn-primary">Tambah Mata Kuliah</router-link>
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
                    const response=await axios.get('http://localhost:8000/api/matkul');
                    this.listview=response.data;
                }catch(error){
                    console.error('Error fetching data: ',error);
                    //For handling error
                }
            },
            async deleteMatkul(Id_matkul){
              try{
                await axios.delete(`http://localhost:8000/api/matkul/${Id_matkul}`);
                this.fetchData();//refresh the Data after deleteion
              }catch(error){
                console.error('Error deleting mata kuliah :',error);
              }
            },
            updateMatkul(Id_matkul){
              //use vue router to navigate to MatkulUpdateForm
              this.$router.push({name:'matkulUpdateForm',params:{Id_matkul}});
            }
        },
    };
</script>
