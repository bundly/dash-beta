import { v4 as uuid } from 'uuid';

export const todoData = `
### To Do:
 - Hurrah! Nothing left to do!
`;

export const trelloData = {
  lanes: [
    {
      id: uuid(),
      title: 'Planned Tasks',
      cards: [
        {
          id: uuid(),
          title: 'Perform task X',
          description: `* Create an issue on gh
* Open a PR
* Ask for review`,
          label: '30 mins'
        },
        {
          id: uuid(),
          title: 'Attend webinar Y',
          description: `* Link: [zoom-meet](https://zoom.com)
* Clear doubts P and Q
* ![some-image](https://guides.github.com/features/issues/listing-screen.png)`,
          label: '5 mins',
          metadata: { sha: 'be312a1' }
        }
      ]
    },
    {
      id: uuid(),
      title: 'Completed',
      cards: []
    }
  ]
};
