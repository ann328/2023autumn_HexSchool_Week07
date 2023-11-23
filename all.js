axios
  .get(
    "https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json"
  )
  .then(function (res) {
    let data = res.data;
    showCard(data);
    addTicketBtn.addEventListener("click", function () {
      addCard(data);
      c3Chart(data);
    });
    regionSearch.addEventListener("change", function (e) {
      filter(data, e);
    });
    c3Chart(data);
  })
  .catch(function (error) {
    console.log(error);
    alert(`程式碼有錯誤！`);
  });

const ul = document.querySelector("ul");
const searchResultText = document.querySelector("#searchResult-text");
let showCard = (arr) => {
  let str = "";
  arr.forEach((v) => {
    str += `<li class="ticketCard">
        <div class="ticketCard-img">
            <a href="#">
                <img src="${v.imgUrl}"
                    alt="">
            </a>
            <div class="ticketCard-region">${v.area}</div>
            <div class="ticketCard-rank">${v.rate}</div>
        </div>
        <div class="ticketCard-content">
            <div>
                <h3>
                    <a href="#" class="ticketCard-name">${v.name}</a>
                </h3>
                <p class="ticketCard-description">
                ${v.description}
                </p>
            </div>
            <div class="ticketCard-info">
                <p class="ticketCard-num">
                    <span><i class="fas fa-exclamation-circle"></i></span>
                    剩下最後 <span id="ticketCard-num"> ${v.group} </span> 組
                </p>
                <p class="ticketCard-price">
                    TWD <span id="ticketCard-price">${v.price}</span>
                </p>
            </div>
        </div>
        </li>`;
  });
  ul.innerHTML = str;
};

//
const addTicketBtn = document.querySelector(".addTicketBtn");
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const form = document.querySelector("form");
const chart = document.querySelector("#chart");

let addCard = (arr) => {
  let obj = {};
  if (
    ticketName.value === "" ||
    ticketImgUrl.value === "" ||
    ticketRegion.value === "" ||
    ticketDescription.value === "" ||
    ticketNum.value === "" ||
    ticketPrice.value === "" ||
    ticketRate.value === ""
  ) {
    alert("請填寫完整資料！");
    return;
  } else {
    obj.id = arr.length;
    obj.name = ticketName.value;
    obj.imgUrl = ticketImgUrl.value;
    obj.area = ticketRegion.value;
    obj.description = ticketDescription.value;
    obj.group = ticketNum.value;
    obj.price = ticketPrice.value;
    obj.rate = ticketRate.value;
    arr.push(obj);
    searchResultText.textContent = `本次搜尋共 ${arr.length} 筆資料`;
    showCard(arr);
    form.reset();
  }
};
const regionSearch = document.querySelector(".regionSearch");
const cantFindArea = document.querySelector(".cantFind-area");
let filter = (data, e) => {
  let arr = [];
  data.forEach((v) => {
    if (e.target.value === v.area) {
      arr.push(v);
    } else if (e.target.value === "") {
      arr.push(v);
    }
  });
  if (arr.length == 0) {
    cantFindArea.style.display = "block";
  } else {
    cantFindArea.style.display = "none";
  }
  searchResultText.textContent = `本次搜尋共 ${arr.length} 筆資料`;
  showCard(arr);
};

function c3Chart(data) {
  let c3Area = {};
  data.forEach(function (v, i) {
    if (!c3Area[v.area]) {
      c3Area[v.area] = 1;
    } else {
      c3Area[v.area]++;
    }
  });

  let newArea = [];
  let area = Object.keys(c3Area);
  area.forEach(function (v, i) {
    let ary = [];
    ary.push(v);
    ary.push(c3Area[v]);
    newArea.push(ary);
  });

  const chart = c3.generate({
    bindto: "#chart",
    size: {
      height: 250,
      width: 250,
    },
    data: {
      columns: newArea,
      type: "donut",
      colors: {
        高雄: "#E68618",
        台中: "#5151D3",
        台北: "#26C0C7",
      },
    },
    donut: {
      title: "套票地區比重",
      width: 20,
      label: {
        show: false,
      },
    },
  });
}
