import axios from "axios"

const BaseUrl =`http://localhost/movie-api/`
// change to url

export const LanguageAPI = {
    Language(url=BaseUrl+`languages/`) {
        return {
            Create:NewRecord=>axios.post(url+`create.php`,NewRecord),
            FetchAll:()=>axios.get(url+`fetch.php`)         
        }
    }
}

export const MovieAPI = {
    Movie(url=BaseUrl+`movies/`) {
        return {
            Create:NewRecord=>axios.post(url+`create.php`,NewRecord), 
            FetchAll:()=>axios.get(url+`fetch.php`),        
            FetchById:(lan_id)=>axios.get(url+`fetch.php?lan_id=${lan_id}`),        
        }
    }
}

export const ReviewAPI = {
    Review(url=BaseUrl+`reviews/`) {
        return {
            Create:NewRecord=>axios.post(url+`create.php`,NewRecord), 
        }
    }
}