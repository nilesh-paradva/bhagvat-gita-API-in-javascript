let chapView = document.getElementById("data-print");
let chaData = document.getElementById("chap-data");
let verseData = document.getElementById("verse");
let modalData = document.getElementById("modal-data");

// dataView

fetch("https://vedicscriptures.github.io/chapters").then((response) => response.json()).then((data) => {
    data.forEach(element => {
        chapView.innerHTML += `<li class="d-flex list align-items-center justify-content-between rounded-3 p-3 me-2 border-bottom" style="cursor: pointer;"onclick = "return getData(${element.chapter_number},${element.verses_count})">
                                            <div class="first-part d-flex align-items-center">
                                                <div class="number me-4">
                                                    <p class="m-0 text-white">${element.chapter_number}</p>
                                                </div>
                                                <div class="slock-verses">
                                                    <a href="#" class="text-decoration-none"><h5 class="m-0" style="color: #93B1A6;">${element.translation}</h5>
                                                    <p class="m-0"><span class="me-1"><i class="fa-solid fa-bars-staggered text-warning"></i></span><span class="me-2" style="color: #76ABAE;">${element.verses_count}</span><span style="color: #F2613F;">verses</span></p></a>
                                                </div>
                                            </div>
                                            <div class="second-part">
                                                <i class="fa-solid fa-hand-point-right fs-5 text-warning"></i>
                                            </div>
                                       </li>`
    });

}).catch((error) => {
    console.log("error", error);
});

// slok View

const getData = (number, count) => {
    fetch(`https://vedicscriptures.github.io/chapter/${number}`).then(response => response.json()).then(data => {
        chaData.innerHTML = `<h2 class="text-center text-info">
                    <img src="images/1.webp" alt="flower image" class="img-fluid me-2" width="30">
                    Chapter ${data.chapter_number}
                    <img src="images/1.webp" alt="flower image" class="img-fluid ms-2" width="30">
                </h2>
                <h3 class="chap-name text-center" style="color: #F97300;">${data.translation}</h3>
                <p class="text-center text-white">${data.summary.en}</p>`;
    }).catch(error => {
        console.log("Error fetching chapter data:", error);
    });

    for (let i = 1; i <= count; i++) {
        verseData.innerHTML = "";
        fetch(`https://vedicscriptures.github.io/slok/${number}/${i}`).then(response => response.json()).then(data => {
            console.log("data id", data._id);

            verseData.innerHTML += `<div class="main-box list p-2 border-bottom rounded-3 mb-3" data-bs-target = "#getslockData" data-bs-toggle = "modal" style="cursor: pointer;" onclick = "return slokGet(${data._id},${data.verse})">
                                        <h3 style="color: #E2DFD0;"><i class="fa-brands fa-pagelines text-success me-3"></i>Verse ${data.verse}</h3>
                                        <p style="color: #556d85;" class="fw-bold">${data.siva.et}</p>
                                    </div>`
        }).catch(error => {
            console.log("Error fetching sloka data:", error);
        });
    }
}