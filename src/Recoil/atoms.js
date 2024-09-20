import { atom, selector } from 'recoil';
import axios from 'axios';

// Data atom
export const dataState = atom({
  key: 'dataState',
  default: {
    loading: false,
    allTickets: [],
    allUser: [],
  },
});

// Select data atom
export const selectDataState = atom({
  key: 'selectDataState',
  default: {
    loading: false,
    selectedData: [],
    user: null,
    message: '',
  },
});

// Group and order atoms
export const groupState = atom({
  key: 'groupState',
  default: 'status',
});

export const orderValueState = atom({
  key: 'orderValueState',
  default: 'priority',
});

// Fetch data selector
export const fetchDataSelector = selector({
  key: 'fetchDataSelector',
  get: async () => {
    try {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment/"
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return { tickets: [], users: [] };
    }
  },
});

// Fetch data trigger atom
export const fetchDataTrigger = atom({
  key: 'fetchDataTrigger',
  default: 0,
});

// Data fetch effect selector
export const dataFetchEffect = selector({
  key: 'dataFetchEffect',
  get: ({ get }) => {
    const data = get(fetchDataSelector);
    return data;
  },
  set: ({ set }, newValue) => {
    if (newValue && newValue.tickets && newValue.users) {
      set(dataState, (prevState) => ({
        ...prevState,
        loading: false,
        allTickets: newValue.tickets,
        allUser: newValue.users,
      }));
    } else {
      console.error('Invalid data structure received:', newValue);
    }
  },
});

// Select data selector
export const selectedDataSelector = selector({
  key: 'selectedDataSelector',
  get: ({ get }) => {
    const { allTickets, allUser } = get(dataState);
    const group = get(groupState);
    const orderValue = get(orderValueState);

    let user = false;
    let mySet = new Set();
    let arr = [], selectedData = [];

    if (group === "status") {
      allTickets.forEach((element) => {
        mySet.add(element.status);
      });
      arr = [...mySet];
      arr.forEach((element, index) => {
        let arr = allTickets.filter((fElement) => {
          return element === fElement.status;
        });
        selectedData.push({
          [index]: {
            title: element,
            value: arr,
          },
        });
      });
    } else if (group === "user") {
      user = true;
      allUser.forEach((element, index) => {
        arr = allTickets.filter((Felement) => {
          return element.id === Felement.userId;
        });
        selectedData.push({
          [index]: {
            title: element.name,
            value: arr,
          },
        });
      });
    } else {
      let prior_list = ["No priority", "Urgent", "High", "Medium", "Low"];
      prior_list.forEach((element, index) => {
        arr = allTickets.filter((fElement) => {
          return index === fElement.priority;
        });
        selectedData.push({
          [index]: {
            title: element,
            value: arr,
          },
        });
      });
    }

    if (orderValue === "title") {
      selectedData.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
      });
    }
    if (orderValue === "priority") {
      selectedData.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => b.priority - a.priority);
      });
    }

    return { selectedData, user };
  },
});
