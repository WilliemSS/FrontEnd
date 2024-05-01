import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        jurusan:'',
        namaMatkul:''
    },
    mutations:{
        SET_JURUSAN(state,jurusan){
            state.jurusan=jurusan;
        },
        SET_NAMA_MATKUL(state,namaMatkul){
            state.namaMatkul=namaMatkul;
        }
    },
    action:{
        async fetchJurusan({commit},nim){
            try{
                const response = await axios.get(`http://localhost:8000/api/mahasiswa/${nim}`);
                const jurusan=response.data.Jurusan;
                commit('SET_JURUSAN',jurusan);
            }catch(error){
                console.error('Error fetching Jurusan:',error);
            }
        },
        async fetchNamaMatkul({commit,state}){
            try{
                const response=await axios.get('http://localhost:8000/api/matkul');
                const namaMatkul=response.data.filter(matkul=>matkul.Jurusan===state.jurusan).map(matkul=>matkul.Nama_matkul);
                commit ('SET_NAMA_MATKUL',namaMatkul);
            }catch(error){
                console.error('Error fetching Nama Matkul',error);
            }
        }
    }

});