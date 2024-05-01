<template>
    <form @submit.prevent="updateMahasiswa">
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="nim">NIM:</label>
      <input type="number" class="form-control" id="nim" v-model="nim" required>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid NIM.
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
      <label for="jurusan">Jurusan:</label>
      <select class="form-control"  v-model="selectedJurusan" required>
        <option v-for="jurusan in uniqueJurusanList " :key="jurusan" :value="jurusan">{{ jurusan }}</option>
      </select>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Jurusan.
      </div>
    </div>
  </div>
  <button @click="updateMahasiswa" type="submit" class="btn btn-primary">Update </button>&nbsp;
  <router-link :to="{ name: 'mahasiswaList' }" class="btn btn-danger">Back</router-link>

   <!-- Success message textbox -->
   <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
    Sukses update data mahasiswa
  </div>

  <!-- Failure message textbox -->
  <div v-if="showFailureMessage" class="alert alert-danger" role="alert">
      Gagal update data mahasiswa. Silakan coba lagi.
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
      nim: '',
      namaDepan: '',
      namaBelakang:'',
      alamat:'',
      noTelepon: '',
      jurusan: '',
      selectedJurusan:'',
      jurusanList:[],
    };
  },
  created(){
    this.fetchMahasiswaDetails();
    this.fetchJurusanList();
  },
  computed:{
    uniqueJurusanList(){
        //Use a Set to get unique values, then convert back to an array
        return [...new Set(this.jurusanList)];
    }
  },
  methods: {
    async fetchJurusanList(){
        try{
            const response=await axios.get('http://localhost:8000/api/matkul');
            this.jurusanList=response.data.map(item=>item.Jurusan);
        }catch(error){
            console.error('Error fetching Jurusan list:',error);
        }
    },
    async fetchMahasiswaDetails(){
        const Id_mahasiswa=this.$route.params.Id_mahasiswa;
        try{
            const response = await axios.get(`http://localhost:8000/api/mahasiswa/${Id_mahasiswa}`);
            //Assign the fetched mata kuliah data to component data fields
            this.nim=response.data.NIM;
            this.namaDepan=response.data.Nama_depan;
            this.namaBelakang=response.data.Nama_belakang;
            this.alamat=response.data.Alamat;
            this.noTelepon=response.data.No_telp;
            this.selectedJurusan=response.data.Jurusan;
        }catch(error){
            console.error('Error fetching data Mahasiswa details',error);
        }
    },
    async updateMahasiswa() {
      // Create an object with the updated mata kuliah data
      const updatedMahasiswaData = {
        NIM: this.nim,
        Nama_depan: this.namaDepan,
        Nama_belakang:this.namaBelakang,
        Alamat:this.alamat,
        No_telp: this.noTelepon,
        Jurusan: this.selectedJurusan
      };

      try {
        const Id_mahasiswa=this.$route.params.Id_mahasiswa;
        const response = await axios.put(`http://localhost:8000/api/mahasiswa/${Id_mahasiswa}`, updatedMahasiswaData);

        if (response.status === 200) { // Check if updated was successful 
          console.log('Data Mahasiswa updated successfully');
          this.showSuccessMessage=true;
          // Reset the form fields after successful submission
        } else {
            console.error('Failed to update Data Mahasiswa with status:', response.status);
            this.showFailureMessage=true;
        }
      } catch (error) {
        console.error('Error updating Mahasiswa:', error);
        this.showFailureMessage=true;
      }
    }
  }
};
</script>

<style>

</style>