import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

const ESMTNT = () => {
  const { toast } = useToast()
  return (
    <div className="p-10 bg-white space-y-10">
      <Button
        variant="outline"
        onClick={() => {
          <Toaster/>
        }}
      >
        Show Toast
      </Button>

    </div>
  )
}

export default ESMTNT