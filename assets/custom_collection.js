const desktop_header_items = document.querySelectorAll('.desktop-header--item');
const section_container = document.querySelector('.section__custom_collection');
const link_to_collection = document.querySelector('.link_to_collection');
const dropdown = document.querySelector('#collection_dropdown');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const storeParams = urlParams.get('data-filter');



if(storeParams == '' || storeParams == null){
    window.history.pushState('', '', 'custom-collection?data-filter=all')
    section_container.setAttribute('data-collection-filter','all')
    dropdown.value = 'all';
}
else{
    section_container.setAttribute('data-collection-filter',storeParams)
    dropdown.value = storeParams;
}

//add attributes on load
window.addEventListener('load', () => {
    if(storeParams == '' || storeParams == null){
        document.querySelector(`.desktop-header--item[data-collection=all`).setAttribute('active','')
        
        updateLinkCta('all');
    }
    else{
        document.querySelector(`.desktop-header--item[data-collection=${storeParams}]`).setAttribute('active','')
        updateLinkCta(storeParams);
    }
});

// add click functions to header items
for(let i = 0; i < desktop_header_items.length; i++){
    desktop_header_items[i].addEventListener('click', (e) => {
        for(var x = 0; x < desktop_header_items.length; x++){
            desktop_header_items[x].removeAttribute('active');
        }
        desktop_header_items[i].setAttribute('active','');
        section_container.setAttribute('data-collection-filter', `${desktop_header_items[i].getAttribute('data-collection')}`)
        window.history.pushState('', `${desktop_header_items[i].getAttribute('data-collection')}`, `custom-collection?data-filter=${desktop_header_items[i].getAttribute('data-collection')}`)
        updateLinkCta(section_container.getAttribute('data-collection-filter'));
    });
}

// add dropdown functions
dropdown.addEventListener('change', () => {
    section_container.setAttribute('data-collection-filter', dropdown.value);
    window.history.pushState('', ``, `custom-collection?data-filter=${dropdown.value}`)
    updateLinkCta(section_container.getAttribute('data-collection-filter'));
    updateLinkCta(dropdown.value);
})

// update 'VIEW ALL' CTA
function updateLinkCta(filter){
    if( section_container.getAttribute('data-collection-filter') == 'all' ){
        link_to_collection.innerText = 'view all products'
    }else{
        link_to_collection.innerText = `view all ${section_container.getAttribute('data-collection-filter')}`
    }

    link_to_collection.addEventListener('click', () => {
        location.href = `/collections/${filter}`
    });
}