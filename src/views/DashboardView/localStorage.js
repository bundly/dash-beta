import { trelloData } from './data';

export const loadTrelloState = () => {
  try {
    const serializedData = localStorage.getItem('trello-tasks');
    // If key doesn't exist
    if (serializedData == null) {
      return trelloData;
    }

    return JSON.parse(serializedData);
  } catch (err) {
    return trelloData;
  }
};

export const saveTrelloState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('trello-tasks', serializedState);
  } catch (err) {
    console.log(err);
  }
};
