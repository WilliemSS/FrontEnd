my DaftarPengajarAddForm.vue :
<template>
    <form @submit.prevent="addPengajar">
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="nama_mahasiswa">Nama Mahasiswa:</label>
      <select class="form-control"  v-model="selectedNamaMahasiswa" required>
        <option v-for="namaMahasiswa in uniqueNamaMahasiswaList " :key="namaMahasiswa" :value="namaMahasiswa">{{ namaMahasiswa }}</option>
      </select>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Nama Mahasiswa.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="nim">NIM:</label>
      <input type="number" class="form-control" id="nim" v-model="selectedNIM" readonly>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid NIM.
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
        <label for="namaMatkul">Mata Kuliah:</label>
      <select class="form-control"  v-model="selectedNamaMatkul" required>
        <option v-for="namaMatkul in uniqueNamaMatkulList " :key="namaMatkul" :value="namaMatkul">{{ namaMatkul }}</option>
      </select>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Mata Kuliah.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="sks">SKS:</label>
      <input type="number" class="form-control" id="sks" v-model="selectedSKS" readonly>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid SKS.
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="pengajar">Pengajar:</label>
      <select class="form-control"  v-model="selectedNamaDosen" required>
        <option v-for="namaDosen in uniqueNamaDosenList" :key="namaDosen" :value="namaDosen">{{ namaDosen }}</option>
      </select>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Nama Pengajar.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="nid">NID:</label>
      <input type="number" class="form-control" id="nid" v-model="selectedNID" readonly>
      <!-- Example invalid feedback -->
      <div class="invalid-feedback">
        Please provide a valid Nomor Induk Dosen.
      </div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Add Pengajar</button>&nbsp;
  <router-link :to="{ name: 'daftarPengajarList' }" class="btn btn-danger">Back</router-link>

   <!-- Success message textbox -->
  <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
    Sukses menambah data pengajar
  </div>

  <!-- Failure message textbox -->
  <div v-if="showFailureMessage" class="alert alert-danger" role="alert">
      Gagal menambah data pengajar. Silakan coba lagi.
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
      nama_mahasiswa: '',
      nim: '',
      namaMatkul: '',
      sks:'',
      nid:'',
      pengajar:'',
      namaMatkulList:[],
      namaMahasiswaList:[],
      sksList:[],
      nimList:[],
      namaDosenList:[],
      nidList:[],
      selectedNamaMahasiswa:'',
      selectedNamaMatkul:'',
      selectedNamaDosen:''
      
    };
  },
  created(){
    this.fetchNamaMatkulList();
    this.fetchNamaMahasiswaList();
    this.fetchNamaDosenList();
  },
  computed:{
    uniqueNamaMatkulList(){
        //Use a Set to get unique values, then convert back to an array
        return [...new Set(this.namaMatkulList)];
    },
    uniqueNamaMahasiswaList(){
        return [...new Set(this.namaMahasiswaList)];
    },
    uniqueNamaDosenList(){
        return [...new Set(this.namaDosenList)];
    },
    selectedSKS(){
        const matkul=this.namaMatkulList.find(item=>item===this.selectedNamaMatkul);
        const index=this.namaMatkulList.indexOf(matkul);
        return index!==-1?this.sksList[index]:null;
    },
    selectedNIM(){
        const index=this.namaMahasiswaList.indexOf(this.selectedNamaMahasiswa);
        return index !==-1?this.nimList[index]:null;
    },
    selectedNID(){
        const index=this.namaDosenList.indexOf(this.selectedNamaDosen);
        return index!==-1?this.nidList[index]:null;
    }
  },
  methods: {
    async fetchNamaMatkulList(){
        try{
            const response=await axios.get('http://localhost:8000/api/matkul');
            this.namaMatkulList=response.data.map(item=>item.Nama_matkul);
            this.sksList=response.data.map(item=>item.SKS);
        }catch(error){
            console.error('Error fetching Jurusan list:',error);
        }
    },
    async fetchNamaMahasiswaList(){
        try{
            const response=await axios.get('http://localhost:8000/api/mahasiswa');
            this.namaMahasiswaList=response.data.map(item=>item.Nama_depan + ' '+ item.Nama_belakang);
            this.nimList=response.data.map((item)=>item.NIM);
        }catch(error){
            console.error('Error fetching Nama Mahasiswa:',error);
        }
    },
    async fetchNamaDosenList(){
        try{
            const response=await axios.get('http://localhost:8000/api/dosen');
            this.namaDosenList=response.data.map(item=>item.Nama_depan +' '+ item.Nama_belakang);
            this.nidList=response.data.map((item)=>item.NID);
        }catch (error){
            console.error('Error fetching Nama Dosen:',error);
        }
    },
    async addPengajar() {
      // Create an object with form data
      const formData = {
        NIM: this.selectedNIM,
        Nama_mahasiswa: this.selectedNamaMahasiswa,
        Nama_matkul:this.selectedNamaMatkul,
        SKS: this.selectedSKS,
        NID:this.selectedNID,
        Nama_dosen:this.selectedNamaDosen
      };

      try {
        const response = await axios.post('http://localhost:8000/api/daftar-pengajar', formData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (response.status === 201) { // Check for successful creation (201 Created)
          console.log('Dosen added successfully');
          this.showSuccessMessage=true;
          // Reset the form fields after successful submission
          this.selectedNIM = '';
          this.selectedNamaMatkul = '';
          this.selectedSKS='';
          this.selectedNID = '';
          this.selectedNamaDosen='',
          this.selectedNamaMatkul = '';
        } else {

          console.error('Failed to add daftar pengajar with status:', response.status);

        }
      } catch (error) {
        console.error('Error adding pengajar:', error);
        this.showFailureMessage=true;
      }
    }
  }
};
</script>