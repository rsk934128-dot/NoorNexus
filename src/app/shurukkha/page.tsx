
/**
 * @fileOverview Redirecting to Standard Hub for backward compatibility
 */
import { redirect } from "next/navigation"

export default function ShurukkhaPage() {
  redirect("/shurukkha-standard")
}
