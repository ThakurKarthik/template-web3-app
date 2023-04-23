'use client'

import { useMemo, useState } from 'react'

import { Player, useCreateStream } from '@livepeer/react'

export const Stream = () => {
  const [streamName, setStreamName] = useState<string>('')
  const { mutate: createStream, data: stream, status } = useCreateStream(streamName ? { name: streamName } : null)

  const isLoading = useMemo(() => status === 'loading', [status])
  console.log(stream, status)
  return (
    <div>
      <input type="text" placeholder="Stream name" onChange={(e) => setStreamName(e.target.value)} />

      {stream?.playbackId && <Player title={stream?.name} playbackId={stream?.playbackId} autoPlay muted />}

      <div>
        {!stream && (
          <button
            onClick={() => {
              createStream?.()
            }}
            disabled={isLoading || !createStream}>
            Create Stream
          </button>
        )}
      </div>
    </div>
  )
}
