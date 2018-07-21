const COMMANDS = ['nick', 'think', 'oops', 'fadelast', 'highlight', 'countdown']

export const isCommand = (message) => /\/\w+/.test(message)

export const commandExist = (command) => COMMANDS.includes(command)

export const executeCommand = (message) => {
  const [command, ...args] = message.replace('/', '').split(' ')
  commandExist(command) && console.info(`Executing command "${command}" with arguments: "${args.join(' ')}".`)
}
