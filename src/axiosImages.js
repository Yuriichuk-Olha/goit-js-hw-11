const API = 'https://pixabay.com/api/';
const API_KEY = '33330220-38622d6f802367b73b86585e9';

async function axiosImages(hits, queryPage=1){
    try {
        const response = await axios.get(`${API}?key=${API_KEY}&q=${hits}&page=${queryPage}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`)
        const articles = response.data
    //    console.log(articles);
        return  articles
    } catch (error) {
        console.log(error); 
    }

};

export default {axiosImages};


  //  &SameSite=None;Secure

