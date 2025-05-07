export async function getCatGifByEmotion(emotion, pg13Checked) {
    const giphyAPIAccessKey = process.env.GIPHY_API_KEY
    
    const searchTerm = `${emotion}+cat`
    let endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${giphyAPIAccessKey}&tag=${searchTerm}`
    
    if (pg13Checked) {
        endpoint += `&rating=pg-13`
    }
    
    try {
        const response = await fetch(endpoint);
        const result = await response.json();
        
        console.log(result.data)

        if (result.data && result.data.images && result.data.images.original.url) {
            const gifUrl = result.data.images.original.url;
            const altText = `Cat feeling ${emotion}`
            
            return { 
                src: gifUrl,
                alt: altText
            }
        } else {
            console.log("No GIFs found for this mood.");
        }
    } catch (error) {
        console.error("Error fetching cat GIF:", error);
    }
}