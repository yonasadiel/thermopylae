const QUOTE_LOCAL_STORAGE_KEY = 'quote';
const QUOTE_PRELOADED_RESOURCES = [
  'data/quote-life.json',
  'data/quote-pragmatic-programmer.json',
  'data/quote-programming.json',
];
const preloadedQuotes = [];
const activeQuotes = [];
// change every hour
let seed = Math.floor((new Date()).getTime() / (60 * 60 * 1000));

// Fisher–Yates shuffle, in place
const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  let randomSeed = 1337; // magic number because Math.random() is not seedable
  while (currentIndex != 0) {
    randomSeed = (1103515245 * randomSeed + 12345) % 2147483648; // Linear congruential generator, glibc seed
    randomIndex = randomSeed % currentIndex;
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const loadQuotes = () => {
  activeQuotes.length = 0;
  const quoteData = JSON.parse(localStorage.getItem(QUOTE_LOCAL_STORAGE_KEY));
  if (!quoteData) {
    localStorage.setItem(QUOTE_LOCAL_STORAGE_KEY, JSON.stringify({ preloaded: ['life'] }));
    return loadQuotes();
  }
  if (!!quoteData?.quotes) {
    activeQuotes.push(...quoteData.quotes); // TODO: feature to manually add a quote
    console.log(`Loaded ${quoteData.quotes.length} from local storage`);
  }
  for (let i in quoteData?.preloaded) {
    const preloadedName = quoteData.preloaded[i];
    const preloaded = preloadedQuotes.find((v) => (v.name === preloadedName));
    if (!preloaded) continue;
    activeQuotes.push(...preloaded.quotes);
    console.log(`Loaded ${preloaded.quotes.length} ${preloaded.title} quotes`);
  }
  shuffle(activeQuotes);
  renderQuotes();
}

const renderQuotes = () => {
  const quoteTextElement = document.getElementById('text');
  const quoteSubtextElement = document.getElementById('subtext');
  const navLine = document.getElementById('nav-line');
  navLine.innerHTML = '';

  if (activeQuotes.length === 0) {
    quoteTextElement.innerHTML = '';
    quoteSubtextElement.innerHTML = '';
  } else {
    const quote = activeQuotes[seed % activeQuotes.length];
    quoteTextElement.innerHTML = quote.text;
    quoteSubtextElement.innerHTML = quote.subtext || '';

    // create next button
    const nextQuoteButton = document.createElement('button');
    nextQuoteButton.setAttribute('type', 'button');
    nextQuoteButton.onclick = () => { seed += 1; renderQuotes(); }
    nextQuoteButton.innerHTML = 'Next >>';
    navLine.appendChild(nextQuoteButton);

    // create separator
    const separator = document.createElement('span');
    separator.innerHTML = ' | ';
    navLine.appendChild(separator);
  }

  const preloadedPickerButton = document.createElement('button');
  preloadedPickerButton.setAttribute('id', 'preloaded-picker');
  preloadedPickerButton.setAttribute('type', 'button');
  preloadedPickerButton.onclick = showQuotePickerDialog;
  preloadedPickerButton.innerHTML = 'Preloaded quotes...';
  navLine.appendChild(preloadedPickerButton);
}

const getPos = (el) => {
  let { top, left } = el.getBoundingClientRect();
  return [top, left];
}

const changePreloadedQuotes = (preloadedName, shouldActive) => {
  const quoteData = JSON.parse(localStorage.getItem(QUOTE_LOCAL_STORAGE_KEY));
  if (!quoteData.preloaded) quoteData.preloaded = [];
  if (shouldActive) {
    if (!quoteData.preloaded?.find((v) => v === preloadedName)) {
      quoteData.preloaded.push(preloadedName);
    }
  } else {
    quoteData.preloaded = quoteData.preloaded.filter((v) => (v !== preloadedName));
  }
  localStorage.setItem(QUOTE_LOCAL_STORAGE_KEY, JSON.stringify(quoteData));
  loadQuotes();
}

const showQuotePickerDialog = () => {
  const quoteData = JSON.parse(localStorage.getItem(QUOTE_LOCAL_STORAGE_KEY));
  
  const quoteOptions = document.getElementById('quote-options');
  quoteOptions.innerHTML = '';
  for (let k in preloadedQuotes) {
    const preloaded = preloadedQuotes[k];
    const label = document.createElement('label');
    label.className = 'checkbox-item';
    label.onchange = (e) => changePreloadedQuotes(preloaded.name, e.target.checked);

    const spanItemName = document.createElement('span');
    spanItemName.className = 'item-name';
    spanItemName.innerHTML = `${preloaded.title.charAt(0).toUpperCase()}${preloaded.title.slice(1)} quotes`;

    const inputCheckbox = document.createElement('input');
    if (!!quoteData?.preloaded?.find((v) => (v === preloaded.name))) {
      inputCheckbox.setAttribute('checked', 'checked');
    }
    inputCheckbox.setAttribute('type', 'checkbox');

    const spanCheckmark = document.createElement('span');
    spanCheckmark.className = 'checkmark';

    label.appendChild(inputCheckbox);
    label.appendChild(spanCheckmark);
    label.appendChild(spanItemName);
    quoteOptions.appendChild(label);
  }

  const preloadedPickerButton = document.getElementById('preloaded-picker');
  let { bottom: t, right: l } = preloadedPickerButton.getBoundingClientRect()

  const quotePreloadedPickerDialog = document.getElementById('quote-preloaded-picker-dialog');
  quotePreloadedPickerDialog.style = `top: ${t}px; left: ${l}px`;
  quotePreloadedPickerDialog.showModal();
}

const loadPreloadedQuotes = () => {
  const get = (url) => new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.addEventListener('load', (data) => {
      preloadedQuotes.push(JSON.parse(data.target.responseText));
      resolve();
    });
    req.open('GET', url);
    req.send();
  });
  return Promise.all(QUOTE_PRELOADED_RESOURCES.map((v) => get(v)))
}

loadPreloadedQuotes().then(() => loadQuotes());

