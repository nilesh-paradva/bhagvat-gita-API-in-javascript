let chapView = document.getElementById("data-print");
let chaData = document.getElementById("chap-data");
let verseData = document.getElementById("verse");
let modalData = document.getElementById("modal-data");

// chapterView
fetch("https://vedicscriptures.github.io/chapters").then(response => response.json()).then(data => {
        data.forEach(element => {
            chapView.innerHTML += `
                <li class="d-flex list align-items-center justify-content-between rounded-3 p-3 me-2 mb-3 border-bottom chapter-item" style="cursor: pointer;" onclick="return getData(${element.chapter_number}, ${element.verses_count}, this)">
                    <div class="first-part d-flex align-items-center">
                        <div class="number me-4">
                            <p class="m-0 text-white">${element.chapter_number}</p>
                        </div>
                        <div class="slock-verses">
                            <a href="#" class="text-decoration-none">
                                <h5 class="m-0" style="color: #93B1A6;">${element.translation}</h5>
                                <p class="m-0">
                                    <span class="me-1"><i class="fa-solid fa-bars-staggered text-warning"></i></span>
                                    <span class="me-2" style="color: #76ABAE;">${element.verses_count}</span>
                                    <span style="color: #F2613F;">verses</span>
                                </p>
                            </a>
                        </div>
                    </div>
                    <div class="second-part">
                        <i class="fa-solid fa-hand-point-right fs-5 text-warning"></i>
                    </div>
                </li>`;
                const chapterItem = document.querySelectorAll('.chapter-item');
                if (chapterItem.length > 1) {
                    chapterItem[0].click(); 
                }
        });
    }).catch(error => {
        console.log("Error fetching chapters:", error);
    });

const getData = (number, count, element) => {
    
    const activeChapter = document.querySelector('.chapter-item.active');
    if (activeChapter) {
        activeChapter.classList.remove('active');
    }

    element.classList.add('active');
//click slock chapter data view
    fetch(`https://vedicscriptures.github.io/chapter/${number}`).then(response => response.json()).then(data => {
            chaData.innerHTML = `
                <h2 class="text-center text-info">
                    <img src="images/1.webp" alt="flower image" class="img-fluid me-2" width="30"> Chapter ${data.chapter_number} <img src="images/1.webp" alt="flower image" class="img-fluid ms-2" width="30">
                </h2>
                <h3 class="chap-name text-center" style="color: #F97300;">${data.translation}</h3>
                <p class="text-center text-white">${data.summary.en}</p>
            `;
        }).catch(error => {
            console.log("Error fetching chapter data:", error);
        });

    // Fetch verses
    const promises = [];
    for (let i = 1; i <= count; i++) {
        promises.push(
            fetch(`https://vedicscriptures.github.io/slok/${number}/${i}`).then(response => response.json()).catch(error => {
                    console.log(`Error fetching sloka ${i} data:`, error);
                    return null;
            })
        );
    }

    Promise.all(promises).then(results => {
            verseData.innerHTML = "";
            results.forEach(data => {
                if (data) {
                    verseData.innerHTML += `
                        <div class="main-box list p-2 border-bottom rounded-3 mb-3 verse-item" data-bs-target="#getslockData" data-bs-toggle="modal" style="cursor: pointer;" onclick="return slokGet(this,${data.chapter},${data.verse})">
                            <h3 style="color: #E2DFD0;">
                                <i class="fa-brands fa-pagelines text-success me-3"></i>Verse ${data.verse}
                            </h3>
                            <p style="color: #556d85;" class="fw-bold">${data.siva.et}</p>
                        </div>`;
                }
            });
        }).catch(error => {
            console.log("Error processing sloka data:", error);
        });
}
//verse click slock data view
const slokGet = (element, chap, id) => {
    fetch(`https://vedicscriptures.github.io/slok/${chap}/${id}`).then(response => response.json()).then((data) => {
        modalData.innerHTML = `<div class="col-12 mb-5">
                            <h3 class="text-center mb-3 text-warning"><img src="images/3.png" width="60px" alt="geeta book image"><span class="border-bottom rounded-3 p-3">Verse</span><img src="images/3.png" width="60px" alt="geeta book image" style="transform: rotate(72deg);"></h3>
                            <p class="text-center text-danger fs-5">${data.verse}</p>
                        </div>
                        <div class="col-12 mb-5">
                            <h3 class="text-center mb-3 text-warning"><img src="images/3.png" width="60px" alt="geeta book image"><span class="border-bottom rounded-3 p-3">Slok</span><img src="images/3.png" width="60px" alt="geeta book image" style="transform: rotate(72deg);"></h3>
                            <p class="text-center text-danger fs-5">${data.slok}</p>
                        </div>
                        <div class="col-12 mb-5">
                            <h3 class="text-center mb-3 text-warning"><img src="images/3.png" width="60px" alt="geeta book image"><span class="border-bottom rounded-3 p-3">Author</span><img src="images/3.png" width="60px" alt="geeta book image" style="transform: rotate(72deg);"></h3>
                            <p class="text-center text-success fs-5">${data.siva.author}</p>
                        </div>
                        <div class="col-12 mb-5">
                            <h3 class="text-center mb-3 text-warning"><img src="images/3.png" width="60px" alt="geeta book image"><span class="border-bottom rounded-3 p-3">Transliteration</span><img src="images/3.png" width="60px" alt="geeta book image" style="transform: rotate(72deg);"></h3>
                            <p class="text-center text-success fs-5">${data.transliteration}</p>
                        </div>
                        <div class="col-12 mb-5">
                            <h3 class="text-center mb-3 text-warning"><img src="images/3.png" width="60px" alt="geeta book image"><span class="border-bottom rounded-3 p-3">Translation</span><img src="images/3.png" width="60px" alt="geeta book image" style="transform: rotate(72deg);"></h3>
                            <p class="text-center text-success fs-5">${data.siva.et}</p>
                        </div>
                        <div class="col-12">
                            <h3 class="text-center mb-3 text-warning"><img src="images/3.png" width="60px" alt="geeta book image"><span class="border-bottom rounded-3 p-3">Commentary</span><img src="images/3.png" width="60px" alt="geeta book image" style="transform: rotate(72deg);"></h3>
                            <p class="text-center text-success fs-5">${data.siva.ec}</p>
                        </div>`
        
    }).catch(error => {
        console.log("error", error);
    })

    const activeVerse = document.querySelector('.verse-item.active');
    if (activeVerse) {
        activeVerse.classList.remove('active');
    }

    element.classList.add('active');
}