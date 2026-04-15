import { Suspense } from "react"
import ContactsContent from "@/components/contacts/contacts-content"
import Loading from "./loading"

export default function ContactsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ContactsContent />
    </Suspense>
  )
}
