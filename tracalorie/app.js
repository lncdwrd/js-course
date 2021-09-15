const Storage = (function () {
  return {
    getItem(itemList) {
      if (localStorage.getItem(itemList) === null) {
        itemList = [];
      } else {
        itemList = JSON.parse(localStorage.getItem(itemList));
      }
  
      return itemList;
    },
  
    addItem(itemList, newItem) {
      const items = this.getItem(itemList);
  
      if (!items.some(item => item.name === newItem.name)) {
        items.push(newItem);
        localStorage.setItem(itemList, JSON.stringify(items));
      }
    },

    updateItem(itemList, itemToUpdate) {
      const items = this.getItem(itemList);

      items.forEach((index) => {
        if (item => item.id === itemToUpdate.id) {
          items.splice(index, 1, itemToUpdate);
          localStorage.setItem(itemList, JSON.stringify(items));
        }
      });
    },
  
    removeItem(itemList, item) {
      const items = this.getItem(itemList);
  
      items.forEach((index) => {
        if (item => item.id === item.id) {
          items.splice(index, 1);
          localStorage.setItem(itemList, JSON.stringify(items));
        }
      });
    },

    clearItems(itemList) {
      localStorage.removeItem(itemList);
    }
  }
})();

const TrackerData = (function () {
  class Item {
    constructor(id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
    }
  }

  const data = {
    items: Storage.getItem('Food'),
    currentItem: null,
    totalCalories: 0
  }

  // Helpers
  const generateId = function* () {
    let id = TrackerData.getItemsLength();
  
    while(true) {
      yield id;
      id++;
    }
  }

  return {
    getItems() {
      return data.items;
    },

    getItemsLength() {
      return data.items.length;
    },

    getItemById(itemId) {
      const idArray = itemId.split('-');
      const idNumber = parseInt(idArray[1]);

      return data.items.filter(item => item.id === idNumber)[0];
    },

    addItem(name, calories) {
      const idGenerator = generateId();

      calories = parseInt(calories);
      newItem = new Item(idGenerator.next().value, name, calories);

      data.items.push(newItem);

      return newItem;
    },

    updateItem(name, calories) {
      let itemToUpdate;

      calories = parseInt(calories);

      data.items.forEach((item) => {
        if (item.id === data.currentItem.id) {
          itemToUpdate = item;
          item.name = name;
          item.calories = calories;
        }
      });

      return itemToUpdate;
    },

    deleteItem(itemId) {
      data.items = data.items.filter(item => item.id !== itemId);
    },

    clearItems() {
      data.items = [];
    },

    setCurrentItem(item = null) {
      data.currentItem = item;
    },

    getCurrentItem() {
      return data.currentItem;
    },

    getTotalCalories() {
      data.totalCalories = data.items.reduce((total, item) => total + item.calories, 0);
      return data.totalCalories;
    },

    logData() {
      return data;
    }
  }
})();

const TrackerUI = (function () {
  // UI Selector
  const ui = {
    itemList: '#item-list',
    item: '.collection-item',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    totalCalories: '.total-calories'
  }

  // States
  const defaultState = () => {
    const addBtn = document.querySelector(ui.addBtn);

    clearFieldInput();

    setDisplayStyle('none',
      ui.updateBtn,
      ui.deleteBtn,
      ui.backBtn,
    );
    setDisplayStyle('inline', ui.addBtn);

    addBtn.disabled = false;
  };

  const editState = () => {
    const itemNameInput = document.querySelector(ui.itemNameInput);
    const itemCaloriesInput = document.querySelector(ui.itemCaloriesInput);
    const addBtn = document.querySelector(ui.addBtn);

    itemNameInput.value = TrackerData.getCurrentItem().name;
    itemCaloriesInput.value = TrackerData.getCurrentItem().calories;

    setDisplayStyle('inline',
      ui.updateBtn,
      ui.deleteBtn,
      ui.backBtn,
    );
    setDisplayStyle('none', ui.addBtn);

    addBtn.disabled = true;
  }

  // Helpers
  const setDisplayStyle = (property, ...elements) => {
    elements.forEach(element => {
      document.querySelector(element).style.display = property;
    });
  };

  const clearFieldInput = () => {
    document.querySelector(ui.itemNameInput).value = '';
    document.querySelector(ui.itemCaloriesInput).value = '';
  }

  return {
    displayItem(items) {
      const itemList = document.querySelector(ui.itemList);

      items.forEach((item) => {
        itemList.innerHTML += `
          <li id="item-${item.id}" class="collection-item">
            <strong>${item.name}</strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li>
        `;
      });
    },

    displayTotalCalories(calories) {
      const totalCalories = document.querySelector(ui.totalCalories);

      totalCalories.textContent = calories;
    },

    addItem(item) {
      const li = document.createElement('li');

      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name}</strong>
        <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `;

      document.querySelector(ui.itemList).appendChild(li);
    },

    updateItem(item) {
      const itemToUpdate = document.querySelector(`#item-${item.id}`);

      itemToUpdate.innerHTML = `
        <strong>${item.name}</strong>
        <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `;
    },

    deleteItem(itemId) {
      const item = document.querySelector(`#item-${itemId}`);

      item.remove();
    },

    clearItems() {
      const itemList = Array.from(document.querySelectorAll(ui.item));

      itemList.forEach((item) => item.remove());
    },

    getUISelectors() {
      return ui;
    },

    getFieldInput() {
      const itemNameInput = document.querySelector(ui.itemNameInput).value;
      const itemCaloriesInput = document.querySelector(ui.itemCaloriesInput).value;

      return {
        name: itemNameInput,
        calories: itemCaloriesInput
      }
    },

    clearFieldInput() {
      return clearFieldInput();
    },

    setPageState(state) {
      if (state === 'default') {
        defaultState();
      } else if (state === 'edit') {
        editState();
      }
    }
  }
})();

const App = (function (TrackerData, TrackerUI, Storage) {
  // Events
  const handleEventListeners = function () {
    const ui = TrackerUI.getUISelectors();
    const addBtn = document.querySelector(ui.addBtn);
    const itemList = document.querySelector(ui.itemList);
    const updateBtn = document.querySelector(ui.updateBtn);
    const backBtn = document.querySelector(ui.backBtn);
    const deleteBtn = document.querySelector(ui.deleteBtn);
    const clearBtn = document.querySelector(ui.clearBtn);

    addBtn.addEventListener('click', handleAddItem);
    itemList.addEventListener('click', handleEditItem);
    updateBtn.addEventListener('click', handleUpdateItem);
    deleteBtn.addEventListener('click', handleDeleteItem);
    backBtn.addEventListener('click', handleBackEvent);
    clearBtn.addEventListener('click', handleClearItems);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    
    const input  = TrackerUI.getFieldInput();

    if (input.name !== '' && input.calories !== '') {
      const newItem = TrackerData.addItem(input.name, input.calories);

      TrackerUI.addItem(newItem);
      TrackerUI.clearFieldInput();
      updateCalories();
      Storage.addItem('Food', newItem);
    }
  };

  const handleEditItem = (e) => {
    e.preventDefault();

    if (e.target.classList.contains('edit-item')) {
      const listId = e.target.parentNode.parentNode.id;
      const item = TrackerData.getItemById(listId);

      TrackerData.setCurrentItem(item);
      TrackerUI.setPageState('edit');
    }
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    
    const input = TrackerUI.getFieldInput();
    const updatedItem = TrackerData.updateItem(input.name, input.calories);

    TrackerUI.updateItem(updatedItem);
    updateCalories();
    Storage.updateItem('Food', updatedItem);
  };

  const handleDeleteItem = (e) => {
    e.preventDefault();

    const item = TrackerData.getCurrentItem();

    TrackerData.deleteItem(item.id);
    TrackerData.setCurrentItem();
    TrackerUI.setPageState('default');
    TrackerUI.deleteItem(item.id);
    updateCalories();
    Storage.removeItem('Food', item);
  };

  const handleBackEvent = (e) => {
    e.preventDefault();

    TrackerData.setCurrentItem();
    TrackerUI.setPageState('default');
  };

  const handleClearItems = (e) => {
    e.preventDefault();

    TrackerData.clearItems();
    TrackerUI.clearItems();
    updateCalories();
    Storage.clearItems('Food');
  }

  // Helpers
  const updateCalories = () => {
    const updatedTotalCalories = TrackerData.getTotalCalories();

    TrackerUI.displayTotalCalories(updatedTotalCalories);
  }

  return {
    init() {
      const items = TrackerData.getItems();
      const totalCalories = TrackerData.getTotalCalories();

      TrackerUI.setPageState('default');
      TrackerUI.displayItem(items);
      TrackerUI.displayTotalCalories(totalCalories);

      handleEventListeners();
    }
  }
})(TrackerData, TrackerUI, Storage);

App.init();