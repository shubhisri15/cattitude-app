export async function handler(event, context) {
    const giphyAPIAccessKey = process.env.VITE_GIPHY_API_KEY

    if (!GIPHY_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing Giphy API Key" }),
    };
    }

    // default
    const { emotion = "happy", pg13Checked = false } = event.queryStringParameters;
    const searchTerm = `${emotion}+cat`
    let endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${giphyAPIAccessKey}&tag=${searchTerm}`
    
    if (pg13Checked) {
        endpoint += `&rating=pg-13`
    }
    
    try {
        const response = await fetch(endpoint);
        const result = await response.json();
        
        console.log(result.data)

        if (result.data?.images?.original?.url) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                  src: result.data.images.original.url,
                  alt: `Cat feeling ${emotion}`,
                }),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "No GIF found for this emotion" }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error fetching GIF", details: error.message }),
        };
    }
}

exports.handler = getGif;
