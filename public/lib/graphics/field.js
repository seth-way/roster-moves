import { getCssVariableValue } from '../helpers/utility.js';
import { getPlayerXY, normalizePlayer } from '../helpers/player.js';
import Player from './player.js';
// colors
const grass1 = getCssVariableValue('--grass1');
const grass2 = getCssVariableValue('--grass2');
const primary = getCssVariableValue('--primary');
// const secondary = getCssVariableValue('--secondary');
const accent = getCssVariableValue('--accent');

// const colors = {grass1, grass2, primary, secondary};

class Field {
  constructor(canvas, container) {
    this.players = {};
    Object.assign(this, { canvas, container });
    this.canvas.id = Date.now();
    this.ctx = canvas.getContext('2d');
  }

  paint(unit) {
    const { ctx, players, width, container } = this;
    ctx.clearRect(0, 0, width, width);
    this.width = container.clientWidth;
    // grass
    ctx.fillStyle = grass1;
    ctx.fillRect(0, 0, 60 * unit, 60 * unit);
    // defense endzone
    ctx.fillStyle = primary;
    ctx.fillRect(10 * unit, 0, 40 * unit, 10 * unit);
    // offense endzone
    ctx.fillStyle = accent;
    ctx.fillRect(10 * unit, 50 * unit, 40 * unit, 10 * unit);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.25 * unit;

    for (let i = 10; i <= 50; i += 5) {
      // main field alt grass
      if (i % 10) {
        ctx.fillStyle = grass2;
        ctx.fillRect(10 * unit, i * unit, 40 * unit, 5 * unit);
      }
      // 5 yard markers
      ctx.beginPath();
      ctx.moveTo(10 * unit, i * unit);
      ctx.lineTo(50 * unit, i * unit);
      ctx.stroke();
    }

    for (let i = 11; i < 50; i += 1) {
      // hash marks
      ctx.beginPath();
      ctx.moveTo(20 * unit, i * unit);
      ctx.lineTo(21 * unit, i * unit);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(39 * unit, i * unit);
      ctx.lineTo(40 * unit, i * unit);
      ctx.stroke();
    }
    // left sideline
    ctx.beginPath();
    ctx.moveTo(10 * unit, 0);
    ctx.lineTo(10 * unit, 60 * unit);
    ctx.stroke();
    // right sideline
    ctx.beginPath();
    ctx.moveTo(50 * unit, 0);
    ctx.lineTo(50 * unit, 60 * unit);
    ctx.stroke();
    // players
    for (const player of Object.values(players)) {
      const oldPlayerNode = document.getElementById(player.id);
      oldPlayerNode.remove();
      this.addPlayer(player, unit);
    }
  }

  addPlayer(player, unit) {
    const { players } = this;

    [player.x, player.y] = getPlayerXY(player, players, unit);
    players[player.id] = player;
    player.paint(unit);
  }

  addTeam(team, element, unit) {
    const { roster, baseO, baseD } = team;
    for (const [groupKey, group] of Object.entries(roster)) {
      const { positions } = group;

      let base = 'Special Teams';
      if (groupKey === 'offense') base = baseO;
      if (groupKey === 'defense') base = baseD;

      for (const position of Object.values(positions)) {
        const { abbreviation, players } = position;
        for (const [depth, playerInfo] of Object.entries(players)) {
          const player = normalizePlayer(
            playerInfo,
            abbreviation,
            depth,
            groupKey,
            base
          );
          this.addPlayer(new Player(player, element), unit);
        }
      }
    }
  }

  removePlayer(player) {
    delete this.players[player.id];
  }
}

export default Field;
