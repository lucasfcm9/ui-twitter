import { FormEvent, KeyboardEvent, useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Separator } from '../components/Separator'
import { Tweet } from '../components/Tweet'

import './Timeline.css'
import { api } from '../lib/axios'

type TweetProps = {
  id: string
  content: string
  createdAt: Date
}[]

export function Timeline() {
  const [newTweet, setNewTweet] = useState('')
  const [tweets, setTweets] = useState<TweetProps>([])

  async function createNewTweet(event: FormEvent) {
    event.preventDefault()

    await api.post('/tweets', {
      content: newTweet,
    })

    alert('Tweet created successfully!')

    setNewTweet('')
  }

  async function handleHotkeySubmit(event: KeyboardEvent) {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      await api.post('/tweets', {
        content: newTweet,
      })

      alert('Tweet created successfully!')

      setNewTweet('')
    }
  }

  useEffect(() => {
    api.get('/tweets').then((response) => {
      const tweetsData = response.data.tweets
      setTweets(tweetsData)
    })
  }, [])

  return (
    <main className="timeline">
      <Header title="Home" />

      <form onSubmit={createNewTweet} className="new-tweet-form">
        <label htmlFor="tweet">
          <img src="https://github.com/lucasfcm9.png" alt="Lucas Fellipe" />
          <textarea
            id="tweet"
            placeholder="What's happening?"
            value={newTweet}
            onKeyDown={handleHotkeySubmit}
            onChange={(event) => {
              setNewTweet(event.target.value)
            }}
          />
        </label>
        <button type="submit">Tweet</button>
      </form>

      <Separator />

      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} content={tweet.content} />
      })}
    </main>
  )
}
