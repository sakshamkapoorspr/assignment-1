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
                <p data-original=${item.title.replaceAll(" ", "-")}></p>
            </li>
        `;
    listHtml += listItemHtml;
  });
  imageList.innerHTML = listHtml;
};

renderListItems(DataList);

// select newly created list items
const listItems = document.querySelectorAll(".image-list-item");
const currentActiveElementIndex = 0;
listItems[currentActiveElementIndex].classList.add("active");

const setEllipsesTitle = (listItem) => {
  const titleContainer = listItem.lastElementChild;
  let title = titleContainer.dataset.original.replaceAll("-", " ");
  if (title.length > 26) {
    title =
      title.substr(0, 14) +
      "..." +
      title.substr(title.length - 9, title.length);
  }
  titleContainer.innerHTML = title;
};

const initialTagSetup = (listItems) => {
  listItems.forEach((item) => {
    setEllipsesTitle(item);
  });
};

initialTagSetup(listItems);
