
import axios from 'axios';

const testUrl = 'https://greenvelvet.alwaysdata.net/pfc/ping'
const postUrl = 'https://greenvelvet.alwaysdata.net/pfc/checklist/add'
const apiUrl = 'https://greenvelvet.alwaysdata.net/pfc/';
const token = 'b679e83afaf347c039f6439266e514d3cc8deb28'

export const fetchDataFromApi = async () => {
  
  
    try {
      // Utiliser Axios pour effectuer la requête GET avec le token d'authentification
      const responseGet = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        
        },

      });
      
    
  
      console.log(responseGet.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  export const postDataToApi = async (data) => {
    
     try {
      // const postData = {
      //   title: data.title,
      //   description: data.description,
      // };
      // Utiliser Axios pour effectuer la requête POST avec le token d'authentification
      const responsePost = await axios.post(postUrl,data , {
        headers: {
          'Content-Type': 'application/json',
          'token': `b679e83afaf347c039f6439266e514d3cc8deb28`,
        
        },
       
       
      });
      console.log(responsePost.data);
    } catch (error) {
      console.error(error);
    }
  }


     export const test = async () => {
      try {
        // Utiliser Axios pour effectuer la requête POST avec le token d'authentification
        const responsePostTest = await axios.get(testUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          
          },
          
          
        });
        console.log(responsePostTest.data);
      }
      catch (error) {
        console.error(error);
      }
    }



export default axios;