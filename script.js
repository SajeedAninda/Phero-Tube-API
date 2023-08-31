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

let loadCards = async (categoryID) => {
    let url = `https://openapi.programming-hero.com/api/videos/category/${categoryID}`;
    let res = await fetch(url);
    let data = await res.json();
    let cardDataArr = data?.data;
    // console.log(cardDataArr);
    // console.log(typeof cardDataArr);
    let cardSegment = document.querySelector("#card-segment");
    let noCardSegment = document.querySelector("#no-card-segment");
    cardSegment.textContent = "";
    noCardSegment.textContent = "";
    // console.log(cardSegment);
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
            let cardDiv = document.createElement("div");
            cardDiv.innerHTML = `
            <div class="card flex flex-col gap-4">
                        <div class="img-div">
                            <img class="rounded-xl  h-[180px] w-[100%]" src="${cardData?.thumbnail}" alt="">
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
                                <p class="text-[#171717b3] text-sm">${cardData.others.views} views</p>
                            </div>
                        </div>
                    </div>
        `
            cardSegment.appendChild(cardDiv);
        })
    }


}







loadCards("1000");
loadSection();