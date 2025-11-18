// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { useState } from "react"

interface DoctorConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DoctorConsultationModal({ isOpen, onClose }: DoctorConsultationModalProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedReason, setSelectedReason] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [notes, setNotes] = useState("")
  const [step, setStep] = useState<"info" | "reason" | "doctor" | "schedule" | "confirmation">("info")

  if (!isOpen) return null

  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

  const consultationReasons = [
    { id: "medication", label: "Medication effectiveness", icon: "/images/icon-10.svg" }, // Medical icon
    { id: "sleep", label: "Sleep & HRV concerns", icon: "/images/icon-48.svg" }, // Sleep/rest icon
    { id: "lab", label: "Lab results review", icon: "/images/dashboard-01.svg" }, // Chart/dashboard icon
    { id: "symptoms", label: "Symptom management", icon: "/images/icon-43.svg" }, // Brain/health icon
    { id: "lifestyle", label: "Lifestyle optimization", icon: "/images/icon-17.svg" }, // Activity/energy icon
    { id: "other", label: "General consultation", icon: "/images/icon-02.svg" }, // Communication icon
  ]

  const doctors = [
    {
      id: "dr-sarah",
      name: "Dr. Sarah Chen",
      specialty: "Psychiatry • ADHD Specialist",
      experience: "15 years experience",
      rating: "4.9",
      availability: "Next available: Tomorrow",
      bio: "Specializes in adult ADHD and medication optimization",
      doxyRoomUrl: "https://doxy.me/attunio", // Attunio Doxy.me room
    },
    {
      id: "dr-michael",
      name: "Dr. Michael Rodriguez",
      specialty: "Clinical Psychology • Cognitive Behavioral Therapy",
      experience: "12 years experience",
      rating: "4.8",
      availability: "Next available: Today",
      bio: "Expert in non-medication ADHD management strategies",
      doxyRoomUrl: "https://doxy.me/attunio", // Attunio Doxy.me room
    },
  ]

  const handleSchedule = () => {
    console.log("[v0] Scheduling consultation:", { selectedDate, selectedTime, selectedReason, selectedDoctor, notes })
    setStep("confirmation")
  }

  // Check if current time is within join window (15 min before to 30 min after appointment)
  const canJoinCall = () => {
    if (!selectedDate || !selectedTime) return false
    
    const appointmentDateTime = new Date(`${selectedDate} ${selectedTime}`)
    const now = new Date()
    const minutesDiff = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60)
    
    // Can join 15 minutes before to 30 minutes after
    return minutesDiff <= 15 && minutesDiff >= -30
  }

  const handleJoinVideoCall = () => {
    const doctor = doctors.find((d) => d.id === selectedDoctor)
    if (doctor?.doxyRoomUrl) {
      // Open Doxy.me room in new tab
      window.open(doctor.doxyRoomUrl, '_blank', 'width=1200,height=800')
    }
  }

  const handleConfirmationClose = () => {
    setStep("info")
    setSelectedDate("")
    setSelectedTime("")
    setSelectedReason("")
    setSelectedDoctor("")
    setNotes("")
    onClose()
  }

  const getStepNumber = () => {
    const steps = { info: 1, reason: 2, doctor: 3, schedule: 4, confirmation: 5 }
    return steps[step]
  }

  return (
    <View className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <View className="bg-[#fff8f2] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        {step !== "confirmation" && (
          <View className="px-8 pt-6 pb-2">
            <View className="flex items-center gap-2">
              {[1, 2, 3, 4].map((num) => (
                <View
                  key={num}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    num <= getStepNumber() ? "bg-[#f38660]" : "bg-[#172334]/10"
                  }`}
                />
              ))}
            </View>
          </View>
        )}

        {step === "confirmation" ? (
          // Confirmation Step
          <View className="p-8 sm:p-12 text-center">
            <View className="w-20 h-20 rounded-full bg-[#f38660]/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#f38660]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </View>

            <Text className="text-3xl font-bold text-[#172334] mb-3 tracking-tight">You're all set!</Text>
            <Text className="text-[#6b7280] text-lg mb-8">Your clinician consultation has been scheduled</Text>

            <View className="bg-white rounded-xl p-6 mb-6 text-left border border-[#172334]/10">
              <View className="space-y-4">
                {selectedDoctor && (
                  <View>
                    <Text className="text-xs text-[#6b7280] font-semibold uppercase tracking-wide mb-1">Clinician</Text>
                    <Text className="text-lg font-bold text-[#172334]">
                      {doctors.find((d) => d.id === selectedDoctor)?.name}
                    </Text>
                  </View>
                )}
                <View>
                  <Text className="text-xs text-[#6b7280] font-semibold uppercase tracking-wide mb-1">Date</Text>
                  <Text className="text-lg font-bold text-[#172334]">
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-[#6b7280] font-semibold uppercase tracking-wide mb-1">Time</Text>
                  <Text className="text-lg font-bold text-[#172334]">{selectedTime}</Text>
                </View>
                {selectedReason && (
                  <View>
                    <Text className="text-xs text-[#6b7280] font-semibold uppercase tracking-wide mb-1">Topic</Text>
                    <Text className="text-sm text-[#172334]">
                      {consultationReasons.find((r) => r.id === selectedReason)?.label}
                    </Text>
                  </View>
                )}
                {notes && (
                  <View>
                    <Text className="text-xs text-[#6b7280] font-semibold uppercase tracking-wide mb-1">Your notes</Text>
                    <Text className="text-sm text-[#172334]">{notes}</Text>
                  </View>
                )}
              </View>
            </View>

            <View className="bg-[#f38660]/5 rounded-xl p-6 mb-6 text-left border border-[#f38660]/20">
              <Text className="font-bold text-[#172334] mb-3">Before your appointment:</Text>
              <View className="space-y-2 text-sm text-[#6b7280]">
                <View className="flex items-start gap-2">
                  <Text className="text-[#f38660] mt-0.5">✓</Text>
                  <Text>Review your recent biomarker trends in the app</Text>
                </View>
                <View className="flex items-start gap-2">
                  <Text className="text-[#f38660] mt-0.5">✓</Text>
                  <Text>Check your medication log for the past week</Text>
                </View>
                <View className="flex items-start gap-2">
                  <Text className="text-[#f38660] mt-0.5">✓</Text>
                  <Text>Prepare any questions about your treatment plan</Text>
                </View>
              </View>
            </View>

            <View className="space-y-3">
              <Text className="text-sm text-[#6b7280] mb-4">
                {canJoinCall() 
                  ? "Your appointment is ready! Join the video call now." 
                  : "You'll receive a calendar invite and video link 24 hours before your appointment."}
              </Text>

              {canJoinCall() && (
                <TouchableOpacity
                  onPress={handleJoinVideoCall}
                  className="w-full h-14 text-base font-semibold rounded-full bg-[#10b981] hover:bg-[#059669] text-white shadow-lg mb-3"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Join Video Call
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  console.log("[v0] Adding to calendar")
                  // Calendar integration would go here
                }}
                className="w-full h-12 text-sm font-semibold rounded-full bg-white hover:bg-[#172334]/5 text-[#172334] border-2 border-[#172334]/10"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Add to calendar
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirmationClose}
                className="w-full h-14 text-base font-semibold rounded-full bg-[#f38660] hover:bg-[#e57550] text-white shadow-lg"
              >
                Done
              </TouchableOpacity>
            </View>
          </View>
        ) : step === "info" ? (
          // Info Step
          <View>
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center transition-all"
            >
              <svg className="w-5 h-5 text-[#172334]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </TouchableOpacity>

            <View className="p-8 sm:p-12">
              <View className="mb-8">
                <Text className="text-3xl sm:text-4xl font-bold text-[#172334] mb-3 tracking-tight">
                  Talk to a licensed clinician
                </Text>
                <Text className="text-[#6b7280] text-lg">
                  Review your data with a healthcare provider specialized in ADHD management
                </Text>
              </View>

              <View className="space-y-6 mb-8">
                <View className="flex items-start gap-4">
                  <View className="w-12 h-12 rounded-full bg-[#f38660]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#f38660]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </View>
                  <View>
                    <Text className="font-bold text-[#172334] mb-1">30-minute video consultation</Text>
                    <Text className="text-[#6b7280] text-sm">One-on-one discussion about your biomarkers and symptoms</Text>
                  </View>
                </View>

                <View className="flex items-start gap-4">
                  <View className="w-12 h-12 rounded-full bg-[#f38660]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#f38660]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </View>
                  <View>
                    <Text className="font-bold text-[#172334] mb-1">Personalized recommendations</Text>
                    <Text className="text-[#6b7280] text-sm">
                      Get actionable insights based on your wearable data and health history
                    </Text>
                  </View>
                </View>

                <View className="flex items-start gap-4">
                  <View className="w-12 h-12 rounded-full bg-[#f38660]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#f38660]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </View>
                  <View>
                    <Text className="font-bold text-[#172334] mb-1">Treatment plan updates</Text>
                    <Text className="text-[#6b7280] text-sm">
                      Discuss medication adjustments, therapy options, and lifestyle changes
                    </Text>
                  </View>
                </View>

                <View className="flex items-start gap-4">
                  <View className="w-12 h-12 rounded-full bg-[#f38660]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#f38660]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </View>
                  <View>
                    <Text className="font-bold text-[#172334] mb-1">Follow-up care plan</Text>
                    <Text className="text-[#6b7280] text-sm">
                      Receive a written summary and action plan after your consultation
                    </Text>
                  </View>
                </View>
              </View>

              <View className="bg-white rounded-xl p-6 mb-8 border border-[#172334]/10">
                <View className="flex items-center justify-between mb-2">
                  <View>
                    <Text className="text-2xl font-bold text-[#172334]">$99</Text>
                    <Text className="text-sm text-[#6b7280]">per consultation</Text>
                  </View>
                  <Badge className="bg-[#f38660]/10 text-[#f38660] border-0">Included with Complete</Badge>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setStep("reason")}
                className="w-full h-14 text-base font-semibold rounded-full bg-[#f38660] hover:bg-[#e57550] text-white shadow-lg"
              >
                Continue to scheduling
              </TouchableOpacity>

              <Text className="text-center text-xs text-[#6b7280] mt-4">
                Available 7 days a week • Video or phone • HIPAA compliant
              </Text>
            </View>
          </View>
        ) : step === "reason" ? (
          <View>
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center transition-all"
            >
              <svg className="w-5 h-5 text-[#172334]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </TouchableOpacity>

            <View className="p-8 sm:p-12">
              <TouchableOpacity
                onPress={() => setStep("info")}
                className="flex items-center gap-2 text-[#6b7280] hover:text-[#172334] mb-6 -ml-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <Text className="text-sm font-medium">Back</Text>
              </TouchableOpacity>

              <Text className="text-3xl font-bold text-[#172334] mb-2 tracking-tight">What brings you in?</Text>
              <Text className="text-[#6b7280] mb-8">Select the main reason for your consultation</Text>

              <View className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {consultationReasons.map((reason) => (
                  <TouchableOpacity
                    key={reason.id}
                    onPress={() => setSelectedReason(reason.id)}
                    className={`p-4 rounded-xl text-left transition-all border-2 ${
                      selectedReason === reason.id
                        ? "bg-[#f38660]/5 border-[#f38660]"
                        : "bg-white border-[#172334]/10 hover:border-[#f38660]/50"
                    }`}
                  >
                    <View className="mb-2 w-10 h-10 relative">
                      <Image source={reason.icon} alt={reason.label} width={40} height={40} className="object-contain" />
                    </View>
                    <Text className="font-semibold text-[#172334] text-sm">{reason.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => setStep("doctor")}
                disabled={!selectedReason}
                className="w-full h-14 text-base font-semibold rounded-full bg-[#f38660] hover:bg-[#e57550] text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#6b7280]"
              >
                Continue
              </TouchableOpacity>
            </View>
          </View>
        ) : step === "doctor" ? (
          <View>
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center transition-all"
            >
              <svg className="w-5 h-5 text-[#172334]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </TouchableOpacity>

            <View className="p-8 sm:p-12">
              <TouchableOpacity
                onPress={() => setStep("reason")}
                className="flex items-center gap-2 text-[#6b7280] hover:text-[#172334] mb-6 -ml-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <Text className="text-sm font-medium">Back</Text>
              </TouchableOpacity>

              <Text className="text-3xl font-bold text-[#172334] mb-2 tracking-tight">Choose your clinician</Text>
              <Text className="text-[#6b7280] mb-8">Select a licensed healthcare provider</Text>

              <View className="space-y-4 mb-8">
                {doctors.map((doctor) => (
                  <TouchableOpacity
                    key={doctor.id}
                    onPress={() => setSelectedDoctor(doctor.id)}
                    className={`w-full p-5 rounded-xl text-left transition-all border-2 ${
                      selectedDoctor === doctor.id
                        ? "bg-[#f38660]/5 border-[#f38660]"
                        : "bg-white border-[#172334]/10 hover:border-[#f38660]/50"
                    }`}
                  >
                    <View className="flex items-start justify-between mb-3">
                      <View>
                        <Text className="font-bold text-[#172334] mb-1">{doctor.name}</Text>
                        <Text className="text-xs text-[#6b7280]">{doctor.specialty}</Text>
                      </View>
                      <Badge className="bg-[#f38660]/10 text-[#f38660] border-0 text-xs">
                        ⭐ {doctor.rating}
                      </Badge>
                    </View>
                    <Text className="text-sm text-[#6b7280] mb-2">{doctor.bio}</Text>
                    <View className="flex items-center gap-4 text-xs text-[#6b7280]">
                      <Text>{doctor.experience}</Text>
                      <Text>•</Text>
                      <Text className="text-[#f38660] font-medium">{doctor.availability}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => setStep("schedule")}
                disabled={!selectedDoctor}
                className="w-full h-14 text-base font-semibold rounded-full bg-[#f38660] hover:bg-[#e57550] text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#6b7280]"
              >
                Continue
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Schedule Step
          <View>
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center transition-all"
            >
              <svg className="w-5 h-5 text-[#172334]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </TouchableOpacity>

            <View className="p-8 sm:p-12">
              <TouchableOpacity
                onPress={() => setStep("doctor")}
                className="flex items-center gap-2 text-[#6b7280] hover:text-[#172334] mb-6 -ml-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <Text className="text-sm font-medium">Back</Text>
              </TouchableOpacity>

              <Text className="text-3xl font-bold text-[#172334] mb-2 tracking-tight">Choose your time</Text>
              <Text className="text-[#6b7280] mb-8">Select a date and time that works for you</Text>

              <View className="space-y-6">
                <View>
                  <Text className="block text-sm font-bold text-[#172334] mb-3">Date</Text>
                  <TextInput
                    type="date"
                    value={selectedDate}
                    onChangeText={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border-2 border-[#172334]/20 rounded-xl focus:ring-0 focus:border-[#f38660] transition-colors text-base bg-white"
                  />
                </View>

                {selectedDate && (
                  <View>
                    <Text className="block text-sm font-bold text-[#172334] mb-3">Time</Text>
                    <View className="grid grid-cols-3 gap-3">
                      {availableTimes.map((time) => (
                        <TouchableOpacity
                          key={time}
                          onPress={() => setSelectedTime(time)}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border-2 ${
                            selectedTime === time
                              ? "bg-[#f38660] text-white border-[#f38660]"
                              : "bg-white text-[#172334] border-[#172334]/20 hover:border-[#f38660]"
                          }`}
                        >
                          {time}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {selectedTime && (
                  <View>
                    <Text className="block text-sm font-bold text-[#172334] mb-3">
                      Additional notes (Optional)
                    </Text>
                    <TextInput
                      value={notes}
                      onChangeText={(e) => setNotes(e.target.value)}
                      placeholder="Any specific concerns or questions you'd like to discuss..."
                      className="w-full px-4 py-3 border-2 border-[#172334]/20 rounded-xl focus:ring-0 focus:border-[#f38660] transition-colors resize-none text-base bg-white"
                      rows={4}
                    />
                  </View>
                )}
              </View>

              <View className="mt-8 pt-6 border-t border-[#172334]/10">
                <TouchableOpacity
                  onPress={handleSchedule}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full h-14 text-base font-semibold rounded-full bg-[#f38660] hover:bg-[#e57550] text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#6b7280]"
                >
                  Confirm appointment
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
