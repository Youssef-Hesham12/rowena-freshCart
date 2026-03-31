import { Spinner } from '@/components/ui/spinner'
import React from 'react'

export default function ResetButton({children, loadingMsg , isLoading}:{children: string, loadingMsg: string , isLoading: boolean}) {
  return (
    <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-600 flex justify-center items-center gap-2 text-white py-3 px-4 rounded-[12px] hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Spinner className="size-5" /> {loadingMsg}
                  </>
                ) : (
                  children
                )}
              </button>
  )
}
