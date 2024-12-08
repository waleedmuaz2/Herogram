import { AuthenticationForm } from "@/components/auth/authenticationForm"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AuthenticationForm type="register" />
    </div>
  )
}

