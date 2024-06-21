import { POSITIONS } from '../../assets/data/constants.js';

class Player {
  constructor(player, element, x, y) {
    Object.assign(this, { element, x, y, ...player });
    this.id = player.position + player.depth;
  }

  paint() {
    const { id, jersey, isOffense, x, y, element } = this;
    let playerNode = document.getElementById(id);
    if (playerNode) {
      element.removeChild(playerNode);
    } else {
      playerNode = document.createElement('div');
      playerNode.id = id;
      playerNode.innerText = jersey;
      playerNode.classList.add('player', isOffense ? 'offense' : 'defense');
      playerNode.style.left = x + 'px';
      playerNode.style.top = y + 'px';
    }
    element.appendChild(playerNode);
  }

  move(ctx, unit) {}

  clear(ctx, unit) {}
}

export default Player;
