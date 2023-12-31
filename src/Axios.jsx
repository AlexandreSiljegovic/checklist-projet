
import axios from 'axios';

const testUrl = 'https://greenvelvet.alwaysdata.net/pfc/ping'
const postUrl = 'https://greenvelvet.alwaysdata.net/pfc/checklist/add'
const apiUrl = 'https://greenvelvet.alwaysdata.net/pfc/checklists';
const updateUrl = 'https://greenvelvet.alwaysdata.net/pfc/checklist/update'
const deleteUrl = 'https://greenvelvet.alwaysdata.net/pfc/checklist/delete'
const statutUrl = 'https://greenvelvet.alwaysdata.net/pfc/checklist/statut'
const checklistViewUrl = 'https://greenvelvet.alwaysdata.net/pfc/checklist/'
const token = 'b679e83afaf347c039f6439266e514d3cc8deb28'

export const fetchDataFromApi = async () => {
  
  
    try {
     
      const responseGet = await axios.get(apiUrl, {
        headers: {
          
          'Content-Type': 'application/json',
          'token' : 'b679e83afaf347c039f6439266e514d3cc8deb28',
        
        },

      });
      
    return responseGet.data;
  
      
    } catch (error) {
      console.error(error);
    }
  };
  
  export const postDataToApi = async (data) => {
    
     try {
     
     
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

    export const deleteDataFromApi = async (id) => {
      try {
        
        const responseDelete = await axios.get(`${deleteUrl}?id=${id}`, {
          headers: {
            'token': ` ${token}`,
          
          },
          
          
        });
        
        console.log(`Delete request for ID ${id} successful. Response:`, responseDelete.data);
      }
      catch (error) {
        console.error(`Error deleting ID ${id}. statut: ${error.response?.statut}. Message: ${error.response?.data?.message}`, error);
      }
    }

    export const updateDataFromApi = async (id, modifiedData) => {
      try {
        const responseUpdate = await axios.post(`${updateUrl}?id=${id}`, modifiedData, {
          headers: {
            'token': 'b679e83afaf347c039f6439266e514d3cc8deb28',
          },
        });
    
        console.log("Update API Response:", responseUpdate.data);
        return responseUpdate.data;
      } catch (error) {
        console.error("Error updating data:", error);
        throw error;
      }
    };


export const statutDataFromApi = async (id, statut) => {
  try {
    
    const responseStatut = await axios.get(`${statutUrl}?id=${id}&statut=${statut}`, {
      headers: {
        'token': `${token}`,
      },
    });
    console.log(responseStatut.data);
    
    
  } catch (error) {
    console.error(error);
  }
};

export const checklistViewFromApi = async (id) => {
  try {
    
    const responseChecklistView = await axios.get(`${checklistViewUrl}?id=${id}`, {
      headers: {
        'token': `b679e83afaf347c039f6439266e514d3cc8deb28`,
      },
    });
    console.log(responseChecklistView.data);
    return response.data;
    
  } catch (error) {
    console.error(error);
  }
};


   
  
   

export default axios;