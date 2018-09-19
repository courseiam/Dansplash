const grid = document.querySelector('.grid');
const state = {
    page: 1,
    per_page: 10,
    order_by: 'popular'
}

const getImages = ((state) => {
    axios.get('https://api.unsplash.com/photos/', {
        params: {
            client_id: '4eb7b0a2d424f23026aff0be23ee0f36290dcfe9dee54bc69204a55f134a2a13',
            per_page: state.per_page,
            page: state.page,
            order_by: state.order_by
        }
    }).then( (response) => {
        //console.log(response.data)
        response.data.forEach(d => {
            grid.insertAdjacentHTML('beforeend', `<div class="grid-item">
                <figure>
                    <a href="${d.links.html}" target="_blank">
                        <img src="${d.urls.regular}"></img>
                    </a>
                </figure>
                <figcaption>${d.user.name}</figcaption>
            </div>`)
        });
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
})

const yHandler = () =>{
	
	const contentHeight = grid.offsetHeight;
	const yOffset = window.pageYOffset; 
	const scroll = window.scrollY; 
	const y = yOffset + window.innerHeight;
	//const y = scroll + window.innerHeight;
	if(y >= contentHeight){
        state.page++
        getImages(state)
        console.log('Fired!')
        console.log(state.page)
    }
}

const scrollEvent = _.throttle(yHandler, 300) 

window.onscroll = scrollEvent;

window.addEventListener('load', getImages(state));