const desktop_header_items = document.querySelectorAll('.desktop-header--item');
const section_container = document.querySelector('.section__custom_collection');
const link_to_collection = document.querySelector('.link_to_collection');
const dropdown = document.querySelector('#collection_dropdown');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const storeParams = urlParams.get('data-filter');

let css = '',
head = document.head || document.getElementsByTagName('head')[0],
style = document.createElement('style');
style.setAttribute('id', 'custom_styling');

style.type = 'text/css';
head.appendChild(style);




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
        showProducts('all');
    }
    else{
        document.querySelector(`.desktop-header--item[data-collection=${storeParams}]`).setAttribute('active','')
        updateLinkCta(storeParams);
        showProducts(storeParams);
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
        showProducts(desktop_header_items[i].getAttribute('data-collection'));
    });
}

// add dropdown functions
dropdown.addEventListener('change', () => {
    section_container.setAttribute('data-collection-filter', dropdown.value);
    window.history.pushState('', ``, `custom-collection?data-filter=${dropdown.value}`)
    updateLinkCta(section_container.getAttribute('data-collection-filter'));
    updateLinkCta(dropdown.value);
    showProducts(dropdown.value);
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

function showProducts(filter){
    
    css = `[data-collection-filter="${filter}"] .product-item[data-collection="${filter}"]{ display: flex }`
    style.replaceChildren(document.createTextNode(css));
}

window.addEventListener('resize', () => {
    const queryString2 = window.location.search;
    const urlParams2 = new URLSearchParams(queryString2);
    const storeParams2 = urlParams2.get('data-filter');
    for(var x = 0; x < desktop_header_items.length; x++){
        desktop_header_items[x].removeAttribute('active');
    }
    document.querySelector(`.desktop-header--item[data-collection=${storeParams2}]`).setAttribute('active','')
    dropdown.value = storeParams2;
})