import {
  fetchListData,
  renderListItems,
  initialTitleSetup,
  selectListItem,
  currentActiveElementIndex,
  setEllipsisTitle,
} from "./utils.js";

const API_URL =
  "https://raw.githubusercontent.com/sakshamkapoorspr/assignment-1/main/data/data.json";

const app = async (URL) => {
  // get image list data
  const data = await fetchListData(URL);

  const listItems = renderListItems(data); // li tags
  initialTitleSetup(listItems, data); // applies ellipsis effect on list item titles
  selectListItem(currentActiveElementIndex, listItems, data); // selects current active list item

  // add click event listeners on list items (li tags)
  listItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      selectListItem(index, listItems, data);
    });
  });

  // enable keyboard controls for list item navigation
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

  // enable renaming of list item titles
  const previewTitle = document.querySelector(".preview textarea");
  previewTitle.addEventListener("input", (e) => {
    data[currentActiveElementIndex].title = e.target.value;
    setEllipsisTitle(
      listItems[currentActiveElementIndex],
      currentActiveElementIndex,
      data
    );
  });
};

// enable theme toggler
document.getElementById("chk").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// runs app
app(API_URL);
