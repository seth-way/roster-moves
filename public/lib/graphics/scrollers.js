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

const createObserverCB = targetDivs => entries => {
  let featuredIdx;
  targetDivs.forEach((div) =>
    div.classList.remove('featured', 'featured-1', 'featured-2')
  );

  for (const entry of entries) {
    if (entry.target.id && entry.intersectionRatio === 1) {
      entry.target.classList.add('featured');
      featuredIdx = parseInt(entry.target.getAttribute('idx')) + 2;
      break;
    }
  }

  for (const delta of [1, 2]) {
    for (const dir of [-1, 1]) {
      const target = targetDivs[featuredIdx + delta * dir];
      if (target) target.classList.add(`featured-${delta}`);
    }
  }
};

export const createObserver = scroller => {
  const observerOptions = {
    root: scroller,
    rootMargin: '-35% 5% -35% 5%',
    threshold: [0.95, 1],
  };
  const targets = scroller.querySelectorAll('li');
  const observer = new IntersectionObserver(
    createObserverCB(targets),
    observerOptions
  );

  targets.forEach(target => observer.observe(target));
};

export const createScroller = (data, scroller, type) => {
  const viewPort = document.createElement('ol');
  viewPort.classList.add('scroller-viewport');
  scroller.appendChild(viewPort);

  // const featureWindow = document.createElement('div');
  // featureWindow.setAttribute('id', `feature-${type}-window`);
  // featureWindow.classList.add('feature-window');

  // // scroller.appendChild(featureWindow);
  // viewPort.appendChild(featureWindow);

  viewPort.appendChild(createBlankSpace());
  viewPort.appendChild(createBlankSpace());

  data.forEach((item, idx) => {
    item.idx = idx;
    const processedItem =
      type === 'teams' ? createTeamsContext(item) : createYearContext(item);
    viewPort.appendChild(createElement(processedItem));
  });

  viewPort.appendChild(createBlankSpace());
  viewPort.appendChild(createBlankSpace());
};

export const createTeamsContext = team => {
  const context = document.createElement('img');
  context.setAttribute('src', team.logo);
  context.setAttribute('alt', `${team.name} logo`);
  team.context = context;
  return team;
};

export const createYearContext = () => {};
