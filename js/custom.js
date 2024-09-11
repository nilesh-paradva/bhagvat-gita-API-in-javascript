const getDeta = () => {
    let chapter = document.getElementById("chapter").value;
    let verse = document.getElementById("verse").value;
    const apiLink = `https://vedicscriptures.github.io/slok/${chapter}/${verse}/`;

    if (chapter && verse) {
        fetch(apiLink).then(res => res.json()).then(data => {
            const allData = document.getElementById("view-data");
            allData.innerHTML = `<h2 class="h1 text-center"> chapter :- <span class="text-danger">${data.chapter}</span></h2>
                        <p class="text-center fw-bold fs-5"> verse :- <span class="text-danger">${data.verse}</span></p>
                        <p class="fw-bold fs-5 border-bottom pb-3"> Slok :- ${data.slok}</p>
                        <p class="fw-bold fs-5 border-bottom pb-3"> Author :- ${data.tej.author}</p>
                        <p class="fw-bold fs-5 border-bottom pb-3"> Hindi translation :- ${data.tej.ht}</p>
                        <p class="fw-bold fs-5  pb-3"> Transliteration :- ${data.transliteration}</p>` 
            }).catch(error => {
                `<h2 class="text-danger">Data not found ${error}</h2>`
            });
    } else {
        console.log("get data error");
    }
}