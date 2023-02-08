import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { parseMagnet, encodeMagnet } from 'parse-magnet-uri'


const App: Component = () => {
  const [parsed, setParsed] = createSignal("")
  const [edited, setEdited] = createSignal("")
  const [shorted, setShorted] = createSignal("")
  const [torrent, setTorrent] = createSignal(null)
  const encoder = new TextEncoder()
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <form className="w-full mt-10">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/6">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-magnet"
          >
            Magnet
          </label>
        </div>
        <div className="md:w-5/6">
          <input
            id="inline-magnet"
            type="text"
            title="Magnet"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 pr-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            onChange={(e) => {
              const torrent = parseMagnet(e.currentTarget.value)
              const decoded = decodeURI(torrent.dn)
              setTorrent(torrent)
              setParsed(decoded)
              setEdited(decoded)
            }}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/6">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-title">
            Title
          </label>
        </div>
        <div className="md:w-5/6">
          <input
            id="inline-title"
            type="text"
            title="Title"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={parsed()}
            onChange={(e) => {
              const value = e.currentTarget.value
              setEdited(value)
              const encoded = encodeMagnet({
                ...torrent(),
                dn: encodeURI(value),
              })
              setShorted(encoded)
            }}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/6">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-new-magnet">
            New magnet
          </label>
        </div>
        <div className="md:w-5/6">
          <input
            id="inline-new-magnet"
            type="text"
            title="New magnet"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={shorted()}
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/6 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          <div>Edited: {encoder.encode(edited()).length}</div>
          <div>Parsed: {encoder.encode(parsed()).length}</div>
        </div>
        <div className="md:w-5/6">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              copyText(shorted())
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </form>
  )
}

export default App
