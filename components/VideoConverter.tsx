'use client'

import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { useRef, useState } from 'react'

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ffmpegRef = useRef(new FFmpeg())
  const [videoFile, setVideoFile] = useState(null)
  const [outputFormat, setOutputFormat] = useState('mp4')
  const [isConverting, setIsConverting] = useState(false)
  const [downloadLink, setDownloadLink] = useState(null)

  const load = async () => {
    setIsLoading(true)
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    const ffmpeg = ffmpegRef.current

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
    })
    setLoaded(true)
    setIsLoading(false)
  }

  const transcode = async () => {
    if (!videoFile || !loaded) {
      alert('Please load FFmpeg and select a video file first.')
      return
    }
    setIsConverting(true)

    const ffmpeg = ffmpegRef.current
    const fileName = 'input.' + videoFile.name.split('.').pop()
    const outputFileName = `output.${outputFormat}`

    // Write the input file to memory
    await ffmpeg.writeFile(fileName, await fetchFile(videoFile))

    // Perform the conversion
    await ffmpeg.exec(['-i', fileName, outputFileName])

    // Read the output file from memory and create a download link
    const data = (await ffmpeg.readFile(outputFileName)).buffer
    setDownloadLink(URL.createObjectURL(new Blob([data], { type: `video/${outputFormat}` })))

    setIsConverting(false)
  }

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0])
    setDownloadLink(null) // Clear previous download link on new file selection
    if (!loaded) load()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Video Converter</h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <input
          type="file"
          onChange={handleFileChange}
          accept="video/*"
          className="mb-4 w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer"
        />
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className="mb-4 w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-md"
        >
          <option value="mp4">MP4</option>
          <option value="avi">AVI</option>
          <option value="mov">MOV</option>
          <option value="mkv">MKV</option>
          <option value="webm">WEBM</option>
        </select>
        <button
          onClick={transcode}
          disabled={isConverting || !loaded}
          className={`w-full p-2 mb-4 font-bold text-white rounded-md ${
            isConverting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isConverting ? 'Converting...' : 'Convert Video'}
        </button>

        {downloadLink && (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-500 mb-2">Conversion Complete</h3>
            <a
              href={downloadLink}
              download={`output.${outputFormat}`}
              className="text-blue-500 underline"
            >
              Download Converted Video
            </a>
          </div>
        )}
      </div>

      {!loaded && (
        <button
          onClick={load}
          className="mt-6 px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Load FFmpeg Core
          {isLoading && (
            <span className="animate-spin ml-3">
              <svg
                viewBox="0 0 1024 1024"
                focusable="false"
                className="w-5 h-5 fill-current"
                aria-hidden="true"
              >
                <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
              </svg>
            </span>
          )}
        </button>
      )}
    </div>
  )
}
