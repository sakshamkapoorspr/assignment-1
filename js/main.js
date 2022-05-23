import {
  fetchListData,
  renderListItems,
  initialTagSetup,
  selectListItem,
  currentActiveElementIndex,
  setEllipsesTitle,
} from "./utils.js";

const API_URL =
  "https://raw.githubusercontent.com/sakshamkapoorspr/assignment-1/main/data/data.json";

const app = async (URL) => {
  const data = await fetchListData(URL);

  const listItems = renderListItems(data);
  initialTagSetup(listItems, data);
  selectListItem(0, listItems, data);

  listItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      selectListItem(index, listItems, data);
    });
  });

  document.addEventListener("keydown", (e) => {
    let newIndex = 0;
    if (e.code === "ArrowDown") {
      newIndex = (currentActiveElementIndex + 1) % data.length;
    } else if (e.code === "ArrowUp") {
      newIndex = (currentActiveElementIndex - 1 + data.length) % data.length;
    } else {
      return;
    }
    selectListItem(newIndex, listItems, data);
  });

  const previewTitle = document.querySelector(".preview textarea");
  previewTitle.addEventListener("input", (e) => {
    data[currentActiveElementIndex].title = e.target.value;
    setEllipsesTitle(
      listItems[currentActiveElementIndex],
      currentActiveElementIndex,
      data
    );
  });
};

app(API_URL);
