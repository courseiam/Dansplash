const grid = document.querySelector('.grid');
const htmlArray = []
const page = 1



const getImages = axios.get('https://api.unsplash.com/photos/', {
    params: {
        client_id: '4eb7b0a2d424f23026aff0be23ee0f36290dcfe9dee54bc69204a55f134a2a13',
        per_page: '10',
        page
    }
}).then( (response) => {
    response.data.forEach(d => {
        console.log(d)
        htmlArray.push(`<div class="grid-item"><img src="${d.urls.regular}"></img></div>`)
    });
}).then(() => {
    //console.log(htmlArray)
    const htmlOut = htmlArray.join('\n');
    grid.insertAdjacentHTML('beforeend', htmlOut)
    
}).then(() => {
    const msnry = new Masonry( grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

    imagesLoaded( grid ).on( 'progress', function() {
        // layout Masonry after each image loads
        msnry.layout();
    });
})