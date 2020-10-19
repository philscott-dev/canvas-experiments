const execSync = require('child_process').execSync

async function main() {
  try {
    execSync('npm install && next build && next start')
  } catch (err) {
    console.log(err)
  }
}

main()
