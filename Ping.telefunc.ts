export { Ping }

// import { getContext } from 'telefunc'

// Telefunction arguments are automatically validated
// at runtime: `text` is guaranteed to be a string.
async function Ping(pong: string) {

  console.log(pong)
  return { data : "pong"}
}
