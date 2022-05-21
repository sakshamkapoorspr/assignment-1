// import data
import DataList from "./data.js";

// render image list to html
const imageList = document.querySelector(".image-list");

const renderListItems = (DataList) => {
  let listHtml = ``;
  DataList.forEach((item) => {
    const listItemHtml = `
            <li class="image-list-item">
                <img
                    src=${item.previewImage}
                    alt=${item.title}
                />
                <p></p>
            </li>
        `;
    listHtml += listItemHtml;
  });
  imageList.innerHTML = listHtml;
};

renderListItems(DataList);

// select newly created list items
const listItems = document.querySelectorAll(".image-list-item");
let currentActiveElementIndex = 0;
listItems[currentActiveElementIndex].classList.add("active");

const setEllipsesTitle = (listItem, index) => {
  const titleContainer = listItem.lastElementChild;
  let title = DataList[index].title;
  if (title.length > 26) {
    title =
      title.slice(0, 14) + "..." + title.slice(title.length - 9, title.length);
  }
  titleContainer.innerHTML = title;
};

const initialTagSetup = (listItems, DataList) => {
  listItems.forEach((item, index) => {
    setEllipsesTitle(item, index, DataList);
  });
};

initialTagSetup(listItems, DataList);

// make list items clickable
const previewImage = document.querySelector(".preview img");
const previewTitle = document.querySelector(".preview input");

const selectListItem = (newActiveIndex) => {
  listItems[currentActiveElementIndex].classList.remove("active");
  listItems[newActiveIndex].classList.add("active");
  previewImage.setAttribute("src", DataList[newActiveIndex].previewImage);
  previewTitle.setAttribute("value", DataList[newActiveIndex].title);
  currentActiveElementIndex = newActiveIndex;
};

listItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    selectListItem(index);
  });
});
