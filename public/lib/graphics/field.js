import { getCssVariableValue, getRandomElement } from '../helpers/utility.js';
import { getPlayerXY, normalizePlayer } from '../helpers/player.js';
import { movePlayer } from '../helpers/field.js';
import Player from './player.js';
// colors
const grass1 = getCssVariableValue('--grass1');
const grass2 = getCssVariableValue('--grass2');
const primary = getCssVariableValue('--primary');
// const secondary = getCssVariableValue('--secondary');
const accent = getCssVariableValue('--accent');

// const colors = {grass1, grass2, primary, secondary};

class Field {
  constructor(canvas, container, unit) {
    Object.assign(this, { canvas, container, unit });
    this.players = {};
    this.ctx = canvas.getContext('2d');
  }

  paint(unit = this.unit) {
    this.unit = unit;
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
      this.addPlayer(player);
    }
  }

  addPlayer(player) {
    const { players, unit } = this;
    const tenYards = 10 * unit;

    [player.x, player.y] = getPlayerXY(player, players, unit);
    player.isStarter = true;
    if (player.x < tenYards || player.y < tenYards) player.isStarter = false;
    if (player.x > 5 * tenYards) player.isStarter = false;
    if (player.y > 5 * tenYards) player.isStarter = false;

    players[player.id] = player;
    player.paint(unit);
  }

  addTeam(team, element) {
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

          this.addPlayer(new Player(player, element));
        }
      }
    }
  }

  removePlayer(player) {
    delete this.players[player.id];
  }

  animate() {
    const { players, unit } = this;
    const ids = Object.keys(players);
    if (ids.length > 80) {
      const id = getRandomElement(ids);
      const player = players[id];
      const element = document.getElementById(id);
      if (element.classList.length < 3) {
        if (player.isStarter) {
          element.classList.add('wiggle');

          element.addEventListener(
            'animationend',
            () => {
              element.classList.remove('wiggle');
            },
            { once: true }
          );
        } else {
          movePlayer(player, element, Object.values(players), unit);
        }
      }
    }

    setTimeout(() => {
      this.animate();
    }, 700);
  }
}

export default Field;
