"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, AlertCircle, Search, X } from "lucide-react"

const allContacts = [
  {
    id: 1,
    name: "Emergency Services",
    number: "911",
    email: "emergency@police.gov",
    address: "Central Police Station",
    type: "Emergency",
    icon: "🚨",
    color: "from-red-600 to-red-700",
    available: "24/7",
  },
  {
    id: 2,
    name: "Fire Department",
    number: "101",
    email: "info@fireservice.gov",
    address: "Main Fire Station, Downtown",
    type: "Emergency",
    icon: "🔥",
    color: "from-orange-600 to-orange-700",
    available: "24/7",
  },
  {
    id: 3,
    name: "Medical Emergency",
    number: "102",
    email: "ambulance@health.gov",
    address: "Central Hospital",
    type: "Medical",
    icon: "🏥",
    color: "from-green-600 to-green-700",
    available: "24/7",
  },
  {
    id: 4,
    name: "Disaster Management Authority",
    number: "1077",
    email: "ndma@disaster.gov",
    address: "National Disaster Center",
    type: "Authority",
    icon: "📊",
    color: "from-blue-600 to-blue-700",
    available: "24/7",
  },
  {
    id: 5,
    name: "Campus Security",
    number: "+91-98765-43210",
    email: "security@college.edu",
    address: "Security Office, Campus Main Gate",
    type: "Campus",
    icon: "👮",
    color: "from-purple-600 to-purple-700",
    available: "24/7",
  },
  {
    id: 6,
    name: "Principal/Director",
    number: "+91-98765-43200",
    email: "principal@college.edu",
    address: "Administrative Building",
    type: "Campus",
    icon: "👔",
    color: "from-indigo-600 to-indigo-700",
    available: "8:00 AM - 5:00 PM",
  },
  {
    id: 7,
    name: "Medical Center",
    number: "+91-98765-43220",
    email: "medical@college.edu",
    address: "Campus Medical Wing",
    type: "Campus",
    icon: "⚕️",
    color: "from-cyan-600 to-cyan-700",
    available: "24/7",
  },
  {
    id: 8,
    name: "Mental Health Counselor",
    number: "+91-98765-43230",
    email: "counselor@college.edu",
    address: "Student Affairs Building",
    type: "Support",
    icon: "💬",
    color: "from-pink-600 to-pink-700",
    available: "9:00 AM - 6:00 PM",
  },
  {
    id: 9,
    name: "Local Hospital",
    number: "+91-98765-65432",
    email: "info@hospital.com",
    address: "City Medical Complex",
    type: "Medical",
    icon: "🏨",
    color: "from-red-600 to-pink-600",
    available: "24/7",
  },
  {
    id: 10,
    name: "Weather Department",
    number: "+91-98765-54321",
    email: "weather@imd.gov",
    address: "Meteorological Department",
    type: "Authority",
    icon: "🌦️",
    color: "from-yellow-500 to-orange-600",
    available: "24/7",
  },
]

export default function ContactsContent() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedContact, setSelectedContact] = useState<(typeof allContacts)[0] | null>(null)

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

  const types = ["All", "Emergency", "Medical", "Campus", "Authority", "Support"]

  const filteredContacts = allContacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.number.includes(searchQuery)
    const matchesType = selectedType === "All" || contact.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <main className="min-h-screen bg-white">
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 p-8 bg-gradient-to-b from-white to-slate-50">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Emergency Contacts</h1>
            <p className="text-slate-600">
              Quick access to emergency services and support contacts (All 24/7 Available)
            </p>
          </div>

          {/* Important Alert */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900 mb-1">In Case of Emergency</h3>
              <p className="text-slate-700 text-sm">
                All contacts below will answer emergency calls 24/7. Dial the number immediately for life-threatening
                situations.
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or phone number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {types.map((type) => (
                <Button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`whitespace-nowrap transition-all ${
                    selectedType === type
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-slate-600 mb-6">
            Showing {filteredContacts.length} of {allContacts.length} contacts
          </p>

          {/* Contacts Grid */}
          {filteredContacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`bg-gradient-to-br ${contact.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-5xl mb-2">{contact.icon}</p>
                      <h3 className="text-lg font-bold">{contact.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold px-3 py-1 bg-white/20 rounded-full block mb-2">
                        {contact.type}
                      </span>
                      <div className="flex items-center gap-1 justify-end bg-green-400/20 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></div>
                        <span className="text-xs font-bold text-green-100">AVAILABLE</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-white/80 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-white/70">Phone</p>
                        <p className="font-semibold text-white text-lg">{contact.number}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-white/70">Location</p>
                        <p className="text-sm text-white">{contact.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-white text-slate-900 hover:bg-slate-100 font-semibold flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `tel:${contact.number}`
                      }}
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                    <Button
                      className="flex-1 bg-white text-slate-900 hover:bg-slate-100 font-semibold flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `mailto:${contact.email}`
                      }}
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-sm">
              <p className="text-slate-600 text-lg">No contacts found matching your search.</p>
            </div>
          )}

          {/* Emergency Tips */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Emergency Response Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Stay Calm",
                  description: "Keep composure and think clearly during emergencies",
                  icon: "🧘",
                  color: "from-blue-600 to-blue-700",
                },
                {
                  title: "Call for Help",
                  description: "Contact emergency services immediately if needed",
                  icon: "📞",
                  color: "from-red-600 to-red-700",
                },
                {
                  title: "Follow Instructions",
                  description: "Listen to authorities and follow evacuation procedures",
                  icon: "👂",
                  color: "from-orange-600 to-orange-700",
                },
                {
                  title: "Help Others",
                  description: "Assist those around you within your capabilities",
                  icon: "🤝",
                  color: "from-green-600 to-green-700",
                },
              ].map((tip, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${tip.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all`}
                >
                  <p className="text-4xl mb-3">{tip.icon}</p>
                  <h3 className="font-bold text-white mb-2">{tip.title}</h3>
                  <p className="text-sm text-white/90">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className={`bg-gradient-to-br ${selectedContact.color} text-white p-6 relative`}>
              <button
                onClick={() => setSelectedContact(null)}
                className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <p className="text-6xl mb-2">{selectedContact.icon}</p>
              <h2 className="text-2xl font-bold">{selectedContact.name}</h2>
              <p className="text-white/80 text-sm">{selectedContact.type}</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-slate-600 mb-1">Phone</p>
                <p className="font-bold text-slate-900 text-lg">{selectedContact.number}</p>
              </div>

              <div>
                <p className="text-xs text-slate-600 mb-1">Email</p>
                <p className="font-semibold text-slate-700">{selectedContact.email}</p>
              </div>

              <div>
                <p className="text-xs text-slate-600 mb-1">Address</p>
                <p className="font-semibold text-slate-700">{selectedContact.address}</p>
              </div>

              <div>
                <p className="text-xs text-slate-600 mb-1">Availability</p>
                <p className="font-semibold text-slate-700">{selectedContact.available}</p>
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  onClick={() => {
                    window.location.href = `tel:${selectedContact.number}`
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-semibold"
                  onClick={() => {
                    window.location.href = `mailto:${selectedContact.email}`
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
