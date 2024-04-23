const BANGS = [
  'data/bangs-work.json',
]
const loadedBangs = []

const terminalInputEl = document.getElementById('terminal-input')
const bangsEl = document.getElementById('bangs')

const render = (bangs, query) => {
  bangsEl.innerHTML = ''
  for (let i = 0; i < bangs.length; i++) {
    const processed = processBang(bangs[i], query)
    if (bangs.length === 1) {
      const targetUrl = document.createElement('p')
      targetUrl.innerText = processed.target
      const target = document.createElement('div')
      target.className = 'target'
      target.appendChild(targetUrl)
      bangsEl.appendChild(target)
    }
    for (let i in processed.suggestions) {
      const pattern = document.createElement('p')
      pattern.className = 'pattern'
      pattern.innerText = processed.suggestions[i]
      // const description = document.createElement('p')
      // description.className = 'description'
      // description.innerText = bangs[i].description
      const suggestion = document.createElement('div')
      suggestion.className = 'suggestion'
      suggestion.appendChild(pattern)
      // suggestion.appendChild(description)

      bangsEl.appendChild(suggestion)
    }
  }
}

const findBangs = (prefix) => {
  return prefix === ''
    ? []
    : loadedBangs.filter((b) => (
      b.commands.findIndex((cmd) => cmd.startsWith(prefix)) !== -1
    ))
}

const findOption = (word, options) => {
  for (let k in options) {
    if (k === word || options[k].aliases.findIndex((a) => a === word) !== -1) {
      return k
    }
  }
  return null
}

const processBang = (bang, query) => {
  const words = query.split(' ')
  const cmd = bang.commands.find((cmd) => cmd.startsWith(words[0] || ''))
  const processedParams = bang.params.map((p) => ({
    key: p.key,
    text: p.default,
    value: findOption(p.default, p.options) || p.default,
    default: true,
    original: p,
  }))

  // 1. Process the query
  let collectedDependencies = {}
  let lastProcessedParamIdx = 0
  for (let i = 1; i < words.length; i++) {
    const word = words[i]
    let paramIdx = processedParams.findIndex((p) => p.default)
    if (paramIdx === -1) continue;

    let option = null
    for (let j = 0; j < bang.params.length; j++) {
      const o = findOption(word, bang.params[j].options)
      if (!!o) {
        option = o
        paramIdx = j
        if (!!bang.params[j].options[o].dependencies) {
          collectedDependencies = { ...collectedDependencies, ...bang.params[j].options[o].dependencies }
        }
      }
    }
    processedParams[paramIdx].text = word
    processedParams[paramIdx].value = !!option ? option : word
    processedParams[paramIdx].default = false
    lastProcessedParamIdx = paramIdx
  }

  // 2. Calculate suggestions
  const suggestions = []
  if (words.length === 1) {
    suggestions.push(cmd)
  } else if (!processedParams[lastProcessedParamIdx].original.options) {
    const lastWord = words[words.length-1]
    const historyKey = processedParams[lastProcessedParamIdx].original.history
    const history = loadHistory(historyKey)
    suggestions.push(...Object.keys(history)
      .filter((v) => v.startsWith(lastWord))
      .sort((a, b) => history[a] < history[b] ? 1 : -1)
      .map((k) => words.filter((_, idx) => idx !== words.length-1).join(' ') + ' ' + k)
    )
  } else {
    const lastWord = words[words.length-1]
    suggestions.push(...Object.keys(processedParams[lastProcessedParamIdx].original.options)
      .filter((v) => v.startsWith(lastWord))
      .map((k) => words.filter((_, idx) => idx !== words.length-1).join(' ') + ' ' + k)
    )
  }

  // 3. Fill the rest of params, with dependency in mind
  for (let i = 0; i < processedParams.length; i++) {
    const param = processedParams[i]
    if (param.default && param.key in collectedDependencies) {
      param.value = collectedDependencies[param.key]
      param.text = findOption(collectedDependencies[param.key], processedParams[i].original.options)
    }
  }

  // 4. Generate the target
  let target = bang.target
  for (let i = 0; i < processedParams.length; i++) {
    const param = processedParams[i]
    target = target.replace('${'+param.key+'}', param.value)
  }

  return {
    title: [cmd, ...processedParams.map((p) => `[${p.key}:${p.text}]`)].join(' '),
    history: processedParams.filter((p) => !!p.original.history).map((p) => ({ key: p.original.history, value: p.value })),
    target: target,
    suggestions: suggestions,
  }
}

const recordHistory = (history) => {
  const terminal = JSON.parse(localStorage.getItem('terminal')) || { history: {} }
  for (let i = 0; i < history.length; i++) {
    const { key, value } = history[i]
    if (!(key in terminal.history)) {
      terminal.history[key] = {}
    }
    if (!(key in terminal.history)) {
      terminal.history[key][value] = 0
    }
    terminal.history[key][value] += 1
  }
  localStorage.setItem('terminal', JSON.stringify(terminal))
}

const loadHistory = (historyKey) => {
  const terminal = JSON.parse(localStorage.getItem('terminal')) || { history: {} }
  return terminal.history[historyKey] || {}
}

const loadBangs = () =>
  // new Promise((resolve) => resolve(JSON.parse(localStorage.getItem('bangs')) || {}))
  Promise.all(
    BANGS.map((url) => fetch(url).then((res) => res.json()))
  )

const preprocessBangs = (bangs) => {
  const flatten = []
  for (let i in bangs) {
    for (let j in bangs[i].bangs) {
      const bang = bangs[i].bangs[j]
      flatten.push(({
        ...bang,
        source: bangs[i].title,
        params: bang.params.map((p) =>
          !!bangs[i].paramsTemplate[p.template]
            ? { ...bangs[i].paramsTemplate[p.template], ...p }
            : p
        )
      }))
    }
  }
  return flatten
}

const onTerminalChange = (ev) => {
  const query = terminalInputEl.value

  const firstWord = query.split(' ')[0] || ''
  const bangs = findBangs(firstWord)
  if (ev.keyCode === 13 && !!bangs) { // enter
    const processed = processBang(bangs[0], query)
    recordHistory(processed.history)
    window.location.replace(processed.target)
  } else if (ev.keyCode === 9 && !!bangs) { // tab
    const processed = processBang(bangs[0], query)
    terminalInputEl.value = processed.suggestions[0]
    render(bangs, processed.suggestions[0])
  } else {
    render(bangs, query)
  }
}

loadBangs().then((res) => {
  loadedBangs.push(...preprocessBangs(res))
  console.log(`Loaded ${loadedBangs.length} bangs`)
  render([], '')
})

terminalInputEl.onchange = onTerminalChange
terminalInputEl.onkeyup = onTerminalChange
terminalInputEl.onkeydown = (ev) => {
  if (ev.keyCode === 9) ev.preventDefault()
}