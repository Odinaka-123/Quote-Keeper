"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Quote,
  Trash2,
  Heart,
  Sparkles,
  RefreshCw,
  Filter,
  BookOpen,
  Target,
  Lightbulb,
  Users,
  Zap,
} from "lucide-react"
import { useTheme } from "next-themes"

interface QuoteType {
  id: string
  text: string
  author: string
  category: string
}

const sampleQuotes = [
  // Success & Achievement
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Success" },
  { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown", category: "Success" },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown",
    category: "Success",
  },
  {
    text: "Perfection is not attainable, but if we chase perfection we can catch excellence.",
    author: "Vince Lombardi",
    category: "Success",
  },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Success" },

  // Motivation & Inspiration
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Motivation",
  },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "Motivation" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown", category: "Motivation" },
  { text: "Great things never come from comfort zones.", author: "Unknown", category: "Motivation" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown", category: "Motivation" },
  { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown", category: "Motivation" },

  // Life & Wisdom
  {
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    category: "Life",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "Life",
  },
  { text: "Don't let yesterday take up too much of today.", author: "Will Rogers", category: "Life" },
  { text: "We don't make mistakes, just happy little accidents.", author: "Bob Ross", category: "Life" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford", category: "Life" },

  // Leadership & Growth
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    author: "Martin Luther King Jr.",
    category: "Leadership",
  },
  {
    text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
    author: "Unknown",
    category: "Leadership",
  },
  {
    text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
    author: "Steve Jobs",
    category: "Leadership",
  },

  // Innovation & Creativity
  {
    text: "People who are crazy enough to think they can change the world, are the ones who do.",
    author: "Rob Siltanen",
    category: "Innovation",
  },
]

const categories = [
  { name: "All", icon: BookOpen, color: "from-gray-500 to-gray-600" },
  { name: "Success", icon: Target, color: "from-green-500 to-emerald-600" },
  { name: "Motivation", icon: Zap, color: "from-orange-500 to-red-600" },
  { name: "Life", icon: Heart, color: "from-pink-500 to-rose-600" },
  { name: "Leadership", icon: Users, color: "from-blue-500 to-indigo-600" },
  { name: "Innovation", icon: Lightbulb, color: "from-purple-500 to-violet-600" },
]

export default function QuoteKeeper() {
  const [currentQuote, setCurrentQuote] = useState<QuoteType>({ id: "", text: "", author: "", category: "" })
  const [savedQuotes, setSavedQuotes] = useState<QuoteType[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved quotes from localStorage
    const saved = localStorage.getItem("savedQuotes")
    if (saved) {
      setSavedQuotes(JSON.parse(saved))
    }
    // Set initial random quote
    getNewQuote()
  }, [])

  useEffect(() => {
    // Save quotes to localStorage whenever savedQuotes changes
    if (mounted) {
      localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes))
    }
  }, [savedQuotes, mounted])

  const getNewQuote = async () => {
    setIsLoading(true)

    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const filteredQuotes =
      selectedCategory === "All" ? sampleQuotes : sampleQuotes.filter((quote) => quote.category === selectedCategory)

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length)
    const quote = filteredQuotes[randomIndex]

    setCurrentQuote({
      id: Date.now().toString(),
      text: quote.text,
      author: quote.author,
      category: quote.category,
    })

    setIsLoading(false)
  }

  const saveQuote = () => {
    if (currentQuote.text && !savedQuotes.find((q) => q.text === currentQuote.text)) {
      setSavedQuotes([...savedQuotes, currentQuote])
    }
  }

  const deleteQuote = (id: string) => {
    setSavedQuotes(savedQuotes.filter((quote) => quote.id !== id))
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  // Show loading state until component is mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                <Quote className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Quote Keeper
              </h1>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-all duration-500">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 shadow-lg shadow-purple-500/25">
                <Quote className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Quote Keeper
                </h1>
                <p className="text-muted-foreground mt-1">Discover wisdom, save inspiration</p>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <Card className="max-w-4xl mx-auto mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                <Filter className="h-5 w-5 text-indigo-500" />
                Quote Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  const isSelected = selectedCategory === category.name
                  return (
                    <Button
                      key={category.name}
                      onClick={() => handleCategoryChange(category.name)}
                      variant={isSelected ? "default" : "outline"}
                      className={`
                        px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 
                        ${
                          isSelected
                            ? `bg-gradient-to-r ${category.color} text-white shadow-lg hover:shadow-xl`
                            : "border-2 hover:bg-white/50 dark:hover:bg-gray-800/50"
                        }
                      `}
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      {category.name}
                      <span className="ml-2 text-xs opacity-75">
                        (
                        {category.name === "All"
                          ? sampleQuotes.length
                          : sampleQuotes.filter((q) => q.category === category.name).length}
                        )
                      </span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Current Quote Section */}
          <Card className="max-w-4xl mx-auto mb-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02]">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                <Sparkles className="h-6 w-6 text-purple-500" />
                {selectedCategory === "All" ? "Daily Inspiration" : `${selectedCategory} Quote`}
                <Sparkles className="h-6 w-6 text-pink-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-8 p-8">
              {isLoading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-6 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-lg w-3/4 mx-auto" />
                  <div className="h-6 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-lg w-1/2 mx-auto" />
                  <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-lg w-1/3 mx-auto" />
                </div>
              ) : currentQuote.text ? (
                <>
                  <blockquote className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed italic relative">
                    <span className="text-6xl text-purple-300 dark:text-purple-600 absolute -top-4 -left-2 font-serif">
                      "
                    </span>
                    {currentQuote.text}
                    <span className="text-6xl text-pink-300 dark:text-pink-600 absolute -bottom-8 -right-2 font-serif">
                      "
                    </span>
                  </blockquote>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-16" />
                    <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent px-4">
                      — {currentQuote.author}
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent w-16" />
                  </div>
                  {currentQuote.category && (
                    <div className="flex justify-center">
                      <span
                        className={`
                        px-3 py-1 rounded-full text-xs font-semibold text-white
                        bg-gradient-to-r ${categories.find((c) => c.name === currentQuote.category)?.color || "from-gray-500 to-gray-600"}
                      `}
                      >
                        {currentQuote.category}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-xl text-muted-foreground">Click "New Quote" to get started!</p>
              )}

              <div className="flex gap-6 justify-center pt-6">
                <Button
                  onClick={getNewQuote}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="h-5 w-5 mr-2" />
                  )}
                  New Quote
                </Button>
                <Button
                  onClick={saveQuote}
                  variant="outline"
                  disabled={!currentQuote.text || savedQuotes.some((q) => q.text === currentQuote.text)}
                  className="px-8 py-3 rounded-2xl border-2 border-pink-300 dark:border-pink-600 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Save Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Saved Quotes Section */}
      <div className="container mx-auto px-4 pb-16">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 rounded-xl bg-gradient-to-r from-red-400 to-pink-500">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                Saved Quotes ({savedQuotes.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {savedQuotes.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4">
                  <Heart className="h-16 w-16 text-pink-300 dark:text-pink-600 mx-auto mb-4" />
                </div>
                <p className="text-xl text-muted-foreground mb-2">No saved quotes yet</p>
                <p className="text-muted-foreground">Save your favorite quotes to see them here!</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {savedQuotes.map((quote, index) => (
                  <Card
                    key={quote.id}
                    className="group bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-900/20 border-purple-200/50 dark:border-purple-700/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <blockquote className="text-sm md:text-base text-gray-700 dark:text-gray-200 mb-4 leading-relaxed italic">
                            "{quote.text}"
                          </blockquote>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-px bg-gradient-to-r from-purple-400 to-pink-400 flex-1" />
                            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 px-2">
                              {quote.author}
                            </p>
                            <div className="h-px bg-gradient-to-r from-pink-400 to-purple-400 flex-1" />
                          </div>
                          {quote.category && (
                            <div className="flex justify-center">
                              <span
                                className={`
                                px-2 py-1 rounded-full text-xs font-medium text-white
                                bg-gradient-to-r ${categories.find((c) => c.name === quote.category)?.color || "from-gray-500 to-gray-600"}
                              `}
                              >
                                {quote.category}
                              </span>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteQuote(quote.id)}
                          className="text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete quote</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
