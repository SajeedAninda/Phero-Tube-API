let loadSection = async () => {
    let url = "https://openapi.programming-hero.com/api/videos/categories";
    let res = await fetch(url);
    let data = await res.json();
    let sectionDataArr = data?.data;
    let sectionSegment = document.querySelector("#section-segment");
    sectionDataArr.forEach((section) => {
        let div = document.createElement("div");
        div.innerHTML = `
        <button onclick="loadCards('${section?.category_id}')" class="bg-[#25252533] py-2 px-4 rounded-lg text-[#252525] font-medium active:bg-[#FF1F3D] active:text-white">${section.category}</button>`
        sectionSegment.appendChild(div);
    })
}

let tempID = "1000";
let isSorted = false;

let loadCards = async (categoryID, shouldSort = false) => {
    tempID = categoryID;
    let url = `https://openapi.programming-hero.com/api/videos/category/${categoryID}`;
    let res = await fetch(url);
    let data = await res.json();
    let cardDataArr = data?.data;

    cardDataArr.forEach((cardData) => {
        cardData.others.views = parseFloat(cardData.others.views.replace(/[^0-9.]/g, ''));
    });
    if (shouldSort) {
        cardDataArr.sort((a, b) => b.others.views - a.others.views);
    }

    let cardSegment = document.querySelector("#card-segment");
    let noCardSegment = document.querySelector("#no-card-segment");
    cardSegment.textContent = "";
    noCardSegment.textContent = "";

    if (cardDataArr.length <= 0) {
        let emptyDiv = document.createElement("div");
        emptyDiv.classList = "flex flex-col gap-4 mt-3 justify-center items-center text-center w-full mx-auto";
        emptyDiv.innerHTML = `<img class="w-[180px] h-[180px]" src="Icon.png" alt="">
                            <h1 class="text-3xl text-[#171717] font-bold">Oops!! Sorry, There is no<br> content here</h1>
        `
        noCardSegment.appendChild(emptyDiv);
    }
    
    else {
        cardDataArr.forEach((cardData) => {
            let seconds = cardData?.others?.posted_date;
            let hrs = Math.floor(seconds / 3600);
            let secondsLeft = seconds % 3600;
            let mins = Math.floor(secondsLeft / 60);
            let cardDiv = document.createElement("div");
            cardDiv.innerHTML = `
            <div class="card flex flex-col gap-4">
                        <div class="img-div relative">
                            <img class="rounded-xl  h-[180px] w-[100%]" src="${cardData?.thumbnail}" alt="">
                            ${hrs || mins ? `<p class="text-xs bg-[#171717] text-white inline rounded-xl p-1 absolute bottom-3 right-2">${hrs}hrs ${mins}mins ago</p>` : ''}
                        </div>
                        <div class="content-div flex gap-3">
                            <div class="left-img">
                                <img class=" w-[40px] h-[40px] rounded-full" src="${cardData?.authors[0]?.profile_picture}" alt="">
                            </div>
                            <div class="right-content">
                                <h3 class="font-bold">${cardData?.title}</h3>
                                <div class="flex gap-x-2">
                                <p class="text-[#171717b3] text-sm">${cardData?.authors[0]?.profile_name}</p>
                                <p class="text-[#171717b3] text-sm">${cardData?.authors[0]?.verified ? "<img src='bluetick.png'>" : ""} </p>
                                </div>
                                <p class="text-[#171717b3] text-sm">${cardData.others.views}K views</p>
                            </div>
                        </div>
                    </div>
        `
            cardSegment.appendChild(cardDiv);
        })
    }
}

document.querySelector("#sortBtn").addEventListener("click", () => {
    isSorted = !isSorted;
    loadCards(tempID, isSorted);
    isSorted = !isSorted;
});

loadCards("1000");
loadSection();