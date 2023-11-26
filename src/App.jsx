import axios from './Axios.jsx'
import { fetchDataFromApi } from './Axios.jsx'
import { postDataToApi } from './Axios.jsx'
import { test } from './Axios.jsx'

function App() {
    postDataToApi()
    test()
    fetchDataFromApi()
    console.log(fetchDataFromApi())
    return (
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
        
    )


}

export default App
