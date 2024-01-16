'use client'

import { useOrganizationList } from "@clerk/nextjs"
import { useParams } from "next/navigation"
import { useEffect } from "react"

// This component is used to set the active organization in the organization list
// when the user visits a page that requires an active organization.

export const OrgControl = () => {
  const params = useParams()
  const { setActive } = useOrganizationList()

  useEffect(() => {
    if(!setActive) return

    setActive({
      organization: params.id as string,
    })
  }, [setActive, params.id])

  return null
}
