"use client"

import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play,
  Pause,
  Download,
  Share2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Brain,
  Target,
  Sparkles,
  CheckCircle,
  Copy,
  AlertCircle,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
} from "lucide-react"
import Link from "next/link"
import { useAudio } from "@/contexts/audio-context"
import { useToast } from "@/hooks/use-toast"
import type { Podcast } from "@/types/podcast"

interface PodcastData extends Podcast {
  parameters: {
    topic: string
    motivation: string
    length: string
    knowledgeLevel: string
    depth: string
  }
  script?: string
}

// Mock data - in a real app, this would come from the API
const mockPodcastData: PodcastData = {
  id: "new-podcast-123",
  title: "The Science of Sleep: Understanding Your Circadian Rhythm",
  description:
    "Explore the fascinating world of sleep science and discover how your circadian rhythm affects every aspect of your daily life. Learn practical strategies to optimize your sleep for better health, productivity, and well-being.",
  category: "Science",
  duration: "6:42",
  createdAt: "2024-01-15T10:30:00Z",
  parameters: {
    topic: "The Science of Sleep",
    motivation:
      "I want to help people understand how sleep affects their daily performance and provide actionable insights for better rest and recovery.",
    length: "6",
    knowledgeLevel: "intermediate",
    depth: "analysis",
  },
  audioUrl:
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmHgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  script: `Welcome to today's micro-podcast on the Science of Sleep. I'm excited to explore this fascinating topic with you.

Sleep isn't just a period of rest – it's an active, complex biological process that's essential for our physical health, mental well-being, and cognitive performance. At the heart of this process is your circadian rhythm, often called your body's internal clock.

Your circadian rhythm is a roughly 24-hour cycle that regulates when you feel alert and when you feel sleepy. This rhythm is controlled by a small region in your brain called the suprachiasmatic nucleus, which responds to light and darkness in your environment.

Here's what's fascinating: this internal clock doesn't just control sleep. It influences your body temperature, hormone production, blood pressure, and even your immune system. When your circadian rhythm is aligned with your lifestyle, you experience better sleep quality, improved mood, and enhanced cognitive function.

However, modern life often disrupts this natural rhythm. Artificial light, especially blue light from screens, can trick your brain into thinking it's still daytime, suppressing the production of melatonin – the hormone that makes you feel sleepy.

So, what can you do to optimize your circadian rhythm? First, try to get natural sunlight exposure in the morning – this helps reset your internal clock. Second, create a consistent sleep schedule, going to bed and waking up at the same time every day. Third, limit screen time at least an hour before bedtime, or use blue light filters.

The quality of your sleep directly impacts your ability to learn, make decisions, and regulate emotions. During deep sleep, your brain consolidates memories and clears out metabolic waste, including proteins associated with neurodegenerative diseases.

Understanding your sleep science empowers you to make informed decisions about your daily habits. Small changes in your routine can lead to significant improvements in your sleep quality and, consequently, your overall quality of life.

Thank you for joining me on this exploration of sleep science. Sweet dreams, and remember – good sleep is not a luxury, it's a necessity for optimal human performance.`,
  coverImage: "/placeholder.svg?height=300&width=300",
}

export default function PodcastDisplayPage({ params }: { params: { id: string } }) {
  const {
    playPodcast,
    currentPodcast,
    isPlaying,
    currentTime,
    duration,
    seekTo,
    skipForward,
    skipBackward,
    volume,
    setVolume,
  } = useAudio()
  const { toast } = useToast()
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null)
  const [isScriptOpen, setIsScriptOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call to fetch podcast data
    const fetchPodcast = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // In a real app, you'd fetch data based on params.id
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Simulate potential API errors
        if (params.id === "error-test") {
          throw new Error("Podcast not found")
        }

        setPodcastData(mockPodcastData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load podcast"
        setError(errorMessage)
        console.error("Failed to fetch podcast:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPodcast()
  }, [params.id])

  const handlePlayPodcast = () => {
    if (podcastData) {
      try {
        playPodcast({
          id: podcastData.id,
          title: podcastData.title,
          description: podcastData.description,
          category: podcastData.category,
          duration: podcastData.duration,
          audioUrl: podcastData.audioUrl,
        })
      } catch (err) {
        console.error("Failed to play podcast:", err)
        toast({
          title: "Playback Error",
          description: "Failed to start playback. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href)
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea")
        textArea.value = window.location.href
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }

      setCopied(true)
      toast({
        title: "Link Copied",
        description: "Podcast link has been copied to clipboard.",
      })

      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
      toast({
        title: "Copy Failed",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return "Unknown date"
    }
  }

  const getParameterIcon = (param: string) => {
    switch (param) {
      case "length":
        return <Clock className="h-4 w-4" />
      case "knowledgeLevel":
        return <Brain className="h-4 w-4" />
      case "depth":
        return <Target className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const formatParameterValue = (key: string, value: string) => {
    switch (key) {
      case "length":
        return `${value} minutes`
      case "knowledgeLevel":
        return value.charAt(0).toUpperCase() + value.slice(1)
      case "depth":
        return value.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
      default:
        return value
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center">
        <Card className="glass-card border-0 shadow-glass p-8">
          <div className="flex items-center space-x-4">
            <Sparkles className="h-8 w-8 text-purple-600 animate-spin" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Loading your podcast...</h2>
              <p className="text-gray-600 dark:text-gray-400">Just a moment while we prepare everything</p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (error || !podcastData) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center">
        <Card className="glass-card border-0 shadow-glass p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {error || "Podcast not found"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error
              ? "Please try again later or contact support if the problem persists."
              : "The podcast you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="glass-button border-0 bg-transparent"
            >
              Try Again
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Link href="/create">Create New Podcast</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const isCurrentlyPlaying = currentPodcast?.id === podcastData.id && isPlaying

  const formatTime = (time: number) => {
    if (isNaN(time)) {
      return "0:00"
    }
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="min-h-screen gradient-mesh pt-0">
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-float"></div>
      <div
        className="absolute top-40 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-4xl mx-auto pt-24 pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 glass px-6 py-3 rounded-full text-green-800 dark:text-green-200 font-medium mb-6 shadow-glass">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Podcast Created Successfully!</span>
          </div>
          <h1 className="heading-lg text-gray-900 dark:text-gray-100 mb-2">Your Micro-Podcast is Ready</h1>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Listen to your creation and share it with the world
          </p>
        </div>

        {/* Main Podcast Card */}
        <Card className="glass-card border-0 shadow-glass mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-y-12 -translate-x-12"></div>

            <div className="flex items-start justify-between relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-white/20 text-white border-white/30">{podcastData.category}</Badge>
                  <span className="text-purple-100 text-sm font-medium">{podcastData.duration}</span>
                </div>
                <CardTitle className="text-2xl mb-2">{podcastData.title}</CardTitle>
                <p className="text-purple-100 font-medium leading-relaxed">{podcastData.description}</p>
              </div>

              {podcastData.coverImage && (
                <div className="ml-6 flex-shrink-0">
                  <img
                    src={podcastData.coverImage || "/placeholder.svg"}
                    alt="Podcast cover"
                    className="w-24 h-24 rounded-xl shadow-soft"
                  />
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Audio Player Section */}
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Main Audio Player */}
                <div className="flex-1 space-y-4">
                  {/* Play Button and Status */}
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={handlePlayPodcast}
                      size="lg"
                      className={`w-16 h-16 rounded-full shadow-glass border-0 hover:scale-110 transition-all duration-300 flex-shrink-0 ${
                        isCurrentlyPlaying
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      } text-white`}
                      aria-label={isCurrentlyPlaying ? "Pause podcast" : "Play podcast"}
                    >
                      {isCurrentlyPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                    </Button>

                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                        {isCurrentlyPlaying ? "Now Playing" : "Ready to Play"}
                      </p>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                        {podcastData.title}
                      </h4>
                    </div>
                  </div>

                  {/* Progress Bar and Time */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-mono min-w-[40px]">
                        {formatTime(currentTime)}
                      </span>
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max={duration || 100}
                          value={currentTime}
                          onChange={(e) => seekTo(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                          style={{
                            background: `linear-gradient(to right, rgb(147, 51, 234) 0%, rgb(59, 130, 246) ${
                              duration ? (currentTime / duration) * 100 : 0
                            }%, rgb(229, 231, 235) ${duration ? (currentTime / duration) * 100 : 0}%, rgb(229, 231, 235) 100%)`,
                          }}
                          aria-label="Seek to position"
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-mono min-w-[40px]">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>

                  {/* Audio Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={skipBackward}
                        variant="ghost"
                        size="sm"
                        className="glass-button border-0 hover:scale-110 transition-transform duration-200 text-gray-700 dark:text-gray-300"
                        aria-label="Skip backward 15 seconds"
                      >
                        <SkipBack className="h-4 w-4" />
                      </Button>

                      <Button
                        onClick={skipForward}
                        variant="ghost"
                        size="sm"
                        className="glass-button border-0 hover:scale-110 transition-transform duration-200 text-gray-700 dark:text-gray-300"
                        aria-label="Skip forward 15 seconds"
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
                        variant="ghost"
                        size="sm"
                        className="glass-button border-0 hover:scale-110 transition-transform duration-200 text-gray-700 dark:text-gray-300"
                        aria-label={`Volume: ${Math.round(volume * 100)}%`}
                      >
                        {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume * 100}
                        onChange={(e) => setVolume(Number(e.target.value) / 100)}
                        className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                        aria-label="Volume control"
                      />
                    </div>
                  </div>

                  {/* Waveform visualization */}
                  <div className="h-8 flex items-center justify-center space-x-1 opacity-50" aria-hidden="true">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-gradient-to-t from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 rounded-full transition-all duration-300 ${
                          isCurrentlyPlaying ? "animate-pulse" : ""
                        }`}
                        style={{
                          height: `${Math.random() * 20 + 8}px`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Action Buttons - Vertical Layout */}
                <div className="flex lg:flex-col gap-3 lg:gap-2 justify-center lg:justify-start flex-wrap lg:flex-nowrap">
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass-button border-0 bg-transparent min-w-[120px] lg:min-w-[140px]"
                    aria-label="Download podcast"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    size="sm"
                    className="glass-button border-0 bg-transparent min-w-[120px] lg:min-w-[140px]"
                    disabled={copied}
                    aria-label="Copy podcast link"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass-button border-0 bg-transparent min-w-[120px] lg:min-w-[140px]"
                    aria-label="Share podcast"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Creation Details */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400 font-medium border-t pt-4">
              Created on {formatDate(podcastData.createdAt ?? "")}
            </div>
          </CardContent>
        </Card>

        {/* Creation Parameters */}
        <Card className="glass-card border-0 shadow-glass mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Creation Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Original Topic</Label>
              <p className="text-gray-900 dark:text-gray-100 font-semibold">{podcastData.parameters.topic}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Your Motivation</Label>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{podcastData.parameters.motivation}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              {Object.entries(podcastData.parameters)
                .filter(([key]) => !["topic", "motivation"].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {getParameterIcon(key)}
                      <Label className="text-xs font-medium text-gray-600 dark:text-gray-400 capitalize">
                        {key === "knowledgeLevel" ? "Knowledge" : key}
                      </Label>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {formatParameterValue(key, value)}
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Script Section */}
        {podcastData.script && (
          <Card className="glass-card border-0 shadow-glass mb-8">
            <Collapsible open={isScriptOpen} onOpenChange={setIsScriptOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                      Podcast Script
                    </CardTitle>
                    {isScriptOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <ScrollArea className="h-64 w-full rounded-lg border glass p-4">
                    <div className="prose prose-sm max-w-none">
                      {podcastData.script.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-glass border-0"
          >
            <Link href="/create">Create Another Podcast</Link>
          </Button>

          <Button asChild variant="outline" className="glass-button border-0 bg-transparent">
            <Link href="/podcasts">Browse All Podcasts</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
