const COMMANDS = ['nick', 'think', 'oops', 'fadelast', 'highlight', 'countdown']

// export const isCommand = (message) => /\/\w+/.test(message)

export const commandExist = (command) => COMMANDS.includes(command)

export const getCommand = (message) => {
  const [command, ...args] = message.replace('/', '').split(' ')

  return commandExist(command) ? { type: command, content: args.join(' ') } : undefined
}
