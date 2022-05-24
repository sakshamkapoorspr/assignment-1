const previewImage = document.querySelector(".preview img");
const previewTitle = document.querySelector(".preview textarea");
let currentActiveElementIndex = 0; // denotes current highlighted element

// fetches data from 'URL' using standard fetch api
const fetchListData = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

// renders array of objects (data) to html list
const renderListItems = (DataList) => {
  let listHtml = ``;
  DataList.forEach((item) => {
    const listItemHtml = `
              <li class="image-list-item">
                  <img
                      src=${item.previewImage}
                      alt=${item.title}
                  />
                  <p class="tooltip tooltip-top"></p>
              </li>
          `;
    listHtml += listItemHtml;
  });

  const imageList = document.querySelector(".image-list"); // ul tag
  imageList.innerHTML = listHtml;

  const listItems = document.querySelectorAll(".image-list-item"); // li tags
  return listItems;
};

// get text width in pixels
const getTextWidth = (text) => {
  const tag = document.createElement("div");
  tag.style.position = "absolute";
  tag.style.whiteSpace = "nowrap";
  tag.innerText = text;
  document.body.appendChild(tag);
  const result = tag.clientWidth;
  document.body.removeChild(tag);
  return result;
};

// implements ellipsis effect on given list item
const setEllipsisTitle = (listItem, index, listData) => {
  const titleContainer = listItem.lastElementChild; // selects p tag inside list item
  const titleContainerWidth = 200; // fix width container excluding padding
  let title = listData[index].title; // gets original title

  const titleWidth = getTextWidth(title); // gets hypothetical width of text

  if (titleWidth > titleContainerWidth) {
    let widthPerCharacter = Math.ceil(titleWidth / title.length);
    widthPerCharacter += 0.1 * widthPerCharacter; // margin of safety

    const totalCharactersAllowed = Math.floor(
      titleContainerWidth / widthPerCharacter
    );

    title =
      title.slice(0, totalCharactersAllowed / 2) +
      "..." +
      title.slice(
        title.length -
          (totalCharactersAllowed - totalCharactersAllowed / 2 - 3),
        title.length
      );
  }
  titleContainer.innerHTML = title;
  titleContainer.setAttribute("data-tooltip", listData[index].title);
};

// set ellipsis effect for initial list items
const initialTitleSetup = (listItems, listData) => {
  listItems.forEach((item, index) => {
    setEllipsisTitle(item, index, listData);
  });
};

// selects list item, previews image and title
const selectListItem = (newActiveIndex, listItems, listData) => {
  listItems[currentActiveElementIndex].classList.remove("active");
  listItems[newActiveIndex].classList.add("active");
  previewImage.setAttribute("src", listData[newActiveIndex].previewImage);
  previewTitle.value = listData[newActiveIndex].title;
  currentActiveElementIndex = newActiveIndex;
};

export {
  fetchListData,
  renderListItems,
  initialTitleSetup,
  selectListItem,
  setEllipsisTitle,
  currentActiveElementIndex,
};
