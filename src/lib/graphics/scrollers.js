const createElement = ({ id, context, idx }) => {
  const item = document.createElement('li');
  item.setAttribute('id', id);
  item.setAttribute('tabindex', '0');
  item.setAttribute('idx', idx);
  item.classList.add('scroller-item');
  const snapDiv = document.createElement('div');
  snapDiv.classList.add('scroller-snapper');
  snapDiv.appendChild(context);
  item.appendChild(snapDiv);
  return item;
};

const createBlankSpace = () => {
  const item = document.createElement('li');
  item.classList.add('scroller-item');
  return item;
};

const createObserverCB = (targetDivs, updateFeatured) => entries => {
  for (const entry of entries) {
    let team, year;
    if (entry.target.id && entry.intersectionRatio > 0.65) {
      entry.target.classList.add('featured');
      const featuredIdx = parseInt(entry.target.getAttribute('idx')) + 2;
      const featuredID = entry.target.id;

      if (parseInt(featuredID)) {
        year = parseInt(featuredID);
      } else {
        team = featuredID;
      }

      updateFeatured(team, year);

      targetDivs.forEach(div => {
        div.classList.remove('featured-1', 'featured-2');
        if (div !== entry.target) {
          div.classList.remove('featured');
        }
      });

      for (const delta of [1, 2]) {
        for (const dir of [-1, 1]) {
          const target = targetDivs[featuredIdx + delta * dir];
          if (target) target.classList.add(`featured-${delta}`);
        }
      }

      break;
    }
  }
};

export const createObserver = (scroller, updateFeatured) => {
  const observerOptions = {
    root: scroller,
    rootMargin: '-35% 5% -35% 5%',
    threshold: [0.05, 0.5, 0.95],
  };
  const targets = scroller.querySelectorAll('li');
  const observer = new IntersectionObserver(
    createObserverCB(targets, updateFeatured),
    observerOptions
  );

  targets.forEach(target => observer.observe(target));
};

export const createScroller = (data, scroller) => {
  const viewPort = document.createElement('ol');
  viewPort.classList.add('scroller-viewport');
  scroller.appendChild(viewPort);

  viewPort.appendChild(createBlankSpace());
  viewPort.appendChild(createBlankSpace());

  const itemProcessor =
    scroller.id === 'teams-scroller' ? createTeamContext : createYearContext;

  data.forEach((item, idx) => {
    item.idx = idx;
    const processedItem = itemProcessor(item);
    viewPort.appendChild(createElement(processedItem));
  });

  viewPort.appendChild(createBlankSpace());
  viewPort.appendChild(createBlankSpace());
};

export const createTeamContext = team => {
  const context = document.createElement('img');
  context.setAttribute('src', team.logo);
  context.setAttribute('alt', `${team.name} logo`);
  team.context = context;

  return team;
};

export const createYearContext = ({ year, idx }) => {
  const context = document.createElement('h2');
  context.innerText = `'${year.toString().slice(2)}`;

  const id = year;

  return { context, id, idx };
};
