<template>
    <form @submit.prevent="updateDosen">
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="nid">NID:</label>
      <input type="number" class="form-control" id="nid" v-model="nid" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid NID.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="namaDepan">Nama Depan:</label>
      <input type="text" class="form-control" id="namaDepan" v-model="namaDepan" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Nama Depan.
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="namaBelakang">Nama Belakang:</label>
      <input type="text" class="form-control" id="namaBelakang" v-model="namaBelakang" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Nama Belakang.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="alamat">Alamat:</label>
      <input type="text" class="form-control" id="alamat" v-model="alamat" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Alamat.
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="noTelepon">No Telepon:</label>
      <input type="text" class="form-control" id="noTelepon" v-model="noTelepon" v-mask="'###-####-####'" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid No Telepon.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="namaMatkul">Mengajar:</label>
      <select class="form-control"  v-model="selectedNamaMatkul" required>
        <option v-for="namaMatkul in uniqueNamaMatkulList " :key="namaMatkul" :value="namaMatkul">{{ namaMatkul }}</option>
      </select>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Mata Kuliah.
      </div>
    </div>
  </div>
  <button @click="updateDosen" type="submit" class="btn btn-primary">Update </button>&nbsp;
  <router-link :to="{ name: 'dosenList' }" class="btn btn-danger">Back</router-link>

   <!-- Success message textbox -->
   <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
    Sukses update data dosen
  </div>

  <!-- Failure message textbox -->
  <div v-if="showFailureMessage" class="alert alert-danger" role="alert">
      Gagal update data dosen. Silakan coba lagi.
    </div>
</form>
</template>

<script>
    import axios from 'axios';
    export default {
  data() {
    return {
      showSuccessMessage:false,
      showFailureMessage:false,
      nid: '',
      namaDepan: '',
      namaBelakang:'',
      alamat:'',
      noTelepon: '',
      selectedNamaMatkul:'',
      namaMatkulList:[],
    };
  },
  created(){
    this.fetchDosenDetails();
    this.fetchNamaMatkulList();
  },
  computed:{
    uniqueNamaMatkulList(){
        //Use a Set to get unique values, then convert back to an array
        return [...new Set(this.namaMatkulList)];
    }
  },
  methods: {
    async fetchNamaMatkulList(){
        try{
            const response=await axios.get('http://localhost:8000/api/matkul');
            this.namaMatkulList=response.data.map(item=>item.Nama_matkul);
        }catch(error){
            console.error('Error fetching Mata kuliah list:',error);
        }
    },
    async fetchDosenDetails(){
        const Id_dosen=this.$route.params.Id_dosen;
        try{
            const response = await axios.get(`http://localhost:8000/api/dosen/${Id_dosen}`);
            //Assign the fetched mata kuliah data to component data fields
            this.nid=response.data.NID;
            this.namaDepan=response.data.Nama_depan;
            this.namaBelakang=response.data.Nama_belakang;
            this.alamat=response.data.Alamat;
            this.noTelepon=response.data.No_telp;
            this.selectedNamaMatkul=response.data.Nama_matkul;
        }catch(error){
            console.error('Error fetching data Dosen details',error);
        }
    },
    async updateDosen() {
      // Create an object with the updated Dosen data
      const updatedDosenData = {
        NID: this.nid,
        Nama_depan: this.namaDepan,
        Nama_belakang:this.namaBelakang,
        Alamat:this.alamat,
        No_telp: this.noTelepon,
        Nama_matkul: this.selectedNamaMatkul
      };

      try {
        const Id_dosen=this.$route.params.Id_dosen;
        const response = await axios.put(`http://localhost:8000/api/dosen/${Id_dosen}`, updatedDosenData);

        if (response.status === 200) { // Check if updated was successful 
          console.log('Data Dosen updated successfully');
          this.showSuccessMessage=true;
          // Reset the form fields after successful submission
        } else {
            console.error('Failed to update Data Dosen with status:', response.status);
            this.showFailureMessage=true;
        }
      } catch (error) {
        console.error('Error updating Dosen:', error);
        this.showFailureMessage=true;
      }
    }
  }
};
</script>

<style>

</style>