"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Check } from "lucide-react"

const modulesData = {
  1: {
    title: "Earthquake Response",
    disaster: "earthquake",
    color: "from-red-600 to-red-700",
    lessons: [
      {
        id: 1,
        title: "Introduction to Earthquakes",
        duration: "10 min",
        content:
          "Learn about different types of earthquakes, their causes, and how they're measured on the Richter scale. Understanding the science helps you respond effectively.",
      },
      {
        id: 2,
        title: "Safety Protocols During Tremors",
        duration: "12 min",
        content:
          "Master the Drop-Cover-Hold On technique. This lesson covers what to do during different earthquake situations: at home, at work, outdoors, and in vehicles.",
      },
      {
        id: 3,
        title: "Evacuation Procedures",
        duration: "8 min",
        content:
          "Understand evacuation routes, assembly points, and how to help others evacuate safely. Learn about first response protocols.",
      },
      {
        id: 4,
        title: "Post-Earthquake Actions",
        duration: "10 min",
        content:
          "After the earthquake stops, understand damage assessment, how to report emergencies, and when it's safe to move around.",
      },
      {
        id: 5,
        title: "Emergency Kit Preparation",
        duration: "5 min",
        content:
          "Learn what items should be in your emergency kit and where to store it for quick access during an earthquake.",
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Earthquake Safety Quiz",
        questions: [
          {
            q: "What is the correct earthquake response technique?",
            options: ["Run outside", "Drop-Cover-Hold On", "Stand in doorways", "Stay in bed"],
            correct: 1,
          },
          {
            q: "During an earthquake at work, you should:",
            options: ["Use the elevator", "Hide under desk", "Stay calm and follow procedures", "Run to nearest exit"],
            correct: 2,
          },
          {
            q: "What should you do immediately after an earthquake?",
            options: ["Check for injuries", "Inspect building damage", "Both A and B", "Leave building immediately"],
            correct: 2,
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Earthquake Response",
        questions: [
          {
            q: "How long typically does an earthquake last?",
            options: ["10-30 seconds", "2-5 minutes", "Several minutes", "Up to an hour"],
            correct: 0,
          },
          {
            q: "What is the primary purpose of an emergency kit?",
            options: ["Store valuables", "Provide survival essentials", "Keep documents safe", "Store extra clothing"],
            correct: 1,
          },
        ],
      },
    ],
  },
  2: {
    title: "Flood Safety Protocol",
    disaster: "flood",
    color: "from-blue-600 to-blue-700",
    lessons: [
      {
        id: 1,
        title: "Understanding Different Flood Types",
        duration: "12 min",
        content:
          "Learn about flash floods, river floods, coastal floods, and urban flooding. Understand their characteristics, warning signs, and how to identify your area's flood risk.",
      },
      {
        id: 2,
        title: "Flood Warnings & Alert Systems",
        duration: "10 min",
        content:
          "Master how to receive and interpret flood warnings, watches, and alerts. Learn the difference between advisory, watch, and warning levels.",
      },
      {
        id: 3,
        title: "Evacuation & Safe Shelter",
        duration: "14 min",
        content:
          "Understand when and how to evacuate during floods. Learn about designated shelter locations, what to bring, and safe routes.",
      },
      {
        id: 4,
        title: "Recovery & Assistance",
        duration: "10 min",
        content:
          "Understanding the recovery process, financial assistance available, documenting damage, and rebuilding after floods.",
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Flood Safety Basics",
        questions: [
          {
            q: "Never drive through flooded roads because:",
            options: ["It's illegal", "Water can sweep vehicles away", "It damages your car", "Speed limits are lower"],
            correct: 1,
          },
          {
            q: "What should you do during a flood watch?",
            options: ["Leave immediately", "Prepare emergency supplies", "Ignore warnings", "Stay outdoors"],
            correct: 1,
          },
          {
            q: "What is the first sign of an incoming flood?",
            options: ["Strong winds", "Rising water levels", "Thunder", "Dark clouds"],
            correct: 1,
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Flood Response",
        questions: [
          {
            q: "How deep can water get before sweeping a car away?",
            options: ["1 foot", "2 feet", "6 inches", "3 feet"],
            correct: 0,
          },
          {
            q: "Where should you go during a flash flood?",
            options: ["Ground floor", "Basement", "Higher ground", "Nearest building"],
            correct: 2,
          },
        ],
      },
    ],
  },
  3: {
    title: "Fire Emergency Management",
    disaster: "fire",
    color: "from-orange-600 to-orange-700",
    lessons: [
      {
        id: 1,
        title: "Fire Types & Causes",
        duration: "11 min",
        content:
          "Learn about different types of fires (structural, vehicle, wildfire), their causes, and how they spread. Understanding fire behavior helps in prevention.",
      },
      {
        id: 2,
        title: "Fire Detection & Alarm Systems",
        duration: "9 min",
        content:
          "Understand smoke detectors, fire alarm systems, and how to recognize fire hazards in your surroundings.",
      },
      {
        id: 3,
        title: "Evacuation Routes & Procedures",
        duration: "13 min",
        content:
          "Learn about evacuation routes, assembly points, using stairs instead of elevators, and helping others evacuate safely.",
      },
      {
        id: 4,
        title: "Fire Suppression Basics",
        duration: "10 min",
        content:
          "Understanding fire extinguishers (PASS method), when to use them, and when to evacuate instead of fighting.",
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Fire Safety Quiz",
        questions: [
          {
            q: "What does PASS stand for in fire extinguisher use?",
            options: [
              "Push, Act, Stop, Spray",
              "Pull, Aim, Squeeze, Sweep",
              "Point, Activate, Start, Stop",
              "Prepare, Alert, Secure, Spray",
            ],
            correct: 1,
          },
          {
            q: "During a fire, should you use elevators?",
            options: ["Yes, they're faster", "Only if disabled", "Never, use stairs", "Only ground floor"],
            correct: 2,
          },
          {
            q: "What is the first step during a fire emergency?",
            options: ["Fight the fire", "Alert others and evacuate", "Gather belongings", "Hide"],
            correct: 1,
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Fire Response",
        questions: [
          {
            q: "What smoke color indicates a chemical fire?",
            options: ["White", "Black", "Varies by chemical", "Yellow"],
            correct: 2,
          },
          {
            q: "How often should fire alarms be tested?",
            options: ["Monthly", "Yearly", "Quarterly", "Weekly"],
            correct: 0,
          },
        ],
      },
    ],
  },
  4: {
    title: "Cyclone Preparedness",
    disaster: "cyclone",
    color: "from-purple-600 to-purple-700",
    lessons: [
      {
        id: 1,
        title: "Understanding Cyclones",
        duration: "13 min",
        content:
          "Learn about cyclone formation, categories, wind speeds, and seasonal patterns. Understand how to identify your area's cyclone risk.",
      },
      {
        id: 2,
        title: "Cyclone Warnings & Watches",
        duration: "11 min",
        content:
          "Master cyclone warning systems, color codes, and alert levels. Learn how to receive real-time updates and interpret weather reports.",
      },
      {
        id: 3,
        title: "Home & Property Preparation",
        duration: "15 min",
        content:
          "Learn how to secure your home, trim trees, reinforce windows, and prepare your property before cyclone season.",
      },
      {
        id: 4,
        title: "Shelter & Evacuation",
        duration: "12 min",
        content:
          "Understand designated cyclone shelters, evacuation zones, what to take, and how to stay safe during the storm.",
      },
      {
        id: 5,
        title: "Post-Cyclone Recovery",
        duration: "10 min",
        content:
          "Learn about safety assessments after the storm, cleanup procedures, and accessing disaster relief assistance.",
      },
      {
        id: 6,
        title: "Family Communication Plans",
        duration: "8 min",
        content:
          "Create emergency contacts lists, establish meeting points, and set up communication protocols with family.",
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Cyclone Safety Basics",
        questions: [
          {
            q: "Which color cyclone warning is most severe?",
            options: ["Red", "Orange", "Yellow", "Green"],
            correct: 0,
          },
          {
            q: "What should you do when a cyclone warning is issued?",
            options: [
              "Evacuate immediately",
              "Stay home and prepare",
              "Go outdoors to observe",
              "Wait for evacuation order",
            ],
            correct: 1,
          },
          {
            q: "Where is the safest place during a cyclone?",
            options: ["Upper floor", "Ground floor interior room", "Outdoors", "Balcony"],
            correct: 1,
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Cyclone Response",
        questions: [
          {
            q: "What is the eye of the cyclone?",
            options: ["The strongest part", "The calmest center", "The outer edge", "A weather symbol"],
            correct: 1,
          },
          {
            q: "When should you start preparing for cyclone season?",
            options: ["When warning is issued", "One week before", "Months in advance", "After the storm"],
            correct: 2,
          },
          {
            q: "What is the safest evacuation timing?",
            options: ["Last minute", "When ordered by authorities", "During the storm", "After the storm"],
            correct: 1,
          },
        ],
      },
      {
        id: 3,
        title: "Cyclone Preparedness Checklist",
        questions: [
          {
            q: "What should be in a cyclone emergency kit?",
            options: [
              "Only water",
              "Food, water, first aid, flashlight, medications",
              "Just documents",
              "Valuables only",
            ],
            correct: 1,
          },
          {
            q: "How long should you prepare before cyclone season?",
            options: ["Few days", "One week", "Several months", "It doesn't matter"],
            correct: 2,
          },
        ],
      },
    ],
  },
  5: {
    title: "Landslide Awareness",
    disaster: "landslide",
    color: "from-green-600 to-green-700",
    lessons: [
      {
        id: 1,
        title: "Landslide Types & Causes",
        duration: "10 min",
        content:
          "Learn about different landslide types (slides, falls, flows), geological conditions that cause them, and warning signs.",
      },
      {
        id: 2,
        title: "Identifying High-Risk Areas",
        duration: "11 min",
        content:
          "Understand terrain characteristics that indicate landslide risk, such as steep slopes, water saturation, and previous slide areas.",
      },
      {
        id: 3,
        title: "Warning Signs & Preparedness",
        duration: "9 min",
        content:
          "Learn to recognize landslide warning signs: ground cracks, tilting trees, bulging ground, and what to do when you notice them.",
      },
      {
        id: 4,
        title: "Evacuation & Safety Procedures",
        duration: "10 min",
        content:
          "Understand evacuation routes from high-risk zones, safe assembly points, and how to help vulnerable community members.",
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Landslide Safety Quiz",
        questions: [
          {
            q: "What is a key warning sign of an impending landslide?",
            options: ["Loud noise", "Ground cracks and movement", "Heavy rain", "Strong winds"],
            correct: 1,
          },
          {
            q: "Where are landslides most likely to occur?",
            options: ["Flat areas", "Steep slopes", "Valleys", "Coastal areas"],
            correct: 1,
          },
          {
            q: "What should you do if you notice ground cracks near your home?",
            options: ["Ignore them", "Report to authorities and prepare to evacuate", "Build a wall", "Dig deeper"],
            correct: 1,
          },
        ],
      },
      {
        id: 2,
        title: "Landslide Risk Assessment",
        questions: [
          {
            q: "Which season typically has more landslide risk?",
            options: ["Summer", "Winter", "Heavy rainfall seasons", "All seasons equally"],
            correct: 2,
          },
          {
            q: "How should you move away from a landslide path?",
            options: ["Downslope", "Across the slope", "Any direction", "Straight upslope"],
            correct: 1,
          },
        ],
      },
    ],
  },
  6: {
    title: "First Aid Basics",
    disaster: "medical",
    color: "from-pink-600 to-pink-700",
    lessons: [
      {
        id: 1,
        title: "First Aid Principles & ABCs",
        duration: "12 min",
        content:
          "Learn the fundamentals: Airway, Breathing, Circulation (ABCs), recovery position, and how to assess injuries.",
      },
      {
        id: 2,
        title: "CPR & Rescue Breathing",
        duration: "15 min",
        content:
          "Master hands-only CPR technique, chest compressions, rescue breathing, and when to perform CPR on adults and children.",
      },
      {
        id: 3,
        title: "Wound Care & Bandaging",
        duration: "11 min",
        content:
          "Learn proper wound cleaning, applying pressure to stop bleeding, bandaging techniques, and identifying when medical help is needed.",
      },
      {
        id: 4,
        title: "Choking, Allergies & Shock",
        duration: "13 min",
        content:
          "Understand the Heimlich maneuver for choking victims, managing allergic reactions, and recognizing and treating shock.",
      },
      {
        id: 5,
        title: "Fractures & Sprains",
        duration: "10 min",
        content:
          "Learn how to identify fractures and sprains, apply RICE protocol (Rest, Ice, Compression, Elevation), and immobilize injuries.",
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "First Aid Basics Quiz",
        questions: [
          {
            q: "What does ABC stand for in first aid?",
            options: [
              "Alert, Breathe, Compress",
              "Airway, Breathing, Circulation",
              "Alert, Blood, CPR",
              "Assess, Bandage, Call",
            ],
            correct: 1,
          },
          {
            q: "What is the correct compression rate for CPR?",
            options: ["60-80 per minute", "100-120 per minute", "140-160 per minute", "200 per minute"],
            correct: 1,
          },
          {
            q: "How long should you perform CPR before calling for help?",
            options: ["1 minute", "5 minutes", "Call immediately, start CPR", "10 minutes"],
            correct: 2,
          },
        ],
      },
      {
        id: 2,
        title: "Advanced First Aid Response",
        questions: [
          {
            q: "What is the RICE protocol used for?",
            options: ["Cooking injuries", "Fractures and sprains", "Burns", "Poisoning"],
            correct: 1,
          },
          {
            q: "How should you treat a severe bleeding wound?",
            options: ["Apply ice", "Apply direct pressure", "Wait for it to stop", "Pour water on it"],
            correct: 1,
          },
          {
            q: "What is the Heimlich maneuver used for?",
            options: ["CPR", "Choking relief", "Breathing assistance", "Pain relief"],
            correct: 1,
          },
        ],
      },
      {
        id: 3,
        title: "Medical Emergency Response",
        questions: [
          {
            q: "What are signs of shock?",
            options: [
              "Normal skin and alertness",
              "Cold skin, rapid pulse, weak condition",
              "Hot and sweating",
              "Just confusion",
            ],
            correct: 1,
          },
          {
            q: "When should you use an AED?",
            options: [
              "Only for adults",
              "When someone is unresponsive and not breathing",
              "For all chest pain",
              "Never",
            ],
            correct: 1,
          },
        ],
      },
    ],
  },
}

export default function ModuleDetailPage() {
  const router = useRouter()
  const params = useParams()
  const moduleId = params.id as string
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [quizMode, setQuizMode] = useState(false)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizResults, setQuizResults] = useState<{ passed: boolean; score: number } | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  const module = modulesData[moduleId as keyof typeof modulesData] as any
  if (!module) {
    return <div>Module not found</div>
  }

  const currentLesson = module.lessons[currentLessonIndex]
  const currentQuiz = module.quizzes[currentQuizIndex]
  const currentQuestion = currentQuiz?.questions[currentQuestionIndex]

  const handleMarkComplete = () => {
    if (!completedLessons.includes(currentLessonIndex)) {
      setCompletedLessons([...completedLessons, currentLessonIndex])
    }
    if (currentLessonIndex < module.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const handleAnswerQuestion = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex]
    setQuizAnswers(newAnswers)

    if (currentQuestionIndex < currentQuestion.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      const score = newAnswers.filter((ans, idx) => ans === currentQuiz.questions[idx].correct).length
      const passed = score >= currentQuiz.questions.length * 0.7
      setQuizResults({ passed, score })
    }
  }

  const progressPercentage = (completedLessons.length / module.lessons.length) * 100

  return (
    <main className="min-h-screen bg-white">
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 p-8 bg-gradient-to-b from-white to-slate-50">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-slate-700 hover:text-slate-900">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{module.title}</h1>
            <p className="text-slate-600">
              {quizMode
                ? `Quiz ${currentQuizIndex + 1} of ${module.quizzes.length}`
                : `Lesson ${currentLessonIndex + 1} of ${module.lessons.length}`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className={`bg-gradient-to-br ${module.color} text-white p-8 rounded-lg mb-6 shadow-lg`}>
                {quizMode ? (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{currentQuiz.title}</h2>
                    {!quizResults ? (
                      <div>
                        <p className="text-lg mb-6">
                          Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                        </p>
                        <p className="text-xl font-bold mb-6">{currentQuestion.q}</p>
                        <div className="space-y-3">
                          {currentQuestion.options.map((option: string, idx: number) => (
                            <Button
                              key={idx}
                              onClick={() => handleAnswerQuestion(idx)}
                              className="w-full justify-start text-left bg-white/20 hover:bg-white/30 text-white border border-white/30"
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-3xl font-bold mb-4">
                          {quizResults.passed ? "✓ Quiz Passed!" : "✗ Quiz Failed"}
                        </p>
                        <p className="text-2xl mb-6">
                          Score: {quizResults.score}/{currentQuiz.questions.length}
                        </p>
                        {quizResults.passed && (
                          <p className="text-lg mb-6">Great job! You've demonstrated mastery of this content.</p>
                        )}
                        <Button
                          onClick={() => {
                            setQuizMode(false)
                            setQuizAnswers([])
                            setCurrentQuestionIndex(0)
                            setQuizResults(null)
                          }}
                          className="bg-white text-slate-900 hover:bg-slate-100"
                        >
                          Back to Lessons
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{currentLesson.title}</h2>
                    <p className="text-white/80">{currentLesson.duration}</p>
                  </div>
                )}
              </div>

              {!quizMode && !quizResults && (
                <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
                  <p className="text-lg text-slate-700 leading-relaxed mb-8">{currentLesson.content}</p>

                  <div className="flex gap-4">
                    <Button
                      onClick={handleMarkComplete}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Mark as Complete
                    </Button>
                    {currentLessonIndex < module.lessons.length - 1 && (
                      <Button
                        onClick={() => setCurrentLessonIndex(currentLessonIndex + 1)}
                        variant="outline"
                        className="flex-1"
                      >
                        Next Lesson
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Card */}
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Progress</h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Course Progress</span>
                    <span className="text-sm font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${module.color}`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  {completedLessons.length} of {module.lessons.length} lessons completed
                </p>
              </div>

              {/* Lessons List */}
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Lessons</h3>
                <div className="space-y-2">
                  {module.lessons.map((lesson: any, idx: number) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setCurrentLessonIndex(idx)
                        setQuizMode(false)
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                        currentLessonIndex === idx && !quizMode
                          ? `bg-gradient-to-r ${module.color} text-white`
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {completedLessons.includes(idx) && <Check className="w-4 h-4" />}
                        <span className="truncate">{lesson.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quizzes */}
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Quizzes</h3>
                <div className="space-y-2">
                  {module.quizzes.map((quiz: any, idx: number) => (
                    <Button
                      key={quiz.id}
                      onClick={() => {
                        setQuizMode(true)
                        setCurrentQuizIndex(idx)
                        setCurrentQuestionIndex(0)
                        setQuizAnswers([])
                      }}
                      className={`w-full justify-start ${
                        quizMode && currentQuizIndex === idx
                          ? `bg-gradient-to-r ${module.color} text-white`
                          : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                      }`}
                    >
                      {quiz.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
