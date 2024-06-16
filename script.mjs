import Swappable from 'https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Swappable/Swappable.mjs';

const swappable = new Swappable(document.querySelectorAll('table'), {
  draggable: 'td',
});

// Mapping tile numbers to their positions in a 3x3 grid
const positions = new Map([
  ['1', [0, 0]],
  ['2', [1, 0]],
  ['3', [2, 0]],
  ['4', [0, 1]],
  ['5', [1, 1]],
  ['6', [2, 1]],
  ['7', [0, 2]],
  ['8', [1, 2]],
  ['empty', [2, 2]]  // Assuming '0' is the empty space
]);

// Check if two positions are adjacent

swappable.on('swappable:start', (event) => {
  const clickedItemId = event.data.dragEvent.source.id;

  let dist1 = positions.get(clickedItemId);
  let dist2 = positions.get('empty');
  const distance = Math.sqrt(Math.pow((dist2[0]-dist1[0]),2)+Math.pow(dist2[1]-dist1[1],2));
  if (distance !== 1){
    event.cancel();
  }
});

swappable.on('swappable:swap',(event)=>{
  const droppeditemid = event.over.id;
  console.log(droppeditemid);
  if (droppeditemid !== 'empty'){
    event.cancel();
  }
})

swappable.on('swappable:swapped', (event) => {
  const draggedItemId = event.data.dragEvent.source.id;
  console.log('drag',draggedItemId);
  let pos1 = positions.get(draggedItemId);
  let pos2 = positions.get('empty');
  positions.set('empty',pos1);
  positions.set(draggedItemId,pos2);
  console.log(positions);
  console.log('swappable:swapped');
});

swappable.on('swappable:stop', () => {
  console.log('swappable:stop');
});
