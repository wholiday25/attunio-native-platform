// Optimized for React Native from web component
// Some features may need manual implementation

import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { Command } from "cmdk"
// framer-motion removed - not compatible with React Nativeimport { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"

interface CommandPaletteProps {
  open: boolean
  setOpen: (open: boolean) => void
  onNavigate: (tab: string) => void
  onAction: (action: string) => void
}

export function CommandPalette({ open, setOpen, onNavigate, onAction }: CommandPaletteProps) {
  const [search, setSearch] = useState("")

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const handleSelect = useCallback(
    (callback: () => void) => {
      callback()
      setOpen(false)
      setSearch("")
    },
    [setOpen],
  )

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <View
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onPress={() => setOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />

          {/* Command Palette */}
          <View
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <Command className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
              <View className="flex items-center gap-3 px-4 py-4 border-b border-slate-200">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <Textath
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search or jump to..."
                  className="flex-1 outline-none text-slate-900 placeholder:text-slate-400"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-500 bg-slate-100 border border-slate-200 rounded">
                  Esc
                </kbd>
              </View>

              <Command.List className="max-h-96 overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-slate-500">No results found.</Command.Empty>

                <Command.Group heading="Navigation" className="px-2 py-2">
                  <Text className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Navigation
                  </Text>
                  <CommandItem icon={Home} onSelect={() => handleSelect(() => onNavigate("home"))}>
                    Dashboard
                  </CommandItem>
                  <CommandItem icon={Library} onSelect={() => handleSelect(() => onNavigate("library"))}>
                    Library
                  </CommandItem>
                  <CommandItem icon={BarChart3} onSelect={() => handleSelect(() => onNavigate("data"))}>
                    My Data
                  </CommandItem>
                  <CommandItem icon={Settings} onSelect={() => handleSelect(() => onNavigate("more"))}>
                    Settings
                  </CommandItem>
                </Command.Group>

                <Command.Separator className="h-px bg-slate-200 my-2" />

                <Command.Group heading="Biomarkers" className="px-2 py-2">
                  <Text className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Biomarkers
                  </Text>
                  <CommandItem icon={Heart} onSelect={() => handleSelect(() => onAction("hrv"))}>
                    View HRV Details
                  </CommandItem>
                  <CommandItem icon={Moon} onSelect={() => handleSelect(() => onAction("sleep"))}>
                    View Sleep Analysis
                  </CommandItem>
                  <CommandItem icon={Activity} onSelect={() => handleSelect(() => onAction("activity"))}>
                    View Activity Metrics
                  </CommandItem>
                </Command.Group>

                <Command.Separator className="h-px bg-slate-200 my-2" />

                <Command.Group heading="Actions" className="px-2 py-2">
                  <Text className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</Text>
                  <CommandItem icon={RefreshCw} onSelect={() => handleSelect(() => onAction("sync"))}>
                    Sync Device Data
                  </CommandItem>
                  <CommandItem icon={FileText} onSelect={() => handleSelect(() => onAction("export"))}>
                    Export All Data
                  </CommandItem>
                  <CommandItem icon={Pill} onSelect={() => handleSelect(() => onAction("medications"))}>
                    Log Medication
                  </CommandItem>
                  <CommandItem icon={User} onSelect={() => handleSelect(() => onAction("doctor"))}>
                    Schedule Doctor Review
                  </CommandItem>
                </Command.Group>
              </Command.List>

              <View className="border-t border-slate-200 px-4 py-3 bg-slate-50">
                <View className="flex items-center gap-4 text-xs text-slate-500">
                  <View className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-white border border-slate-200 rounded font-mono">↑↓</kbd>
                    <Text>Navigate</Text>
                  </View>
                  <View className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-white border border-slate-200 rounded font-mono">↵</kbd>
                    <Text>Select</Text>
                  </View>
                  <View className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-white border border-slate-200 rounded font-mono">Esc</kbd>
                    <Text>Close</Text>
                  </View>
                </View>
              </View>
            </Command>
          </View>
        </>
      )}
    </AnimatePresence>
  )
}

interface CommandItemProps {
  icon: React.ElementType
  onSelect: () => void
  children: React.ReactNode
}

function CommandItem({ icon: Icon, onSelect, children }: CommandItemProps) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors data-[selected=true]:bg-teal-50 data-[selected=true]:text-teal-900"
    >
      <Icon className="w-4 h-4" />
      <Text className="text-sm font-medium">{children}</Text>
    </Command.Item>
  )
}
