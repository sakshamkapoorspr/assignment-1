const imageList = document.querySelector(".image-list");
const previewImage = document.querySelector(".preview img");
const previewTitle = document.querySelector(".preview textarea");
let currentActiveElementIndex = 0;

const fetchListData = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

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

  // get listItems
  const listItems = document.querySelectorAll(".image-list-item");
  return listItems;
};

const setEllipsesTitle = (listItem, index, listData) => {
  const titleContainer = listItem.lastElementChild;
  let title = listData[index].title;
  if (title.length > 26) {
    title =
      title.slice(0, 14) + "..." + title.slice(title.length - 9, title.length);
  }
  titleContainer.innerHTML = title;
};

const initialTagSetup = (listItems, listData) => {
  listItems.forEach((item, index) => {
    setEllipsesTitle(item, index, listData);
  });
};

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
  initialTagSetup,
  selectListItem,
  setEllipsesTitle,
  currentActiveElementIndex,
};
