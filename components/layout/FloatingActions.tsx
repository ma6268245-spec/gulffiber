'use client'

import '@/styles/chat.css'
import { ChatAssistant } from '@/components/chat/ChatAssistant'

/* ===========================================================================
   FLOATING ACTIONS - GLOBAL SHELL WIDGET
   ---------------------------------------------------------------------------
   The complete chatbot redesign now lives in components/chat/ChatAssistant.tsx
   with its stylesheet in styles/chat.css. This module keeps its historical
   path and export name because both the frozen homepage (app/page.tsx) and
   the subpage shell (components/subpages/PageShell.tsx) import it - only the
   internals changed, no importing file needed to be touched.
   =========================================================================== */

export function FloatingActions() {
  return <ChatAssistant />
}
