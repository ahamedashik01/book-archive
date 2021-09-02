// funtion for loading books 
const loadBooks = () => {
    const searchFieldId = document.getElementById('search-field');
    const searchResult = document.getElementById('search-result');
    const searchText = searchFieldId.value;
    // clear search data 
    searchFieldId.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    // error message
    if (searchText === '') {
        searchResult.innerHTML = `<p class ="text-center text-danger fs-3">'Nothing to search'</p>`;
        const displayOutput = document.getElementById('search-output');
        displayOutput.textContent = '';
    }
    else {
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data.numFound, data.docs))
    }
};
// function for displaying books 
const displayBooks = (result, books) => {
    const searchResult = document.getElementById('search-result');
    const displayOutput = document.getElementById('search-output');
    // clear data 
    displayOutput.textContent = '';
    // error message 
    if (result === 0) {
        searchResult.innerHTML = `<p class ="text-center text-danger fs-3">'404!!! No Result Found'</p>`
    }
    // search result 
    else {
        searchResult.innerHTML = `
                <p> 'showing <u><i>${books.length}</i></u> of <u><i>${result} </i></u>  results'</p>
    `;
    }
    // loop 
    books.forEach(book => {
        console.log(book);
        const url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        const div = document.createElement('div');
        let authorName = book.author_name;
        let publisher = book.publisher;
        let fistPublishYear = book.first_publish_year;
        // undefined error handle 
        if (authorName === undefined) {
            authorName = ['NA'];
        }
        if (publisher === undefined) {
            publisher = ['NA'];
        }
        if (fistPublishYear === undefined) {
            fistPublishYear = 'NA';
        }
        div.classList.add('col');
        div.innerHTML = `
                <div class="card w-100 h-100 shadow-lg">
                    <img src="${url}" style="width:150px; height:auto;" class="card-img-top w-75 d-inline-block mx-auto p-3" alt="...">
                    <div class="card-body">
                        <h5 class="card-title fw-bolder">${book.title}</h5>
                        <p class="card-text"><span class="text-danger fw-bold">Aurthor</span> : ${authorName[0]}</p>
                        <p class="card-text"><span class="text-danger fw-bold">Pulisher</span> : ${publisher[0]}</p>
                    </div>
                        <div class="card-footer">
                        <small class="text-muted"><span class="fw-lighter fst-italic">First Publish year</span> : '${fistPublishYear}'</small>
                    </div>
              </div>    
         `;
        displayOutput.appendChild(div);
    });
}